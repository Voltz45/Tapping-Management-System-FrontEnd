import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Iso8583FieldService} from "../../../../../../../services/module-service/iso8583-field.service";
import {MatRadioChange} from "@angular/material/radio";
import {MatExpansionPanel} from "@angular/material/expansion";
import {Iso8583FieldModel, Iso8583Model} from "../../../../../../../model/modules-model/iso8583-field-model";
import {iso8583TemplateData} from "../../../../../../../constant/modules/iso8583-field/iso8583-field.constant";
import {NotificationService} from "../../../../../../../services/notification-service/notification.service";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {Select} from "@ngxs/store";
import {
  ISO8583FieldState
} from "../../../../../../../state-configuration/modules/external-interfaces/iso8583configuration/iso8583-field-configuration/iso8583-field.state";
import {Observable} from "rxjs";
import {
  DialectMsgTemplateGroupInterface
} from "../../../../../../../interface/modules/dialect-msg-template-group.interface";

@Component({
  selector: 'app-create-update-iso8583-field-form',
  templateUrl: './iso8583-field-form.component.html',
  styleUrls: ['./iso8583-field-form.component.css']
})
export class Iso8583FieldFormComponent implements OnInit {
  @Select(ISO8583FieldState.dialects) dialects$!: Observable<DialectMsgTemplateGroupInterface[]>
  @ViewChildren('expansionPanel') expansionPanel!: QueryList<MatExpansionPanel>;
  @ViewChildren('expansionSubChildPanel') expansionSubChildPanel!: QueryList<MatExpansionPanel>;
  @ViewChildren('expansionTaggedChildPanel') expansionTaggedChildPanel!: QueryList<MatExpansionPanel>;

  form!: FormGroup;
  iso8583Model: Iso8583Model = new Iso8583Model();
  result: Iso8583FieldModel[]= [];
  dialectOptionList: DialectMsgTemplateGroupInterface[] = [];
  mapRadioChangeValue = new Map<number, string>();

  constructor(
    private fb: FormBuilder,
    private notifier: NotificationService,
    public iso8583FieldService: Iso8583FieldService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.iso8583FieldService.onGetAllDialectMsgTemplate();
    this.dialects$.subscribe(data => {
      this.dialectOptionList = data.sort((a, b) => a.name.localeCompare(b.name));
    })
  }

  createForm() {
    this.form = this.fb.group({
      dialectTemplate: ['', [Validators.required]],
      iso8583Field: this.fb.array([])
    })
  }

  initIso8583Field() {
    return this.fb.group({
      fieldId: ['', [Validators.required, Validators.pattern('[0-9]*'), RxwebValidators.unique()]],
      fieldFormat: ['', Validators.required],
      length: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      description: [''],
      userInput: [true],
      hasChild: [false],
      typeChild: [''],
      subField: this.fb.array([]),
      taggedField: this.fb.array([])
    })
  }

  initIso8583SubField() {
    return this.fb.group({
      fieldId: ['', [Validators.required, Validators.pattern('[0-9]*'), RxwebValidators.unique()]],
      fieldFormat: ['', [Validators.required]],
      length: ['', [Validators.required]],
      description: ['']
    })
  }

  initIso8583TaggedField() {
    return this.fb.group({
      fieldId: ['', [Validators.required, Validators.pattern('[0-9]*'), RxwebValidators.unique()]],
      fieldFormat: ['', [Validators.required]],
      tagLenSize: ['', [Validators.required]]
    })
  }

  refresh() {
    this.iso8583FieldService.onGetAllDialectMsgTemplate();
  }

  addIso8583Field() {
    this.iso8583Field.push(this.initIso8583Field());
  }

  addIso8583SubField(form: any) {
    this.iso8583SubField(form).push(this.initIso8583SubField())
  }

  addIso8583TaggedField(form: any) {
    this.iso8583TaggedField(form).push(this.initIso8583TaggedField());
  }

  deleteIso8583Field(id: number) {
    this.iso8583Field.removeAt(id);
  }

  deleteIso8583SubField(form: any, id: number) {
    this.iso8583SubField(form).removeAt(id);
  }

  deleteIso8583TaggedField(form: any, id: number) {
    this.iso8583TaggedField(form).removeAt(id);
  }

  radioButtonChange($event: MatRadioChange, indexIso8583Field: number, form: any) {
    switch ($event.value.toString()) {
      case 'subField':
        this.mapRadioChangeValue.delete(indexIso8583Field);
        if (this.iso8583TaggedField(form).controls.length != 0) {
          this.iso8583TaggedField(form).clear();
        }
        this.addIso8583SubField(form);
        this.mapRadioChangeValue.set(indexIso8583Field, $event.value)
        this.iso8583Field.controls[indexIso8583Field].get('typeChild')?.setValue('subField')
        this.iso8583Field.controls[indexIso8583Field].get('hasChild')?.setValue('true')
        break;

      case 'taggedField':
        this.mapRadioChangeValue.delete(indexIso8583Field);
        if (this.iso8583SubField(form).controls.length != 0) {
          this.iso8583SubField(form).clear();
        }
        this.addIso8583TaggedField(form);
        this.mapRadioChangeValue.set(indexIso8583Field, $event.value)
        this.iso8583Field.controls[indexIso8583Field].get('typeChild')?.setValue('taggedField')
        this.iso8583Field.controls[indexIso8583Field].get('hasChild')?.setValue('true')
        break;

      case 'none':
        this.mapRadioChangeValue.delete(indexIso8583Field);
        if (this.iso8583SubField(form).controls.length != 0 || this.iso8583TaggedField(form).controls.length != 0) {
          this.iso8583SubField(form).clear();
          this.iso8583TaggedField(form).clear();
        }
        this.mapRadioChangeValue.set(indexIso8583Field, $event.value);
        this.iso8583Field.controls[indexIso8583Field].get('typeChild')?.setValue('')
        this.iso8583Field.controls[indexIso8583Field].get('hasChild')?.setValue('false')
        break;
    }
  }

  onSubmit() {
    this.validateFormWithExpandAndCollapseExpansionPanel();
    this.checkingFormField();
  }

  validateFormWithExpandAndCollapseExpansionPanel() {
    this.expansionPanel.forEach(x => {
      let index = Number(x._body.nativeElement.getElementsByTagName('input').item(0)?.id);
      if (this.iso8583Field.controls[index]?.invalid) {
        if (x._getExpandedState() == "collapsed") {
          x.toggle();
        }

        if (this.mapRadioChangeValue.get(index) == 'subField') {
          this.expansionSubChildPanel.forEach(y => {
            let indexChild = Number(y._body.nativeElement.getElementsByTagName('input').item(0)?.id);
            if (this.iso8583SubField(this.iso8583Field.controls[index])?.controls[indexChild]?.invalid) {
              if (y._getExpandedState() == "collapsed") {
                y.toggle();
              }
            } else {
              if (y._getExpandedState() == "expanded") {
                y.toggle();
              }
            }
          });
        }

        if (this.mapRadioChangeValue.get(index) == 'taggedField') {
          this.expansionTaggedChildPanel.forEach(y => {
            let indexChild = Number(y._body.nativeElement.getElementsByTagName('input').item(0)?.id);
            if (this.iso8583TaggedField(this.iso8583Field.controls[index])?.controls[indexChild]?.invalid) {
              if (y._getExpandedState() == "collapsed") {
                y.toggle();
              }
            } else {
              if (y._getExpandedState() == "expanded") {
                y.toggle();
              }
            }
          })
        }
      } else {
        if (x._getExpandedState() == "expanded") {
          x.toggle();
        }
      }
    });
  }

  private checkingFormField() {
    if (this.form.valid) {
      this.result = [];
      iso8583TemplateData.map((i) => {
        let index = Number(i['_id']);
        let data: any[] = this.form.value.iso8583Field;
        let filtered = data.filter((value: Iso8583FieldModel) => {
          return value.fieldId === String(index)
        })
        if (filtered.length != 0 && filtered.length >= 1){
          this.result.push(filtered[0]);
        } else {
          this.result.push({
            fieldId : i['_id'],
            fieldFormat : i['_class'],
            length : i['_length'],
            description : i['_name'],
            userInput : i['_userInput'],
            hasChild: i['_hasChild'],
            typeChild: i['_typeChild'],
            subField: [],
            taggedField: []
          })
        }
      })
      let getLastField = this.result.filter(value => value.userInput);
      if (Number(getLastField[getLastField.length - 1]?.fieldId) < 64) {
        this.iso8583Model = {
          dialectFields: this.result.slice(0, 65)
        }
      } else {
        this.iso8583Model = {
          dialectFields: this.result
        }
      }

      console.log(this.iso8583Model);
      /*TODO: Add update and create service*/
      this.iso8583FieldService.onCreateIso8583Field(this.dialectMessageTemplate.value.code, this.iso8583Model);
    } else {
      this.notifier.errorNotification('Please fill all the mandatory field', 0);
    }
  }

  get dialectMessageTemplate() {
    return this.form.controls['dialectTemplate'];
  }

  get iso8583Field() {
    return this.form.controls['iso8583Field'] as FormArray;
  }

  iso8583FieldId(id: number) {
    return this.iso8583Field.controls[id]?.get('fieldId');
  }

  iso8583FieldFormat(id: number) {
    return this.iso8583Field.controls[id].get('fieldFormat')
  }

  iso8583Description(id: number) {
    return this.iso8583Field.controls[id].get('description');
  }

  iso8583Length(id: number) {
    return this.iso8583Field.controls[id].get('length');
  }

  iso8583SubField(form: any) {
    return form.get('subField') as FormArray;
  }

  iso8583SubFieldId(form: any): AbstractControl {
    return form.get('fieldId');
  }

  iso8583SubFieldFormat(form: any) {
    return form.get('fieldFormat');
  }

  iso8583SubFieldDescription(form: any) {
    return form.get('description');
  }

  iso8583SubFieldLength(form: any) {
    return form.get('length');
  }

  iso8583TaggedField(form: any) {
    return form.get('taggedField') as FormArray;
  }

  iso8583TaggedFieldId(form: any): AbstractControl {
    return form.get('fieldId');
  }

  iso8583TaggedFieldFormat(form: any) {
    return form.get('fieldFormat');
  }

  iso8583TaggedLenSize(form: any) {
    return form.get('tagLenSize');
  }

  get iso8583FieldFormatGroups() {
    return this.iso8583FieldService.isoFormatGroups;
  }

  get iso8583TaggedFieldTagLenSize() {
    return this.iso8583FieldService.tagLenSizeGroups;
  }
}

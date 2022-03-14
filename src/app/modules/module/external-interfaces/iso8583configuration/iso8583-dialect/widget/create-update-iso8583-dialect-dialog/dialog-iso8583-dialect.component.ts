import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Iso8583DialectService} from "../../../../../../../services/module-service/iso8583-dialect.service";
import {
  Iso8583DialectMsgTemplateModel
} from "../../../../../../../model/modules-model/iso8583-dialect-msg-template.model";
import {MessageFormatGroupInterface} from "../../../../../../../interface/modules/message-format-group.interface";
import {Iso8583FormatModel} from "../../../../../../../model/modules-model/iso8583-format.model";
import {Select} from "@ngxs/store";
import {
  DialectState
} from "../../../../../../../state-configuration/modules/external-interfaces/iso8583configuration/iso8583-dialect/dialect.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-update-iso8583-dialect-dialog',
  templateUrl: './dialog-iso8583-dialect.component.html',
  styleUrls: ['./dialog-iso8583-dialect.component.css']
})
export class DialogIso8583DialectComponent implements OnInit, AfterViewInit {
  @Select(DialectState.messageFormats) messageFormats$!: Observable<MessageFormatGroupInterface[]>;

  form!:FormGroup;
  showClearButton: boolean = false;
  disableButton: boolean = false;
  msgFormatOptionList: MessageFormatGroupInterface[] = [];
  iso8583DialectModel: Iso8583DialectMsgTemplateModel = new Iso8583DialectMsgTemplateModel();

  constructor(
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    public iso8583DialectService: Iso8583DialectService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.iso8583DialectService.onGetAllMessageFormat();
    this.messageFormats$.subscribe(data => {
      this.MsgFormatOptionList = data.sort((a, b) => a.name.localeCompare(b.name));
    })
  }

  ngAfterViewInit(): void {
    if (this.iso8583DialectService.buttonStatus == 'edit') {
      this.setExistingDataToDialog();
      this.oncCheckingFormHasChange();
      this.changeDetectorRef.detectChanges();
    }
  }

  createForm() {
    this.form = this.fb.group({
      nameType: ['', Validators.required],
      msgFormatId: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  onChange($event: any) {
    this.showClearButton = $event != '' && $event != null;
  }

  oncCheckingFormHasChange() {
    this.disableButton = !this.form.dirty;
    this.form.valueChanges.subscribe(value => {
      if (
        this.existingNameType != value.nameType || this.existingMsgFormatId != value.msgFormatId.name ||
        this.existingDescription != value.description
      ) {
        this.disableButton = false;
      }

      if (
        this.existingNameType == value.nameType && this.existingMsgFormatId == value.msgFormatId.name &&
        this.existingDescription == value.description
      ) {
        this.disableButton = true;
      }
    })
  }

  setExistingDataToDialog() {
    this.nameType.setValue(this.existingNameType);
    this.description.setValue(this.existingDescription);
    this.msgFormatId.setValue({
      name: this.existingMsgFormatId.messageFormat,
      code: String(this.existingMsgFormatId.messageFormatId)
    })
  }

  setNewDataToModel(): Iso8583DialectMsgTemplateModel {
    this.iso8583DialectModel.nameType = this.nameType.value;
    this.iso8583DialectModel.description = this.description.value;
    this.iso8583DialectModel.messageFormat = new Iso8583FormatModel(Number(this.msgFormatId.value.code))
    return this.iso8583DialectModel;
  }

  onCreateIso8583Dialect() {
    this.iso8583DialectService.onCreateIso8583Dialect(this.setNewDataToModel());
  }

  onUpdateIso8583Dialect() {
    const newData = this.iso8583DialectService.createIso8583DialectFormData(this.existingNameType, this.setNewDataToModel());
    this.iso8583DialectService.onUpdateIso8583Dialect(newData, this.setNewDataToModel());
  }

  set MsgFormatOptionList(optionList: MessageFormatGroupInterface[]) {
    this.msgFormatOptionList = optionList;
  }

  get nameType() {
    return this.form.controls['nameType'];
  }

  get msgFormatId() {
    return this.form.controls['msgFormatId'];
  }

  get description() {
    return this.form.controls['description'];
  }

  get existingNameType() {
    return this.iso8583DialectService.existingData.nameType;
  }

  get existingMsgFormatId() {
    return this.iso8583DialectService.existingData.messageFormat;
  }

  get existingDescription() {
    return this.iso8583DialectService.existingData.description;
  }
}


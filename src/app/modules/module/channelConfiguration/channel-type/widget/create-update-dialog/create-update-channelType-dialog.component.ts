import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChannelTypeService} from "../../../../../../services/module-service/channel-type.service";
import {ChannelTypeModel} from "../../../../../../model/modules-model/channel-type.model";
import {
  DialectMsgTemplateGroupInterface
} from "../../../../../../interface/modules/dialect-msg-template-group.interface";
import {Iso8583DialectMsgTemplateModel} from "../../../../../../model/modules-model/iso8583-dialect-msg-template.model";
import {Select} from "@ngxs/store";
import {
  ChannelTypeState
} from "../../../../../../state-configuration/modules/channel-configuration/channel-type/channel-type.state";
import {Observable} from "rxjs";

@Component({
  selector: 'create-update-channelType-dialog',
  templateUrl: './create-update-channelType-dialog.component.html',
  styleUrls: ['./create-update-channelType-dialog.component.css']
})
export class CreateUpdateDialogChannelTypeComponent implements OnInit, AfterViewInit {
  @Select(ChannelTypeState.dialects) dialects$!: Observable<DialectMsgTemplateGroupInterface[]>;

  formGroup!: FormGroup;
  showClear: boolean = false;
  disableStatus: boolean = false;
  dialectMsgTemplateOptionList: DialectMsgTemplateGroupInterface[] = [];
  terminalTypeModel: ChannelTypeModel = new ChannelTypeModel();

  constructor(
    private fb: FormBuilder,
    public channelTypeService: ChannelTypeService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.channelTypeService.onGetAllDialectMsgTemplate();
    this.dialects$.subscribe(data => {
      this.DialectMsgTemplateOptionList = data.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  ngAfterViewInit(): void {
    if (this.channelTypeService.buttonDialogStatus == 'edit') {
      this.setExistingDataToDialog();
      this.oncCheckingFormHasChange()
      this.changeDetectorRef.detectChanges();
    }
  }

  createForm() {
    this.formGroup = this.fb.group({
      description: ['', Validators.required],
      channelType: ['', Validators.required],
      messageTemplate: ['', Validators.required]
    })
  }

  onChange($event: any) {
    this.showClear = $event != '' && $event != null;
  }

  oncCheckingFormHasChange() {
    this.disableStatus = !this.formGroup.dirty;
    this.formGroup.valueChanges.subscribe(value => {
      if (
        this.existingDescription != value.description || this.existingChannelType != value.channelType ||
        this.existingDialectMsgTemplate != value.messageTemplate.name
      ) {
        this.disableStatus = false;
      }

      if (
        this.existingDescription == value.description && this.existingChannelType == value.channelType &&
        this.existingDialectMsgTemplate == value.messageTemplate.name
      ) {
        this.disableStatus = true;
      }
    })
  }

  setExistingDataToDialog() {
    this.channelType.setValue(this.existingChannelType);
    this.description.setValue(this.existingDescription);
    this.dialectMsgTemplate.setValue({
      name: this.existingDialectMsgTemplate.nameType,
      code: String(this.existingDialectMsgTemplate.templateId)
    })
  }

  setNewDataToModel(): ChannelTypeModel {
    this.terminalTypeModel.channelType = this.channelType.value;
    this.terminalTypeModel.dialectMessageTemplate = new Iso8583DialectMsgTemplateModel(Number(this.dialectMsgTemplate.value.code));
    this.terminalTypeModel.description = this.description.value;
    return this.terminalTypeModel;
  }

  onCreateTerminalType() {
    this.channelTypeService.onAddChannelType(this.setNewDataToModel());
  }

  onUpdateTerminalType() {
    const newData = this.channelTypeService.createChannelTypeFormData(this.existingChannelType, this.setNewDataToModel());
    this.channelTypeService.onUpdateChannelType(newData, this.setNewDataToModel());
  }

  set DialectMsgTemplateOptionList(optionList: DialectMsgTemplateGroupInterface[]) {
    this.dialectMsgTemplateOptionList = optionList;
  }

  get description() {
    return this.formGroup.controls['description'];
  }

  get channelType() {
    return this.formGroup.controls['channelType'];
  }

  get dialectMsgTemplate() {
    return this.formGroup.controls['messageTemplate'];
  }

  get existingDescription() {
    return this.channelTypeService.existingData.description;
  }

  get existingChannelType() {
    return this.channelTypeService.existingData.channelType;
  }

  get existingDialectMsgTemplate() {
    return this.channelTypeService.existingData.dialectMessageTemplate;
  }
}

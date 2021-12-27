import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChannelTypeService} from "../../../../../../services/module-service/channel-type.service";
import {ChannelTypeModel} from "../../../../../../model/modules-model/channel-type.model";
import {
  DialectMsgTemplateGroupInterface
} from "../../../../../../interface/modules/dialect-msg-template-group.interface";

@Component({
  selector: 'create-update-terminalType-dialog',
  templateUrl: './create-update-terminalType-dialog.component.html',
  styleUrls: ['./create-update-terminalType-dialog.component.css']
})
export class CreateUpdateDialogTerminalTypeComponent implements OnInit, AfterViewInit, OnDestroy {
  formGroup!: FormGroup;
  showClear: boolean = false;
  disableStatus: boolean = false;
  dialectMsgTemplateOptionList: DialectMsgTemplateGroupInterface[] = [];
  terminalTypeModel: ChannelTypeModel = new ChannelTypeModel();

  constructor(
    private fb: FormBuilder,
    public terminalTypeService: ChannelTypeService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.DialectMsgTemplateOptionList = this.DialectMsgTemplateOptionList.sort((a, b) => a.name.localeCompare(b.name));
  }

  ngAfterViewInit(): void {
    if (this.terminalTypeService.buttonDialogStatus == 'edit') {
      this.setExistingDataToDialog();
      this.disableStatus = !this.formGroup.dirty;
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
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
    const data = this.DialectMsgTemplateOptionList.filter(value => {
      return value.name === String(this.existingDialectMsgTemplate);
    });
    this.channelType.setValue(this.existingChannelType);
    this.description.setValue(this.existingDescription);

    if (data.length != 0) {
      this.dialectMsgTemplate.setValue(data[0])
    }
  }

  setNewDataToModel(): ChannelTypeModel {
    this.terminalTypeModel.channelType = this.channelType.value;
    this.terminalTypeModel.dialectMsgTemplateId = this.dialectMsgTemplate.value.code;
    this.terminalTypeModel.description = this.description.value;
    return this.terminalTypeModel;
  }

  onCreateTerminalType() {
    this.terminalTypeService.onAddChannelType(this.setNewDataToModel());
    this.formGroup.reset();
  }

  onUpdateTerminalType() {
    const newData = this.terminalTypeService.createChannelTypeFormData(this.existingChannelType, this.setNewDataToModel());
    this.terminalTypeService.onUpdateTerminalType(newData);
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
    return this.terminalTypeService.existingData.description;
  }

  get existingChannelType() {
    return this.terminalTypeService.existingData.channelType;
  }

  get existingDialectMsgTemplate() {
    return this.terminalTypeService.existingData.dialectMsgTemplateId;
  }
}

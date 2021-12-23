import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  TerminalTypeService
} from "../../../../../services/terminal-configuration-service/terminal-type-service/terminal-type.service";
import {TerminalTypeModel} from "../../../../../model/TerminalTypeModel";
import {MatDialog} from "@angular/material/dialog";
import {DialectMsgTemplateGroup} from "../../../../../interface/dialect-msg-template-group";

@Component({
  selector: 'create-update-terminalType-dialog',
  templateUrl: './create-update-terminalType-dialog.component.html',
  styleUrls: ['./create-update-terminalType-dialog.component.css']
})
export class CreateUpdateDialogTerminalTypeComponent implements OnInit, AfterViewInit, OnDestroy {
  showClear: boolean = false;
  formGroup!: FormGroup;
  disableStatus: boolean = false;
  dialectMsgTemplateOptionList: DialectMsgTemplateGroup[] = [];
  terminalTypeModel: TerminalTypeModel = new TerminalTypeModel();

  constructor(
    public terminalTypeService: TerminalTypeService,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
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

  ngOnInit(): void {
    this.createForm();
    this.dialectMsgTemplateOptionList = this.terminalTypeService.dialectMsgTemplateList.sort((a, b) => a.name.localeCompare(b.name));
  }

  ngAfterViewInit(): void {
    if (this.terminalTypeService.buttonDialogStatus == 'edit') {
      this.setExistingDataToDialog();
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
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }

  onCreateTerminalType() {
    this.terminalTypeService.onAddTerminalType(this.setNewDataToModel());
    this.formGroup.reset();
  }

  onUpdateTerminalType() {
    const newData = this.terminalTypeService.createTerminalTypeFormData(this.existingChannelType, this.setNewDataToModel());
    this.terminalTypeService.onUpdateTerminalType(newData);
  }

  setNewDataToModel(): TerminalTypeModel {
    this.terminalTypeModel.channelType = this.channelType.value;
    this.terminalTypeModel.dialectMsgTemplateId = this.dialectMsgTemplate.value.code;
    this.terminalTypeModel.description = this.description.value;
    return this.terminalTypeModel;
  }

  setExistingDataToDialog() {
    const data = this.terminalTypeService.dialectMsgTemplateList.filter(value => {
      return value.name === String(this.existingDialectMsgTemplate);
    });
    this.channelType.setValue(this.existingChannelType);
    this.description.setValue(this.existingDescription);

    if (data.length != 0) {
      this.dialectMsgTemplate.setValue(data[0])
    }
  }

  get dialectMsgTemplate() {
    return this.formGroup.controls['messageTemplate'];
  }

  get description() {
    return this.formGroup.controls['description'];
  }

  get channelType() {
    return this.formGroup.controls['channelType'];
  }

  get existingId() {
    return this.terminalTypeService.existingData.id;
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

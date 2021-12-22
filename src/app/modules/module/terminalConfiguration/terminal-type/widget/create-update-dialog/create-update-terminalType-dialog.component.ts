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
  dialectMsgTemplateOptionList: DialectMsgTemplateGroup[] = [];
  terminalTypeModel: TerminalTypeModel = new TerminalTypeModel();

  constructor(
    public terminalTypeService: TerminalTypeService,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
  }

  get dialectMsgTemplate() {
    return this.formGroup.controls['messageTemplate'];
  }

  get existingId() {
    return this.terminalTypeService.existingData.id;
  }

  get existingDescription() {
    return this.terminalTypeService.existingData.description;
  }

  createForm() {
    this.formGroup = this.fb.group({
      description: ['', Validators.required],
      terminalType: ['', Validators.required],
      messageTemplate: ['', Validators.required]
    })
  }

  onChange($event: any) {
    this.showClear = $event != '' && $event != null;
  }

  get existingTerminalType() {
    return this.terminalTypeService.existingData.channelType;
  }

  get existingDialectMsgTemplate() {
    return this.terminalTypeService.existingData.dialectMsgTemplateId;
  }

  ngOnInit(): void {
    this.createForm();
    this.dialectMsgTemplateOptionList = this.terminalTypeService.dialectMsgTemplateList.sort((a, b) => a.name.localeCompare(b.name));
  }

  ngAfterViewInit(): void {
    if (this.terminalTypeService.buttonDialogStatus == 'edit') {
      this.setExistingDataToDialog();
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
  }

  get description() {
    return this.formGroup.controls['description'];
  }

  get terminalType() {
    return this.formGroup.controls['terminalType'];
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }

  onCreateTerminalType() {
    this.terminalTypeService.onAddTerminalType(this.setNewDataToModel());
    this.formGroup.reset();
  }

  onUpdateTerminalType() {
    const newData = this.terminalTypeService.createTerminalTypeFormData(this.existingTerminalType, this.setNewDataToModel());
    this.terminalTypeService.onUpdateTerminalType(newData);
  }

  setNewDataToModel(): TerminalTypeModel {
    this.terminalTypeModel.channelType = this.terminalType.value;
    this.terminalTypeModel.dialectMsgTemplateId = this.dialectMsgTemplate.value.code;
    this.terminalTypeModel.description = this.description.value;
    return this.terminalTypeModel;
  }

  setExistingDataToDialog() {
    const data = this.terminalTypeService.dialectMsgTemplateList.filter(value => {
      return value.name === String(this.existingDialectMsgTemplate);
    });
    this.terminalType.setValue(this.existingTerminalType);
    this.description.setValue(this.existingDescription);

    if (data.length != 0) {
      this.dialectMsgTemplate.setValue(data[0])
    }
  }
}

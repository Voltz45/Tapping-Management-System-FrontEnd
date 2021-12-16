import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {NotificationService} from "../../../../../../layout/service/notification.service";
import {NotificationTypeEnum} from "../../../../../../layout/enum/notification-type.enum";
import {
  TerminalService
} from "../../../../../services/terminal-configuration-service/terminal-service/terminal.service";
import {TerminalModel} from "../../../../../model/TerminalModel";
import {Router} from "@angular/router";
import {
  TerminalTableService
} from "../../../../../services/terminal-configuration-service/terminal-service/terminal-table.service";

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.css']
})
export class CreateUpdateDialogComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  filteredOptions!: Observable<string[]>;
  terminalModel: TerminalModel = new TerminalModel();
  buttonStatus: string = ''

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private notifierService: NotificationService,
    private terminalService: TerminalService,
    public terminalTableService: TerminalTableService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.buttonStatus = this.terminalTableService.buttonStatus;
  }

  ngAfterViewInit(): void {
    if (this.buttonStatus == 'edit') {
      this.setExistingDataToDialog();
      this.changeDetectorRef.detectChanges();
    }
  }

  createForm() {
    this.form = this.fb.group({
      terminalId: ['', Validators.required],
      ipAddress: ['', [Validators.required, Validators.pattern('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]],
      port: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      terminalType: ['', Validators.required],
      isOnPremise: ['']
    });
  }

  createButton() {
    this.terminalTableService.onCreateTerminal(this.setNewDataToModel());
  }

  updateButton() {
    const newData = this.terminalService.createTerminalFormData(this.existingTerminalId, this.setNewDataToModel())
    this.terminalTableService.onUpdateTerminal(newData);
  }

  setNewDataToModel(): TerminalModel {
    this.terminalModel.terminalId = this.terminalId.value;
    this.terminalModel.ipAddress = this.ipAddress.value;
    this.terminalModel.port = this.port.value;
    this.terminalModel.terminalType = this.terminalType.value;
    this.terminalModel.onPremise = this.onPremise.value;
    return this.terminalModel;
  }

  setExistingDataToDialog() {
    this.terminalId.setValue(this.existingTerminalId);
    this.ipAddress.setValue(this.existingIpAddress);
    this.port.setValue(this.existingPort);
    this.terminalType.setValue(this.existingTerminalType);
    this.onPremise.setValue(this.existingOnPremise);
  }

  disableButton() {
    return this.form.invalid;
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  get terminalId() {
    return this.form.controls['terminalId'];
  }

  get ipAddress() {
    return this.form.controls['ipAddress'];
  }

  get port() {
    return this.form.controls['port'];
  }

  get terminalType() {
    return this.form.controls['terminalType'];
  }

  get onPremise() {
    return this.form.controls['isOnPremise'];
  }

  get existingTerminalId() {
    return this.terminalTableService.existingData.terminalId;
  }

  get existingIpAddress() {
    return this.terminalTableService.existingData.ipAddress;
  }

  get existingPort() {
    return this.terminalTableService.existingData.port;
  }

  get existingTerminalType() {
    return this.terminalTableService.existingData.terminalType;
  }

  get existingOnPremise() {
    return this.terminalTableService.existingData.onPremise;
  }
}

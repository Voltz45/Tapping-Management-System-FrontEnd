import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../../../services/notification-service/notification.service";
import {ChannelService} from "../../../../../../services/module-service/channel.service";
import {ChannelModel} from "../../../../../../model/modules-model/channel.model";
import {ChannelTableService} from "../../../../../../services/module-service/channel-table.service";
import {TerminalTypeGroupInterface} from "../../../../../../interface/modules/terminal-type-group.interface";

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.css']
})
export class CreateUpdateDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  form!: FormGroup;
  terminalModel: ChannelModel = new ChannelModel();
  buttonStatus: string = '';
  showClear: boolean = false;
  terminalTypeOptionList: TerminalTypeGroupInterface[] = [];
  disableStatus: boolean = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private notifierService: NotificationService,
    private terminalService: ChannelService,
    public terminalTableService: ChannelTableService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  get channelId() {
    return this.form.controls['channelId'];
  }

  get channelType() {
    return this.form.controls['channelType'];
  }

  ngOnDestroy(): void {
  }

  get existingTerminalId() {
    return this.terminalService.existingData.channelId;
  }

  get existingIpAddress() {
    return this.terminalService.existingData.ipAddress;
  }

  get existingPort() {
    return this.terminalService.existingData.port;
  }

  get existingTerminalType() {
    return this.terminalService.existingData.channelType;
  }

  get existingOnPremise() {
    return this.terminalService.existingData.onPremise;
  }

  disableButton() {
    return this.form.invalid;
  }

  ngOnInit(): void {
    this.createForm();
    this.buttonStatus = this.terminalService.buttonStatus;
    this.terminalTypeOptionList = this.terminalService.terminalTypeList.sort((a, b) => a.name.localeCompare(b.name));
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  ngAfterViewInit(): void {
    if (this.buttonStatus == 'edit') {
      this.setExistingDataToDialog();
      this.disableStatus = !this.form.dirty;
      this.form.valueChanges.subscribe(value => {
        if (
          this.existingTerminalId != value.channelId || this.existingIpAddress != value.ipAddress ||
          this.existingPort != value.port || this.existingTerminalType != value.channelType || this.existingOnPremise != value.isOnPremise
        ) {
          this.disableStatus = false;
        }

        if (
          this.existingTerminalId == value.channelId && this.existingIpAddress == value.ipAddress &&
          this.existingPort == value.port && this.existingTerminalType == value.channelType.name && this.existingOnPremise == value.isOnPremise
        ) {
          this.disableStatus = true;
        }
      })
      this.changeDetectorRef.detectChanges();
    }
  }

  get ipAddress() {
    return this.form.controls['ipAddress'];
  }

  get port() {
    return this.form.controls['port'];
  }

  createForm() {
    this.form = this.fb.group({
      channelId: ['', Validators.required],
      ipAddress: ['', [Validators.required, Validators.pattern('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]],
      port: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      channelType: ['', Validators.required],
      isOnPremise: ['']
    });
  }

  get onPremise() {
    return this.form.controls['isOnPremise'];
  }

  createButton() {
    this.terminalService.onCreateTerminal(this.setNewDataToModel());
  }

  updateButton() {
    const newData = this.terminalService.createTerminalFormData(this.existingTerminalId, this.setNewDataToModel())
    this.terminalService.onUpdateTerminal(newData);
  }

  setNewDataToModel(): ChannelModel {
    this.terminalModel.channelId = this.channelId.value;
    this.terminalModel.ipAddress = this.ipAddress.value;
    this.terminalModel.port = this.port.value;
    this.terminalService.terminalTypeList.forEach(x => {
      if (x.code == this.channelType.value.code) {
        this.terminalModel.channelType = x.code;
      }
    })
    this.terminalModel.onPremise = this.onPremise.value;
    if (this.onPremise.value == '' || this.onPremise.value == null) {
      this.terminalModel.onPremise = false;
    }
    return this.terminalModel;
  }

  setExistingDataToDialog() {
    const data = this.terminalService.terminalTypeList.filter(value => {
      return value.name == this.existingTerminalType;
    })
    this.channelId.setValue(this.existingTerminalId);
    this.ipAddress.setValue(this.existingIpAddress);
    this.port.setValue(this.existingPort);
    if (data.length != 0) {
      this.channelType.setValue(data[0]);
    }
    this.onPremise.setValue(this.existingOnPremise);
  }

  onChange($event: any) {
    this.showClear = $event != '' && $event != null;
  }
}

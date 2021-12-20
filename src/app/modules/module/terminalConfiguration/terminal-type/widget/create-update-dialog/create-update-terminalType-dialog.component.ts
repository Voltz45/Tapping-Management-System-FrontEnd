import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  TerminalTypeGetSetService
} from "../../../../../services/terminal-configuration-service/terminal-type-service/terminal-type-get-set.service";

@Component({
  selector: 'create-update-terminalType-dialog',
  templateUrl: './create-update-terminalType-dialog.component.html',
  styleUrls: ['./create-update-terminalType-dialog.component.css']
})
export class CreateUpdateDialogTerminalTypeComponent implements OnInit {
  showClear: boolean = false;
  formGroup!: FormGroup;
  cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];

  constructor(public terminalTypeGetSet: TerminalTypeGetSetService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
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

  get description() {
    return this.formGroup.controls['description'];
  }

  get terminalType() {
    return this.formGroup.controls['terminalType'];
  }

  get messageTemplate() {
    return this.formGroup.controls['messageTemplate'];
  }
}

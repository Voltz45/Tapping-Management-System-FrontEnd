import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @ViewChild('picker') picker: any;
  @Input() form!: FormGroup;

  public showSpinners = true;
  public showSeconds = true;
  public defaultTime = [0, 0, 0]
  public color: ThemePalette = 'primary';

  constructor() {

  }

  ngOnInit() {

  }
}

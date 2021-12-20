import {Component, OnInit} from '@angular/core';
import {
  TerminalTypeGetSetService
} from "../../../services/terminal-configuration-service/terminal-type-service/terminal-type-get-set.service";

@Component({
  selector: 'app-terminal-type',
  templateUrl: './terminal-type.component.html',
  styleUrls: ['./terminal-type.component.css']
})
export class TerminalTypeComponent implements OnInit {

  constructor(public terminalTypeGetSet: TerminalTypeGetSetService) {

  }

  ngOnInit(): void {
  }

  showDialog() {
    this.terminalTypeGetSet.showDialog = true;
  }
}

import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-iso8583configuration',
  templateUrl: './iso8583configuration.component.html',
  styleUrls: ['./iso8583configuration.component.css']
})
export class Iso8583configurationComponent implements OnInit {
  value4: string = ''

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  addSingle() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
  }
}

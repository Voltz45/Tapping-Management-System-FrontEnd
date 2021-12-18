import {Component} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TMS-Apps-Ui';

  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) {
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
  }
}

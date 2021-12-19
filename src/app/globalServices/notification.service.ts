import {Injectable} from '@angular/core';
import {NotificationTypeEnum} from "../enum/notification-type.enum";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private messageService: MessageService) {
  }

  public notify(type: NotificationTypeEnum, message: string, statusCode: number) {
    this.messageService.add({
      severity: type,
      summary: this.upperCaseFirstLetter(type) + ' ' + statusCode,
      detail: message,
      life: 5000
    });
  }

  upperCaseFirstLetter(char: string): string {
    console.log(char.charAt(0).toUpperCase() + char.slice(1))
    return char.charAt(0).toUpperCase() + char.slice(1);
  }
}

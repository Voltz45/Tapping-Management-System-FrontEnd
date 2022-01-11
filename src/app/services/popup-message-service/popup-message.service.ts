import {Injectable} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {Iso8583FormatService} from "../module-service/iso8583-format.service";
import {Iso8583DialectService} from "../module-service/iso8583-dialect.service";
import {ChannelTypeService} from "../module-service/channel-type.service";
import {ChannelService} from "../module-service/channel.service";

@Injectable({
  providedIn: 'root'
})
export class PopupMessageService {
  constructor(private confirmationService: ConfirmationService) {
  }

  messageFormatConfirm(event: Event, onDelete: Iso8583FormatService) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        onDelete.onDeleteIso8583Format();
      }
    })
  }

  iso8583DialectConfirm(event: Event, onDelete: Iso8583DialectService) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        onDelete.onDeleteIso8583Dialect();
      }
    })
  }

  channelTypeConfirm(event: Event, onDelete: ChannelTypeService) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        onDelete.onDeleteChannelType()
      }
    })
  }

  channelConfirm(event: Event, onDelete: ChannelService) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        onDelete.onDeleteChannel();
      }
    })
  }
}

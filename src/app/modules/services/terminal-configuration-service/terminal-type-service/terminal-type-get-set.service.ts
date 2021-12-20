import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TerminalTypeGetSetService {
  showDialog: boolean = false;

  constructor() {
  }

  get dialogStatus() {
    return this.showDialog;
  }

  set dialogStatus(status) {
    this.showDialog = status;
  }
}

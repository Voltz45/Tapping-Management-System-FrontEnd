import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {map} from "rxjs/operators";
import {TerminalModel} from "../../../model/TerminalModel";
import {CustomHttpResponse} from "../../../../layout/model/custom-http-response";

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  apiUrl = environment.core236;

  constructor(private http: HttpClient) {
  }

  getAllTerminal() {
    return this.http.get<TerminalModel[]>(`${this.apiUrl}/channel/list`).pipe(map((response) => {
      return response;
    }))
  }

  addTerminal(data: TerminalModel) {
    return this.http.post<CustomHttpResponse>(`${this.apiUrl}/channel/register`, data).pipe(map((response) => {
      return response;
    }))
  }

  updateTerminal(data: FormData) {
    return this.http.post<CustomHttpResponse>(`${this.apiUrl}/channel/update`, data).pipe(map((response) => {
      return response;
    }))
  }

  deleteTerminal(id: number) {
    return this.http.delete(`${this.apiUrl}/channel/delete/` + id).pipe(map((response) => {
      return response;
    }))
  }

  createTerminalFormData(currentTerminalId: string, newData: TerminalModel) {
    console.log(currentTerminalId)
    const formData = new FormData();
    formData.append('currentTerminalId', currentTerminalId);
    formData.append('newTerminalId', newData.terminalId);
    formData.append('newIpAddress', newData.ipAddress);
    formData.append('newPort', newData.port);
    formData.append('newTerminalType', String(newData.terminalType));
    formData.append('isOnPremise', String(newData.onPremise));
    return formData;
  }
}

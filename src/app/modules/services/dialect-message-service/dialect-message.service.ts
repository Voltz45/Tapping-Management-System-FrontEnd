import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {DialectMsgTemplateModel} from "../../model/dialectMsgTemplateModel";

@Injectable({
  providedIn: 'root'
})
export class DialectMessageService {
  apiUrl = environment.core236;

  constructor(private http: HttpClient) {
  }

  getAllDialectMsgTemplate() {
    return this.http.get<DialectMsgTemplateModel[]>(`${this.apiUrl}/dialectMsgTemplate/list`).pipe(map(response => {
      return response;
    }));
  }
}

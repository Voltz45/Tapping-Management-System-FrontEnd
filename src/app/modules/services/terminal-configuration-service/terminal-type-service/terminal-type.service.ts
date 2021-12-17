import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {map} from "rxjs/operators";
import {TerminalTypeModel} from "../../../model/TerminalTypeModel";

@Injectable({
  providedIn: 'root'
})
export class TerminalTypeService {

  apiUrl = environment.core236;

  constructor(private http: HttpClient) {
  }

  getAllTerminalType() {
    return this.http.get<TerminalTypeModel[]>(`${this.apiUrl}/terminalType/list`).pipe(map((response) => {
      return response;
    }));
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {TerminalModel} from "../../model/TerminalModel";

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  apiUrl = environment.core236;

  constructor(private http: HttpClient) {
  }

  getAllTerminal() {
    return this.http.get<TerminalModel[]>(`${this.apiUrl}/terminal/list`).pipe(map((response) => {
      return response;
    }))
  }
}

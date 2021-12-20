import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IsoDialectService {
  apiUrl = environment.core236;

  constructor(private http: HttpClient) {
  }

  getAllTerminalType() {
    return this.http.get(`${this.apiUrl}/`)
  }
}

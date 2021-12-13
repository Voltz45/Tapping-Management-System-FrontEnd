import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl = environment.core236;

  constructor(private http: HttpClient) {
  }

  getListInterfaces() {
    return this.http.get<any>(`${this.apiUrl}/interfaceslist`).pipe(map((response) => {
      return response;
    }));
  }
}

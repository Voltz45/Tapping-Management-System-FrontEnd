import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TransactionMessageModel} from "../../model/modules-model/transaction-message-model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {
  apiUrl = environment.core236;

  constructor(private http: HttpClient) {
  }

  getAllTransactionMessage() {
    return this.http.get<TransactionMessageModel[]>(`${this.apiUrl}/Transaction/list`).pipe(map(response => {
      return response;
    }));
  }
}

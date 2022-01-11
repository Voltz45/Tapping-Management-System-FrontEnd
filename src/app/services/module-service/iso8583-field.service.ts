import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../notification-service/notification.service";
import {Iso8583Model} from "../../model/modules-model/iso8583-field-model";
import {environment} from "../../../environments/environment";
import {CustomHttpResponseModel} from "../../model/customHttpResponse-model/custom-http-response.model";
import {
  ISO8583FieldDispatch
} from "../../state-configuration/modules/external-interfaces/iso8583configuration/iso8583-field-configuration/iso8583-field.dispatch";

interface isoFormat {
  value: string;
  viewValue: string;
}

interface isoFormatGroup {
  disabled?: boolean;
  name: string;
  isoFormat: isoFormat[];
}

interface tagLenSize {
  value: string;
  viewValue: string;
}

interface tagLenSizeGroup {
  tagLenSize: tagLenSize[];
}

@Injectable({
  providedIn: 'root'
})
export class Iso8583FieldService {
  private apiUrl = environment.core236;
  isoFormatGroups: isoFormatGroup[] = [
    {
      name: 'ASCII',
      isoFormat: [
        {value: 'IFA_LLLCHAR', viewValue: 'A_LLLCHAR'},
        {value: 'IFA_LLCHAR', viewValue: 'A_LLCHAR'},
        {value: 'IF_CHAR', viewValue: 'CHAR'},
        {value: 'IFA_AMOUNT', viewValue: 'A_AMOUNT'},
      ]
    },
    {
      name: 'Binary',
      isoFormat: [
        {value: 'IFB_LLLCHAR', viewValue: 'B_LLLCHAR'},
        {value: 'IFB_LLLCHAR', viewValue: 'B_LLCHAR'},
        {value: 'IFB_NUMERIC', viewValue: 'B_NUMERIC'},
      ]
    }
  ];

  tagLenSizeGroups: tagLenSize[] = [
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'}
  ]

  constructor(
    private http: HttpClient,
    private notifierService: NotificationService,
    private ISO8583FieldDispatch: ISO8583FieldDispatch
  ) {}

  // /TODO: Add Service ISO8583 Field/
  getAllIso8583Field() {
    return this.http.get<Iso8583Model>(`${this.apiUrl}/`);
  }

  addIso8583Field(data: Iso8583Model) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/ISO8583CONF/${data.dialectTemplate.templateId}/add`, data);
  }

  onGetAllIso8583Field() {
    this.ISO8583FieldDispatch._ISO8583FieldGet();
  }

  onCreateIso8583Field(payload: Iso8583Model) {
    this.ISO8583FieldDispatch._ISO8583FieldAdd(payload);
  }

  onUpdateIso8583Field() {
    this.ISO8583FieldDispatch._ISO8583FieldDelete();
  }

  onDeleteIso8583Field() {
    this.ISO8583FieldDispatch._ISO8583FieldDelete();
  }

  onGetAllDialectMsgTemplate() {
    this.ISO8583FieldDispatch._ISO8583FieldGetDialect();
  }
}

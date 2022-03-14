import {Injectable} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {
  ButtonIso8583DialectComponent
} from "../../modules/module/external-interfaces/iso8583configuration/iso8583-dialect/widget/action-button-group-iso8583-dialect/button-iso8583-dialect.component";
import {OverlayLoadingComponent} from "../../modules/module/global-widget/overlay-loading/overlay-loading.component";

@Injectable({
  providedIn: 'root'
})
export class Iso8583FieldTableService {
  animateRow: boolean = true;
  rowHeight: number = 40;
  headerHeight: number = 40;
  overlayLoadingTemplate: string = 'overlayLoading';
  frameworkComponents = {
    actionButtonGroup: ButtonIso8583DialectComponent,
    overlayLoading: OverlayLoadingComponent
  };
  defaultColDef: ColDef = {
    flex: 1,
    editable: false,
    sortable: true,
    lockPosition: true,
    headerClass: 'iso8583Field-header-color',
  };
  columnDefs: ColDef[] = [
    {field: 'id', hide: true},
    {field: 'name', sort: 'asc'},
    {field: 'dialectTemplate'},
  ]
  constructor() { }
}

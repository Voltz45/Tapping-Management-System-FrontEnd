import {Injectable} from '@angular/core';
import {ColDef, ColumnApi, GridApi} from "ag-grid-community";
import {TerminalTypeService} from "./terminal-type.service";
import {TerminalTypeModel} from "../../../model/TerminalTypeModel";

@Injectable({
  providedIn: 'root'
})
export class TerminalTypeTableService {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 110,
    editable: false,
    sortable: true
  };

  columnDefs: ColDef[] = [
    {field: 'id', hide: true},
    {field: 'terminalType'},
    {field: 'msgTemplate'},
    {field: 'description'},
  ]

  constructor(private terminalTypeService: TerminalTypeService) {
  }

  getAllTerminalTypeWithDelay() {
    setTimeout(() => {
      this.onGetAllTerminalType();
    });
  }

  onGetAllTerminalType() {
    this.terminalTypeService.getAllTerminalType().subscribe({
      next: this.responseGetAllTerminalType()
    })
  }

  private responseGetAllTerminalType() {
    return (response: TerminalTypeModel[]) => {
      if (response.length != 0) {
        console.log(response)
        this.hideTableLoading();
        this.gridApi.setRowData(response);
      } else {
        this.showNoRowData();
      }
    }
  }

  hideTableLoading() {
    this.gridApi.hideOverlay();
  }

  showNoRowData() {
    this.gridApi.showNoRowsOverlay();
  }
}

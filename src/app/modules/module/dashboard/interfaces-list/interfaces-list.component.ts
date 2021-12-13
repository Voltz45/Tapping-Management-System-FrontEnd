import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DashboardService} from "../../../services/dashboard-service/dashboard.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";

export interface InterfaceModel {
  position: number;
  description: string;
  address: string;
  netmask: string;
  broadcastAddress: string;
  star: string;
}

@Component({
  selector: 'interfaces-list',
  templateUrl: './interfaces-list.component.html',
  styleUrls: ['./interfaces-list.component.css']
})
export class InterfacesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  interfaceList: InterfaceModel[] = [];
  dataSource: MatTableDataSource<InterfaceModel> | any;
  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: InterfaceModel) => `${element.position}`,
    },
    {
      columnDef: 'description',
      header: 'Description',
      cell: (element: InterfaceModel) => `${element.description}`,
    },
    {
      columnDef: 'address',
      header: 'IP Address',
      cell: (element: InterfaceModel) => `${element.address}`,
    },
    {
      columnDef: 'star',
      cell: (element: InterfaceModel) => `${element.star}`,
    }
  ];
  interfaceDialogTitle: string[] = ['IP Address', 'Netmask', 'Broadcast Address']
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getInterfacesList();
  }

  getInterfacesList() {
    this.dashboardService.getListInterfaces().subscribe({
      next: this.dataHandler.bind(this),
      error: err => console.log(err.message)
    })
  }

  dataHandler(response: any) {
    const keyValue = Object.keys(response)[0];
    let removeFirstAndLastEl = keyValue.substring(1, keyValue.length - 1)
    const arrayKeyValue = removeFirstAndLastEl.split(",");
    for (let i = 0; i < arrayKeyValue.length; i++) {
      const value = Array.from(response[keyValue]);
      if (i == 0) {
        arrayKeyValue[i].substring(1);
      }
      const eachValue = value[i] as String;
      const valueToArray = eachValue.split("] ");
      let description: string = arrayKeyValue[i];
      let address: string = '';
      let netmask: string = '';
      let broadcastAddress: string = '';
      valueToArray.forEach((x) => {
        if (x.includes('address')) {
          address = x.replace('address: [/', '');
        }

        if (x.includes('netmask')) {
          netmask = x.replace('netmask: [/', '');
        }

        if (x.includes('broadcastAddr')) {
          broadcastAddress = x.replace('broadcastAddr: [/', '');
        }
      })
      const dataInterface: InterfaceModel = {
        position: i + 1,
        description: description,
        address: address,
        netmask: netmask,
        broadcastAddress: broadcastAddress,
        star: ''
      };
      this.interfaceList.push(dataInterface);
    }
    this.dataSource = new MatTableDataSource(this.interfaceList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(interfacesDialog: TemplateRef<any>) {
    this.dialog.open(interfacesDialog);
  }

  dialogInterfaceValue(title: string, index: number) {
    switch (title) {
      case 'IP Address':
        return this.interfaceList[index].address;
      case 'Netmask':
        return this.interfaceList[index].netmask;
      case 'Broadcast Address':
        return this.interfaceList[index].broadcastAddress
      default:
        return 'No Data';
    }
  }
}

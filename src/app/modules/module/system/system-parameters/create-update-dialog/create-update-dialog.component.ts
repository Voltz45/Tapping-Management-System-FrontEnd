import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.css']
})
export class CreateUpdateDialogComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}

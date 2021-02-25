import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-qrhub',
  templateUrl: './qrhub.component.html',
  styleUrls: ['./qrhub.component.scss']
})
export class QrhubComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QrhubComponent>) { }

  chart_arr:string[][];
  qr_data:string;

  ngOnInit(): void {

    this.chart_arr = JSON.parse(localStorage.getItem("wuerfe500"));
    this.qr_data = this.chart_arr.toString();
  }

}

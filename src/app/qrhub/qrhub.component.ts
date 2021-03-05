import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material/tabs';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-qrhub',
  templateUrl: './qrhub.component.html',
  styleUrls: ['./qrhub.component.scss']
})
export class QrhubComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QrhubComponent>) { }

  chart_arr:string[][];
  qr_data:string;

  formatsEnabled: BarcodeFormat[] = [
/*     BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13, */
    BarcodeFormat.QR_CODE,
  ];

  tryHarder = true;


  onCodeResult(resultString: string) {
    var sendResult:string[] = new Array(501);
    sendResult = resultString.split(',');
    //console.log(sendResult);
    this.dialogRef.close(sendResult);
  }

  ngOnInit(): void {
    this.chart_arr = JSON.parse(localStorage.getItem("wuerfe500"));
    this.qr_data = this.chart_arr.toString();
  }

}

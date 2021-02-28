import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js'
import { MatDialog } from '@angular/material/dialog';
import { QrhubComponent } from '../qrhub/qrhub.component';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { RGBLuminanceSource } from '@zxing/library';

var myChart_global = null;
var rdm_number: number[];
var chart_arr:number[][];

chart_arr = new Array(501);

function create_chart(num_try_send: number, ani_num:number){
  myChart_global = new Chart("myChart", {
    type: 'bar',
    data: {
        labels: ['Rot', 'Grün', 'Gelb', 'Blau'],
        datasets: [{
            label: 'Alles Zufall?',
            data: chart_arr[num_try_send],
            color: 'rgb(66, 66, 66)',
            backgroundColor: [
                'rgb(189, 63, 51)',
                'rgb(115, 175, 85)',
                'rgb(242, 211, 0)',
                'rgb(65, 122, 167)',
            ],
            borderColor: [
                'rgb(189, 63, 51)',
                'rgb(115, 175, 85)',
                'rgb(242, 211, 0)',
                'rgb(65, 122, 167)',
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        labels: {
            fontColor: 'rgb(66, 66, 66)',
        }
      },
      animation: {
        duration: ani_num
      },
      title: {
        display: false,
        text: 'Custom Chart Title'
      },
        scales: {
          xAxes: [{
            gridLines: {
                drawOnChartArea: false,
                color: 'rgb(66, 66, 66)',
              },
              ticks: {
                fontColor: 'rgb(66, 66, 66)',
            }
            }],
            yAxes: [{
              gridLines: {
                drawOnChartArea: false,
                color: 'rgb(66, 66, 66)'
              },
                ticks: {
                    beginAtZero: true,
                    color: 'rgb(0, 0, 0)',
                    fontColor: 'rgb(66, 66, 66)',

                }
            }]
        }
    }
  });
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  num_try: number;

  Create_random_numbers(click_check:boolean):void
  {
      var farbe_array: number[];
      rdm_number = new Array(501);
      chart_arr = new Array(501);

      //Überprüfen, ob "Neu" angeklickt wurde
      if(click_check){
        this.num_try=1
      }

      //chart_arr[0] initialisieren
      chart_arr[0] = [0,0,0,0];
      rdm_number[0] = 0;

      for (var i:number = 1; i <= 500; i++)
      { // print numbers from 1 to 500
          rdm_number[i] = Math.floor(Math.random() * 20) + 1;// liefert 1 bis 6
          farbe_array = this.get_color(rdm_number[i]);

          for(var e in farbe_array) { 
            chart_arr[i] = [chart_arr[i-1][0] + farbe_array[0],
                            chart_arr[i-1][1] + farbe_array[1],
                            chart_arr[i-1][2] + farbe_array[2],
                            chart_arr[i-1][3] + farbe_array[3]
                          ];
          }
      }

      // Werte in die Chart übernehmen
      if(myChart_global!=null){
        myChart_global.destroy();
      }

      //Werte lokal speichern
      localStorage.setItem("random500", JSON.stringify(chart_arr));
      localStorage.setItem("wuerfe500", JSON.stringify(rdm_number));

      create_chart(this.num_try, 1500);

  }

  valueChange(change_num:number){
    if (this.num_try < 500 && change_num == 1 || this.num_try > 1 && change_num == -1){
      this.num_try=this.num_try+change_num;
    
      this.getSliderValue("", this.num_try, false);
    }
  }

  getSliderValue(event:any, value_send:number, slide_check:boolean) {
      //Wert setzen
      if (slide_check)
      {
        this.num_try = event.value;
      }
      else{
        this.num_try = value_send;
      }

      // Werte in die Chart übernehmen
      if(myChart_global!=null){
        myChart_global.destroy();
      }

      create_chart(this.num_try, 0);
 }

 saveValue(event:any, slide_check:boolean) {
  //Wert setzen
  if (slide_check)
  {
    this.num_try = event.value;
  }

  //Wert speichern in JSON
  localStorage.setItem("sliderValue", JSON.stringify(this.num_try));

}

  get_color(rnd_num:number){
    var num_send:number[]

    switch (rnd_num) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        num_send =[1,0,0,0];
        break;

      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        num_send =[0,1,0,0];
        break;

      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
        num_send =[0,0,1,0];
        break;

      case 18:
      case 19:
      case 20:
        num_send =[0,0,0,1];
        break;
    }

    return num_send;
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(QrhubComponent, {
      data:{
        // title_box: "Details zu " + data_in.bezeichnung,
        // id_data_box: data_in.id,
      },
      maxWidth: '900px',
      disableClose: false,
      autoFocus: false
    }); //Box mit Datenweitergabe

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined)
      {
        //Hier können Aktionen nach dem Schließen des Fensters ausgeführt werden
        var farbe_array: number[];
        rdm_number = new Array(501);
        chart_arr = new Array(501);
  
        //console.log(result);

        //chart_arr[0] initialisieren
        chart_arr[0] = [0,0,0,0];
        rdm_number[0] = 0;

        //console.log(result);
  
        for (var i:number = 1; i <= 500; i++)
        { // print numbers from 1 to 500
          rdm_number[i] = Number(result[i]);
            
            farbe_array = this.get_color(rdm_number[i]);
  
            for(var e in farbe_array) { 
              chart_arr[i] = [chart_arr[i-1][0] + farbe_array[0],
                              chart_arr[i-1][1] + farbe_array[1],
                              chart_arr[i-1][2] + farbe_array[2],
                              chart_arr[i-1][3] + farbe_array[3]
                            ];
            }
        }
  
        // Werte in die Chart übernehmen
        if(myChart_global!=null){
          myChart_global.destroy();
        }
  
        //Werte lokal speichern
        localStorage.setItem("random500", JSON.stringify(chart_arr));
        localStorage.setItem("wuerfe500", JSON.stringify(rdm_number));
  
        create_chart(this.num_try, 1500);
      }
        
    });

  }


  showDatenschutz(){
    // Noch erstellen
  }

  ngOnInit(): void {
    //Überprüfen, ob Wert von SLider existiert
    if (localStorage.getItem("sliderValue") === null) {
      this.num_try = 1;

      //Wert speichern in JSON
      localStorage.setItem("sliderValue", JSON.stringify(this.num_try));
    }
    else{
      this.num_try = JSON.parse(localStorage.getItem("sliderValue"));
    }


    if (localStorage.getItem("random500") === null || localStorage.getItem("wuerfe500") ===null) {
      // console.log("Neu");
      this.Create_random_numbers(false);
    }
    else{
      // console.log("Vorhanden");
/*       var test:string[] = new Array(501);
      test = JSON.parse(localStorage.getItem("wuerfe500").replace("/[/gi","").replace("/]/gi",""));
      console.log(test); */
      //console.log(JSON.parse(localStorage.getItem("wuerfe500")));
      chart_arr = JSON.parse(localStorage.getItem("random500"));
      create_chart(this.num_try, 1500);
    }

   
  }

}

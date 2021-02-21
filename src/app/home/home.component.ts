import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js'

var myChart_global = null;
var rdm_number: number[];
var chart_arr:number[][];

function create_chart(data_get:number[], ani_num:number){
  myChart_global = new Chart("myChart", {
    type: 'bar',
    data: {
        labels: ['Rot', 'Grün', 'Gelb', 'Blau'],
        datasets: [{
            label: 'Alles Zufall?',
            data: data_get,
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
                // display:false,
                drawOnChartArea: false
              }
            }],
            yAxes: [{
              gridLines: {
                // display:false,
                drawOnChartArea: false
              },
                ticks: {
                    beginAtZero: true
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

  constructor() { }

  num_try: string;

  Create_random_numbers():void
  {
      var filename_str:string = "random.csv";
      var farbe_ges_array: number[] = [0,0,0,0];
      var farbe_array_send: number[] = [0,0,0,0];
      var farbe_array: number[];
      rdm_number = new Array(501);
      chart_arr = new Array(501);

      for (var i:number = 1; i <= 500; i++)
      { // print numbers from 1 to 500
          rdm_number[i] = Math.floor(Math.random() * 20) + 1;// liefert 1 bis 6
          farbe_array = this.get_color(rdm_number[i]);

          for(var e in farbe_array) { 
            farbe_ges_array[e]=farbe_ges_array[e]+farbe_array[e];
            if(Number(this.num_try) >= i){
              farbe_array_send[e]=farbe_array_send[e]+farbe_array[e];
            }
          }
          //chart_arr[i] =farbe_ges_array;
      }

      // Werte in die Chart übernehmen
      if(myChart_global!=null){
        myChart_global.destroy();
      }
      create_chart(farbe_array_send, 1500);

      
      //Zahlenreihe in csv speichern
      // CSV_Class.WriteCSV(rdm_number, Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData) + "/", filename_str));
  }

  valueChange(change_num:number){
    var slider_value:number=Number((<HTMLInputElement>document.getElementById("myRange")).value);

    if (slider_value < 500 && change_num == 1 || slider_value > 1 && change_num == -1){
      (<HTMLInputElement>document.getElementById("myRange")).value=String(Number((<HTMLInputElement>document.getElementById("myRange")).value)+change_num);
    
      this.getSliderValue("", Number((<HTMLInputElement>document.getElementById("myRange")).value), false);
    }
  }

  getSliderValue(event:any, value_send:number, slide_check:boolean) {
      var border_arr:number;
      var farbe_ges_array: number[] = [0,0,0,0];
      var farbe_array_send: number[] = [0,0,0,0];
      var farbe_array: number[];

      if (slide_check)
      {
        border_arr = event.target.value;
      }
      else{
        border_arr = value_send;
      }

      //console.log(border_arr);

      //Wert vom Label anpassen
      this.num_try = (<HTMLInputElement>document.getElementById("myRange")).value
 
      for (var i:number = 1; i <= border_arr; i++)
      { // print numbers from 1 to 500
          farbe_array = this.get_color(rdm_number[i]);

          for(var e in farbe_array) { 
            farbe_ges_array[e]=farbe_ges_array[e]+farbe_array[e];
            if(Number(this.num_try) >= i){
              farbe_array_send[e]=farbe_array_send[e]+farbe_array[e];
            }
          }
      }

      // Werte in die Chart übernehmen
      if(myChart_global!=null){
        myChart_global.destroy();
      }
      create_chart(farbe_array_send, 0);
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

  ngOnInit(): void {
    this.num_try = (<HTMLInputElement>document.getElementById("myRange")).value;
    this.Create_random_numbers();
  }

}

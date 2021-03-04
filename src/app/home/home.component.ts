import { Component, OnInit, HostListener } from '@angular/core';
import { Chart } from 'node_modules/chart.js'
import { MatDialog } from '@angular/material/dialog';
import { QrhubComponent } from '../qrhub/qrhub.component';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { SwUpdate } from '@angular/service-worker';
import { RGBLuminanceSource } from '@zxing/library';

var myChart_global = null;
var rdm_number: number[];
var chart_arr:number[][];

chart_arr = new Array(501);

function create_chart(num_try_send: number, ani_num:number, deviceOS_send:string){

    //Styles checken
    switch (deviceOS_send) {
      case 'ios':
          myChart_global = new Chart("myChart_iOS", {
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
              maintainAspectRatio: false,
              aspectRatio: 4,
              responsive: true,
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
                            callback: function (value) { if (Number.isInteger(value)) { return value; } },
                            // stepSize: 1,
                            color: 'rgb(0, 0, 0)',
                            fontColor: 'rgb(66, 66, 66)',
        
                        }
                    }]
                }
            }
          });
          break;

      case 'android':
        myChart_global = new Chart("myChart_Android", {
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
              maintainAspectRatio: false,
              aspectRatio: 4,
              responsive: true,
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
                            callback: function (value) { if (Number.isInteger(value)) { return value; } },
                            // stepSize: 1,
                            color: 'rgb(0, 0, 0)',
                            fontColor: 'rgb(66, 66, 66)',
        
                        }
                    }]
                }
            }
          });
          break;

      default:
          myChart_global = new Chart("myChart_default", {
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
              maintainAspectRatio: false,
              aspectRatio: 4,
              responsive: true,
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
                            callback: function (value) { if (Number.isInteger(value)) { return value; } },
                            // stepSize: 1,
                            color: 'rgb(0, 0, 0)',
                            fontColor: 'rgb(66, 66, 66)',
        
                        }
                    }]
                }
            }
          });
          break;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private deviceDetectorService: DeviceDetectorService, private swUpdate: SwUpdate) { }

  num_try: number;
  deviceInfo:DeviceInfo;
  deviceOS:string;
  title = 'alleszufall';
  deferredPrompt: any;
  showButton = false;
  
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

      create_chart(this.num_try, 1500, this.deviceOS);

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

      create_chart(this.num_try, 0, this.deviceOS);
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
  
        create_chart(this.num_try, 1500, this.deviceOS);
      }
        
    });

  }

  @HostListener('window:orientationchange')

  onorientationchange() {
    //alert(window.orientation);
    if(window.orientation==90 || window.orientation ==270){
      myChart_global.options.aspectRatio = 4;
    }
    else{
      myChart_global.options.aspectRatio = 0.25;
    }

  }

  @HostListener('window:beforeinstallprompt', ['$event'])

  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;

    //Überprüfen, ob Wert von SLider existiert
    if (localStorage.getItem("installed") === null) {
      this.showButton = true;
    }
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
    .then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    this.deferredPrompt = null;

    // Entscheidung im lokalen Speicher sichern
    localStorage.setItem("installed", JSON.stringify("Ja"));
  });

}

closeInstallbanner(){
  this.showButton = false;
}

  ngOnInit(): void {

    // Nch Updates suchen
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((evt) => {
        const updateApp = window.confirm(`
          Ein Update ist verfügbar (${evt.current.appData['version']} => ${evt.available.appData['version']}).
          Änderungen: ${evt.available.appData['changelog']}
          Wollen Sie das Update jetzt installieren?
        `);
        if (updateApp) { window.location.reload(); }
      });
    }

    
    //Styles checken
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
    console.log(this.deviceInfo.os.toLowerCase());

    this.deviceOS = this.deviceInfo.os.toLowerCase()

    switch (this.deviceOS) {
      case 'ios':
        (<HTMLElement>document.getElementById("myChart_Android")).hidden=true;
        (<HTMLElement>document.getElementById("myChart_default")).hidden=true;
          break;

      case 'android':
        (<HTMLElement>document.getElementById("myChart_iOS")).hidden=true;
        (<HTMLElement>document.getElementById("myChart_default")).hidden=true;
          break;

      default:
        (<HTMLElement>document.getElementById("myChart_iOS")).hidden=true;
        (<HTMLElement>document.getElementById("myChart_Android")).hidden=true;
          break;
  }


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
      // Neu
      this.Create_random_numbers(false);
    }
    else{
      // Vorhanden
      chart_arr = JSON.parse(localStorage.getItem("random500"));
      create_chart(this.num_try, 1500, this.deviceOS);
    }

   
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatCardModule} from  '@angular/material/card';
import { MatButtonModule } from  '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { QRCodeModule } from 'angularx-qrcode';
import { QrhubComponent } from './qrhub/qrhub.component'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { DeviceDetectorService} from 'ngx-device-detector';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    FooterComponent,
    HomeComponent,
    QrhubComponent,
    DatenschutzComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    MatDialogModule,
    MatTabsModule,
    QRCodeModule,
    ZXingScannerModule,
    // DeviceDetectorService,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

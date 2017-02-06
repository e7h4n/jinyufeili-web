import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SensorStationComponent } from './sensor-station/sensor-station.component';

import { DataPointService } from './data-point.service';
import { AppRoutingModule }   from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    SensorStationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataPointService],
  bootstrap: [AppComponent]
})
export class AppModule { }

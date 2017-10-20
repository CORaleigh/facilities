import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CityworksService } from './cityworks.service';
import { HttpClientModule } from '@angular/common/http';
import { ArcgisService } from './arcgis.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ CityworksService, ArcgisService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

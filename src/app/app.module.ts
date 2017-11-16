import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CityworksService } from './cityworks.service';
import { HttpClientModule } from '@angular/common/http';
import { ArcgisService } from './arcgis.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EsriLoaderModule, EsriLoaderService } from 'angular-esri-loader';
import { EsriMapComponent } from './esri-map/esri-map.component';

@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    EsriLoaderModule
  ],
  providers: [ CityworksService, ArcgisService, EsriLoaderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

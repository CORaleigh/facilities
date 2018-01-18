import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {

  map: __esri.Map;
  mapView: __esri.MapView;

  @ViewChild('map') mapEl: ElementRef;

  @Input() mapProperties: __esri.MapProperties;
  @Input() mapViewProperties: __esri.MapViewProperties = {};
  
  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor() { }

  public ngOnInit() {

    return loadModules([
      'esri/Map',
      'esri/views/MapView'
    ]).then(([Map, MapView]) => {
      const mapProperties: any = {
        basemap: 'streets-navigation-vector'
      };

      const map: any = new Map(mapProperties);

      const mapViewProperties: any = {
        // create the map view at the DOM element in this component
        container: this.mapViewEl.nativeElement,
        // supply additional options
        // center: [-12.287, -37.114],
        center: [-78.65, 35.8],
        zoom: 12,
        map // property shorthand for object literal
      };

      this.mapView = new MapView(mapViewProperties);
    })
      .catch(err => {
        console.log(err);
      });
  } 
}
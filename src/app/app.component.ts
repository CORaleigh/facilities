import { Component, OnInit } from '@angular/core';
import { CityworksService } from './cityworks.service';
import { ArcgisService } from './arcgis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  srId: any;
  chkStatusresults: void;
  buildings: string[];

  title = 'app';

  constructor(private cityworksservice: CityworksService, private arcgisservice: ArcgisService) {}

  ngOnInit(): void {

    this.buildings = this.arcgisservice.getFacilities();
    // this.buildings = this.
    // we should move this to another method that is only invoked when check status field is submitted
    this.chkStatusresults = this.cityworksservice.getServiceRequest(this.srId);
    console.log('results = ', this.chkStatusresults);

  }


}

import { Component, OnInit } from '@angular/core';
import { CityworksService } from './cityworks.service';
import { ArcgisService } from './arcgis.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private requestid = '358589';
  chkStatusresults: Subscription;
  buildings: string[];

  title = 'app';

  constructor(private cityworksservice: CityworksService, private arcgisservice: ArcgisService) {}

  ngOnInit(): void {

    this.buildings = this.arcgisservice.getFacilities();
    // this.buildings = this.
    // we should move this to another method that is only invoked when check status field is submitted
    this.cityworksservice.getServiceRequest(this.requestid).subscribe(ServiceRequest => {
      console.log('status = ', ServiceRequest.Value.Status);
    }, err => {
    console.log('some error happened');
    });


  }


}

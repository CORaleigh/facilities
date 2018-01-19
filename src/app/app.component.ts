import { Value } from './service-request';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { Buildings } from './buildings';
import { CityworksService } from './cityworks.service';
import { ArcgisService } from './arcgis.service';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent) childMapComponent;

  coords: { x: number; y: number; };
  lindex: number;
  pindex: number;
  formattedMessage: string;
  locations: Array<{
    descr: string, geometry: {
      x: number,
      y: number
    }
  }> = [];
  problems: Array<{ descr: string, problemSid: number }> = [];
  title = 'app';
  geometry: {
    "x": -78.607868672773819,
    "y": 35.866855800674266
  };
  public myForm: FormGroup; // our model driven form
  buildings: Buildings;
  // mapcomponent: MapComponent;

  constructor(private _fb: FormBuilder, private cityworksservice: CityworksService, private arcgisservice: ArcgisService) { }

  ngOnInit() {

    this.myForm = this._fb.group({
      callerFirstName: [''],
      callerLastName: ['', [<any>Validators.required]],
      callerCity: ['Raleigh'],
      callerState: ['NC'],
      callerZip: [''],
      callerEmail: ['', <any>Validators.email],
      callerWorkPhone: [''],
      comments: [''],
      callerComments: [''],
      loc: ['', [<any>Validators.required]],
      problemCode: ['', [<any>Validators.required]]
    });

    this.arcgisservice.getFacilities().subscribe(
      data => {
        for (let i = 0; i < data.features.length; i++) {
          // console.log(data.features[i].attributes.LOCATION);
          if (data.features[i].attributes.WEBFORM === 'Y') {
            this.locations.push({ descr: data.features[i].attributes.LOCATION, geometry: data.features[i].geometry} );
          }
        }
        this.locations.sort(function(a, b) {
          if (a["descr"] < b["descr"]) return -1;
          if (a["descr"] > b["descr"]) return 1;
          return 0;
      });
      },
      err => {
        console.log('some error happened');
        this.locations.push({ descr: 'Error getting facilities list', geometry: {x: 0, y: 0} });
      }
    );

    this.cityworksservice.getProblemTypes().subscribe(
      data => {
        for (let i = 0; i < data.Value.length; i++) {
          // console.log(data.Value[i].Description);
          this.problems.push({ descr: data.Value[i].Description, problemSid: data.Value[i].ProblemSid });
        }
        this.problems.sort();
      },
      err => {
        console.log('some error happened');
        this.problems.push({ descr: 'Error getting problems list', problemSid: 0 });
      }
    );
    this.onChanges();
  }

  onChanges(): void {
    this.myForm.get('problemCode').valueChanges.subscribe(val => {
      this.pindex = this.problems.indexOf(val);
      console.log('sid is ', this.problems[this.pindex].problemSid);
    });

    this.myForm.get('loc').valueChanges.subscribe(val => {
      this.lindex = this.locations.indexOf(val);
      // TODO: pass geometry to map
      console.log('geometry is ', this.locations[this.lindex].geometry);
      this.coords = this.locations[this.lindex].geometry;
      this.childMapComponent.zoom(this.coords);

      this.formattedMessage = `My name is ${val.descr}.`;
      console.log('formattedMessage = ', this.formattedMessage);
    });
  }

  save(model: User, isValid: boolean) {

    model.address = this.myForm.get('callerEmail').value;
    model.problemSid = this.myForm.get('problemCode').value;

    console.log('model is ', model, isValid);
    console.log('stringified model', JSON.stringify(model));

    // this._servicerequestService.createServiceRequest(model).subscribe(
    //   data => this.authResponse = data,
    //   err => console.error(err),
    //   () => {
    //     this.isDone = true;
    //     if (this.authResponse.requestId === "") {
    //       console.log('no ServiceRequest ID was returned');
    //     }
    //     console.log('this response is ', this.authResponse);
    //   }
    // );
  }
}

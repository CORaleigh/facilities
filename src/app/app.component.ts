import { Value } from './service-request';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { Buildings } from './buildings';
import { CityworksService } from './cityworks.service';
import { ArcgisService } from './arcgis.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  index: number;
  formattedMessage: string;


  buildings: Buildings;

  constructor(private _fb: FormBuilder, private cityworksservice: CityworksService, private arcgisservice: ArcgisService) { }

  // location = "";
  locations = [];
  // problems = [];
  problems: Array<{descr: string, problemSid: number}> = [];


  title = 'app';
  public myForm: FormGroup; // our model driven form
  x;

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
          console.log(data.features[i].attributes.LOCATION);
          if (data.features[i].attributes.WEBFORM === 'Y') {
            this.locations.push(data.features[i].attributes.LOCATION);
          }
        }
        this.locations.sort();
        // console.log('location selected = ', this.location);
      },
      err => {
        console.log('some error happened');
        this.locations.push('Error getting facilities list');
      }
    );

    this.cityworksservice.getProblemTypes().subscribe(
      data => {
        for (let i = 0; i < data.Value.length; i++) {
          console.log(data.Value[i].Description);
          this.problems.push({descr: data.Value[i].Description, problemSid: data.Value[i].ProblemSid});
        }
        this.problems.sort();
      },
      err => {
        console.log('some error happened');
        this.problems.push({descr: 'Error getting problems list', problemSid: 0});
      }
    );

    this.onChanges();

  }

  onChanges(): void {
    this.myForm.get('problemCode').valueChanges.subscribe(val => {
      this.index = this.problems.indexOf(val);
      console.log('sid is ', this.problems[this.index].problemSid);
      this.formattedMessage = `My name is ${val.descr}.`;
      console.log('formattedMessage = ',this.formattedMessage);
    });  
  }

  save(model: User, isValid: boolean) {

    // delete model.srStatus;
    // move callerAddress to address to display in Cityworks in both fields
    model.address = this.myForm.get('callerAddress').value;

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

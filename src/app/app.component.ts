import { Value } from './service-request';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { Buildings } from './buildings';
import { CityworksService } from './cityworks.service';
import { ArcgisService } from './arcgis.service';
import { MapComponent } from './map/map.component';
import { QuestionAnswer, Question, Answer } from './question-answer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  answerFormat: string;
  answer: Answer;
  answers: Answer[];
  questions: Question[];
  dat: Value;
  @ViewChild(MapComponent) childMapComponent;

  coords: { x: number; y: number; };
  lindex: number;
  pindex: number;
  problemSid: number;
  locations: Array<{
    descr: string, geometry: {
      x: number,
      y: number
    }
  }> = [];
  problems: Array<{ descr: string, problemSid: number }> = [];
  question;
  // questions: Array<{ question: string }> = [];
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
            this.locations.push({ descr: data.features[i].attributes.LOCATION, geometry: data.features[i].geometry });
          }
        }
        this.locations.sort(function (a, b) {
          if (a["descr"] < b["descr"]) return -1;
          if (a["descr"] > b["descr"]) return 1;
          return 0;
        });
      },
      err => {
        console.log('some error happened');
        this.locations.push({ descr: 'Error getting facilities list', geometry: { x: 0, y: 0 } });
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
      this.problemSid = this.problems[this.pindex].problemSid;
      this.cityworksservice.getQuestionAnswer(this.problemSid).subscribe(
        data => {
          this.questions = data.Value.Questions;
          console.log('questions = ', this.questions);
          this.answers = data.Value.Answers;
          console.log('answers = ', this.answers);

          for (let i = 0; i < data.Value.Answers.length; i++) {
            this.answerFormat = data.Value.Answers[i].AnswerFormat;
            if (this.answerFormat === 'THIS TEXT') {
              
            }
            console.log('question = ', this.question);
          }

          //  for (let i = 0; i < data.Value.Questions.length; i++) {
          //   this.question = data.Value.Questions[i];
          //   console.log('question = ', this.question);
          //  }
        },
        err => {
          console.log('some error happened');
        });
    });

    this.myForm.get('loc').valueChanges.subscribe(val => {
      this.lindex = this.locations.indexOf(val);
      this.coords = this.locations[this.lindex].geometry;
      this.childMapComponent.zoom(this.coords);
    });
  }

  save(model: User, isValid: boolean) {

    model.address = this.myForm.get('callerEmail').value;
    model.problemSid = this.myForm.get('problemCode').value;

    console.log('model is ', model, isValid);
    console.log('stringified model', JSON.stringify(model));

    // this.cityworksservice.createServiceRequest(model).subscribe(
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

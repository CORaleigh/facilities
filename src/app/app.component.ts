import { Value } from './service-request';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { Buildings } from './buildings';
import { CityworksService } from './cityworks.service';
import { ArcgisService } from './arcgis.service';
import { MapComponent } from './map/map.component';
import { QuestionAnswer, Question, Answer } from './question-answer';
import { Subscription } from 'rxjs/Subscription';
// import { AnswersToQuestions } from './answers-to-questions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  yesQuestions = [];
  noQuestions = [];
  // answersForQuestion: Array<{id: number, question: string, answers: string[]}>= [];
  textAreaQuestions = [];
  all: any;
  cleanQuestions = {};
  @ViewChild(MapComponent) childMapComponent;

  spread = [];
  public showSpinner: boolean;
  answers: Answer[];
  questions: Question[];
  coords: { x: number; y: number; };
  lindex: number;
  pindex: number;
  problemSid: number;
  locations: Array<{
    descr: string,
    geometry: {
      x: number,
      y: number
    }
  }> = [];
  problems: Array<{
    descr: string,
    problemSid: number
  }> = [];
  questionAnswers: Array<{
    questionid: number,
    question: string,
    answersForQuestion: string[],
    answerFormat: string
  }> = [];

  public myForm: FormGroup;
  buildings: Buildings;

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
      problemCode: ['', [<any>Validators.required]],
      yesno: ['', [<any>Validators.required]],
      answers: ['', [<any>Validators.required]]
    });

    this.arcgisservice.getFacilities().subscribe(
      data => {
        for (let i = 0; i < data.features.length; i++) {
          if (data.features[i].attributes.WEBFORM === 'Y') {
            this.locations.push({ descr: data.features[i].attributes.LOCATION, geometry: data.features[i].geometry });
          }
        }
        this.locations.sort(function (a, b) {
          if (a['descr'] < b['descr']) {
            return -1;
          }
          if (a['descr'] > b['descr']) {
            return 1;
          }
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
      this.showLoadingSpinner();
      this.problemSid = this.problems[this.pindex].problemSid;
      this.cityworksservice.getQuestionAnswer(this.problemSid).subscribe(
        data => {
          this.hideLoadingSpinner();
          this.answers = data.Value.Answers;
          this.questions = data.Value.Questions;
          console.log('All Answers', this.answers);

          this.textAreaQuestions = [];
          this.yesQuestions = [];
          this.answers.forEach((answer, aindex) => {
            this.questions.forEach((question, qindex) => {
              if (answer.QuestionId === question.QuestionId && answer.AnswerFormat === 'FREETEXT') {
                this.textAreaQuestions.push({id: answer.QuestionId, question: question.Question});
              }
              if (answer.QuestionId === question.QuestionId && answer.AnswerFormat === 'YES') {
                this.yesQuestions.push({id: answer.QuestionId, question: question.Question});
              }
            });
          });
          console.log('textAreaQuestions = ', this.textAreaQuestions);
          console.log('yesQuestions = ', this.yesQuestions);
          console.log('NoQuestions = ', this.noQuestions);


          // this.questions.forEach((item, index) => {
          //   this.cleanQuestions.push(item.QuestionId)
          // });

          // mutate arrays to make html friendly for Cityworks q and a
                  // this.spread = [...this.answers, ...this.questions];
                  // console.log('spread', this.spread);
                  // this.spread.forEach((item, index) => {
                  //   if (item.QuestionSequence) {
                  //     this.cleanQuestions = {id: item.QuestionId, question: item.Question};
                  //     console.log('item Answer1 =', item.Answer);

                  //   }
                  //   console.log('cleansed', this.cleanQuestions);
                  //   // console.log('q id = ', this.cleanQuestions['id']);

                  //   if (item.AnswerSequence) {
                  //     console.log('item Answer2 =', item.Answer);

                  //     for (const value of Object.values(this.cleanQuestions)) {
                  //       console.log('value = ', value);
                  //       if (value === item.QuestionId) {
                  //         console.log('were inside44444444444', item.Answer);
                  //         this.all = {...this.cleanQuestions, answer: item.Answer};
                  //       }
                  //     }
                  //     console.log('item Answer3 =', item.Answer);
                  //     console.log('All = ', this.all);
                  //     // this.cleanAnswers = {...this.cleanQuestions, item.}
                  //   }
                  //   // if (index < this.spread.length) {
                  //   //   if (this.spread[index + 1].QuestionId === item.QuestionId) {
                  //   //     console.log(item.Answer);
                  //   //     console.log(index);
                  //   //   }
                  //   // }
                  // });
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

    this.myForm.get('yesno').valueChanges.subscribe(val => {
      console.log('get the value dude');
    });
  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
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

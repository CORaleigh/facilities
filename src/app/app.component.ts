import { Value, ServiceRequest } from './service-request';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CityworksRequest, AnswerCHF } from './cityworks-request';
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

  // requestObj: Request;
  answerCHF: AnswerCHF;
  srCreated: boolean;
  createSRResponse: any;
  questionForMultipleChoice: string;
  selectionQuestions: any[];
  yesNoQuestions = [];
  answersForQuestion = [];
  // answersForQuestion: Array<{id: number, question: string, answers: string[]}>= [];
  textAreaQuestions = [];
  all: any;
  cleanQuestions = {};
  @ViewChild(MapComponent) childMapComponent;

  spread = [];
  public showSpinner: boolean;
  answers: Answer[] = [];
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
      // formlocation: [''[<any>Validators.required]],
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
      yesno: [''],
      answers: this._fb.array([this.createAnswer()]),
      questions: this._fb.array([this.createQuestion()])

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

    // TODO: limit problem types for F&O only, not entire ES domain
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

  createAnswer(): FormGroup {
    return this._fb.group({
      name: ''
    });
  }

  createQuestion(): FormGroup {
    return this._fb.group({
      name: ''
    });
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

          // Initialize arrays on new problem selection
          this.textAreaQuestions = [];
          this.yesNoQuestions = [];
          this.selectionQuestions = [];
          this.answersForQuestion = [];
          this.questionForMultipleChoice = '';

          this.answers.forEach((answer, aindex) => {
            this.questions.forEach((question, qindex) => {
              if (answer.QuestionId === question.QuestionId && answer.AnswerFormat === 'FREETEXT') {
                this.textAreaQuestions.push({ id: answer.QuestionId, question: question.Question });
                // this.requestObj.Answers.push({AnswerId: answer.QuestionId, AnswerValue: answer.Answer});
                // cant do this b/c need to get answer from the form
              } else
                if (answer.QuestionId === question.QuestionId && answer.AnswerFormat === 'YES') {
                  this.yesNoQuestions.push({ id: answer.QuestionId, question: question.Question });
                  // this.requestObj.Answers.push({AnswerId: answer.QuestionId, AnswerValue: answer.Answer});
                } else {
                  if (answer.QuestionId === question.QuestionId && answer.AnswerFormat !== 'NO') {
                    this.answersForQuestion.push(answer.Answer);
                    // this.requestObj.Answers.push({AnswerId: answer.QuestionId, AnswerValue: answer.Answer});
                    this.questionForMultipleChoice = question.Question;
                    this.selectionQuestions.push({ id: answer.QuestionId, question: question.Question, answers: this.answersForQuestion });
                  }
                }
            });
          });
          console.log('textAreaQuestions = ', this.textAreaQuestions);
          console.log('yesQuestions = ', this.yesNoQuestions);
          console.log('selectionQuestions = ', this.selectionQuestions);
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
      console.log('get the value dude', val);
    });
  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }

  save(formModel: any, isValid: boolean) {

    console.log('formModel.problemCode.problemSid = ', formModel.problemCode.problemSid);
    const requestObj = Object.create(CityworksRequest);

    requestObj.ProblemSid = formModel.problemCode.problemSid;
    console.log('problemSid = ', requestObj.ProblemSid);
    console.log('formModel.answers = ', formModel.answers);
    this.textAreaQuestions.forEach((textanswer) => {
      console.log('textanswer ', textanswer);
      // requestObj.Answers.AnswerCHF.push(AnswerId: textanswer.id, AnswerValue: )
      // this.requestObj.Answers.push({AnswerId: textanswer.QuestionId, AnswerValue: textanswer.Answer});
    });
    requestObj.CallerEmail = formModel.callerEmail;
    console.log('formModel email = ', formModel.callerEmail);
    console.log('requestObj email = ', requestObj.CallerEmail);

    formModel.callerEmail = this.myForm.get('callerEmail').value;
    console.log('model address = ', formModel.callerEmail);
    formModel.problemCode = this.myForm.get('problemCode').value;
    console.log('problemcode = ', formModel.problemCode.problemSid);
    // build the request object and submit that to create SR, b/c the form model is slightly different than what Cityworks wants
    // this.requestObj.ProblemSid = formModel.problemCode.problemSid;
    
    requestObj.Address = formModel.address;
    requestObj.CallerFirstName = formModel.callerFirstName;
    requestObj.CallerLastName = formModel.callerLastName;
    requestObj.CallerEmail = formModel.callerEmail;
    requestObj.CallerWorkPhone = formModel.callerWorkPhone;

    // callerFirstName: [''],
    // callerLastName: ['', [<any>Validators.required]],
    // callerCity: ['Raleigh'],
    // callerState: ['NC'],
    // callerZip: [''],
    // callerEmail: ['', <any>Validators.email],
    // callerWorkPhone: [''],
    // comments: [''],
    // callerComments: [''],
    // loc: ['', [<any>Validators.required]],
    // problemCode: ['', [<any>Validators.required]],
    // yesno: [''],
    // answers: ['']

    // console.log('model is ', formModel, isValid);
    // console.log('stringified model', JSON.stringify(formModel));

    console.log('requestObject = ', requestObj);

    this.cityworksservice.createServiceRequest(requestObj).subscribe(
      data => this.createSRResponse = data,
      err => console.error(err),
      () => {
        this.srCreated = true;
        if (this.createSRResponse.requestId === '') {
          console.log('no ServiceRequest ID was returned');
        }
        console.log('this response is ', this.createSRResponse);
      }
    );
  }
}

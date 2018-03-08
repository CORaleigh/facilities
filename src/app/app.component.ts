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

  spread: (Answer | Question)[];
  nextQuestion: Answer[];

  newArr: Array<{ questionId: number; question: string; answers: string }> = [];
  // const uniqueProducts: any;


  obj: [{ questionId: number; answersToQuestion: string; format: string; }];
  questionObj: Array<{ questionId: number; questionsForAnswers: string; answer: string }> = [];

  justAnswers = [];
  @ViewChild(MapComponent) childMapComponent;

  // dateAnswers: Answer[];
  // yesNoAnswers: Answer[];
  // freeTextAnswers: Answer[];
  // thisTextAnswers: Answer[];
  answerFormat: string;
  public showSpinner: boolean;
  // answer: Answer;
  answers: Answer[];
  // question: Question;
  questions: Question[];
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
  questionAnswers: Array<{
    questionid: number,
    question: string,
    answersForQuestion: string[],
    answerFormat: string
  }>= [];
  qna: QuestionAnswer;
  qnaArray= [];

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
      problemCode: ['', [<any>Validators.required]],
      yesno: ['', [<any>Validators.required]],
      answera: ['', [<any>Validators.required]]
    });

    this.arcgisservice.getFacilities().subscribe(
      data => {
        for (let i = 0; i < data.features.length; i++) {
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
     // console.log('sid is ', this.problems[this.pindex].problemSid);
      this.problemSid = this.problems[this.pindex].problemSid;
      // this.questionObj = []; // empties the array of questions each time a new problem code is selected.
      this.cityworksservice.getQuestionAnswer(this.problemSid).subscribe(
        data => {
          this.hideLoadingSpinner();
          // this.AnswersToQuestions = data;
          this.answers = data.Value.Answers;
          this.questions = data.Value.Questions;
          console.log('questions - ', this.questions);
          console.log('answers - ', this.answers);

          this.spread = [...this.answers, ...this.questions];
          console.log('spread', this.spread);

          for (const q of this.questions) {
            for (const a of this.answers) {
              if (a.QuestionId === q.QuestionId) {
                console.log('and they is in fact a match', a.Answer);

                this.newArr.push({questionId: q.QuestionId, question: q.Question, answers: a.Answer });
                // this.newArr.push([...this.questions, ...this.answers]);
                // this.newArr = [...this.questions, a.Answer];
              }
            }
          }
          console.log('this new array = ', this.newArr);
          // this.uniqueProducts = this.newArr.filter((questionId, i, newArr) => {
          //   return this.newArr.indexOf(questionId) === i;
          // });
        
          // this.uniqueProducts = this.newArr.filter(function(item, pos, self) {
          //   return self.indexOf(item) === pos;
          // });

          var finalArr = [];
          var ans = [];
          this.newArr.filter(function(item) {
            ans.push(item.answers);
            var i = finalArr.findIndex(x => x.question == item.question);
            if (i <= -1) {
              finalArr.push({questionId: item.questionId, question: item.question, answers: ans});
            }
            return null;
          });
          console.log(finalArr);


          // this.newArr.reduce((this.newArr) => {

          // });

          // for (const n of this.newArr) {
          //    const newQ = n.QuestionId;
          //    if (newQ ===)
          // }
          

          // removes first element of spread array
          // for (let s of this.spread) {
          //   [s, ...this.newArr] = this.spread;
          // }

          // var initial = [0, 1];  
          // var numbers1 = [...initial, 5, 7];  
          // console.log(numbers1); // => [0, 1, 5, 7]  
          // let numbers2 = [4, 8, ...initial];  
          // console.log(numbers2); // => [4, 8, 0, 1]  

          // remove 'b' element
          // let x = {a: 1, b: 2, c: 3, z:26};
          // let {b, ...y} = x;

          // this.nextQuestion = this.answers.filter((AnswerId, a) =>
          //     this.answers[a].AnswerId === this.questions[a].QuestionId);
          //     console.log('next here', this.nextQuestion);

          // for (let q of this.questions) {
          //   console.log('q = ', q.QuestionId);
          //   this.nextQuestion = this.answers.filter(
          //     answer => answer.AnswerId === q.QuestionId
          //   );
          //   console.log(this.nextQuestion);
          // }



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

import { QuestionAnswer } from './question-answer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ServiceRequest, Value } from './service-request';
import { ProblemTypes } from './problem-types';

@Injectable()
export class CityworksService {

  public requestBody: ServiceRequest;
  constructor(private http: HttpClient) { }

  private getSRUrl = 'http://rhsoatstapp1.ci.raleigh.nc.us:8182/RaleighAPI/cityworks/getServiceRequest/';
  // private getProblemTypeUrl = 'http://rhsoatstapp1.ci.raleigh.nc.us:8182/RaleighAPI/cityworks/getSRProblemTypes/';
  private getProblemTypeUrl = 'http://rhsoaprdapp1.ci.raleigh.nc.us:8183/RaleighAPI/cityworks/getSRProblemTypes/';
  // private getQuestionAnswerUrl = 'http://rhsoatstapp1.ci.raleigh.nc.us:8182/RaleighAPI/cityworks/getQuestionAnswer/';
  private getQuestionAnswerUrl = 'http://rhsoaprdapp1.ci.raleigh.nc.us:8183/RaleighAPI/cityworks/getQuestionAnswer/';
  private createServiceRequestUrl = 'http://rhsoatstapp1.ci.raleigh.nc.us:8182/RaleighAPI/cityworks/createServiceRequest/';

  getServiceRequest(requestid): Observable<ServiceRequest> {
    const url = this.getSRUrl + requestid;
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers }); // Create a request option
    // return this.http.post(this.srUrl, this.testSr, options).map((res: Response) => res.json());
    return this.http.get<ServiceRequest>(url);
  }

  getProblemTypes(): Observable<ProblemTypes> {
    const url = this.getProblemTypeUrl;
    return this.http.get<ProblemTypes>(url);
  }

  getQuestionAnswer(problemSid): Observable<QuestionAnswer> {
    const url = this.getQuestionAnswerUrl + problemSid;
    return this.http.get<QuestionAnswer>(url);
  }

  createServiceRequest(problemSid): Observable<ServiceRequest> {
    const url = this.createServiceRequestUrl;
    const requestBodyStr = JSON.stringify(this.requestBody);
    return this.http.post<ServiceRequest>(url, requestBodyStr);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CityworksService {

  constructor(private http: HttpClient) { }

  getServiceRequest(SrId) {
    console.log('inside getServiceRequest');
  }

}

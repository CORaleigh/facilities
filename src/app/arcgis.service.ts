import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArcgisService {

  constructor(private http: HttpClient) { }

  getFacilities(): string[] {
    console.log('inside getFacilities Service');
    return;
  }

}

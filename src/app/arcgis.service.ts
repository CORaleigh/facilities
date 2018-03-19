import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buildings } from './buildings';
import { Districts } from './districts';

@Injectable()
export class ArcgisService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:max-line-length
  private buildingsUrl = 'http://cityworksgisprd.raleighnc.gov/arcgis/rest/services/cityworks/PARKS/MapServer/3/query?where=WEBFORM+%3D+%27Y%27&outFields=*&returnGeometry=true&outSR=4326&f=pjson';
  private districts = 'http://cityworksgisprd.raleighnc.gov/arcgis/rest/services/cityworks/PARKS/MapServer/28/query';

  getFacilities(): Observable<Buildings> {
    console.log('inside getFacilities Service');
    return this.http.get<Buildings>(this.buildingsUrl);
  }

  // This will give us the submitTo value if a Service Request answer has an associated 
  // SubmitToFieldName and SubmitToLayerName
  getDistricts(): Observable<Districts> {
    console.log('inside getDistricts Service');
    // build query parameters BM_BL etc. then call service
    return;
  }

}

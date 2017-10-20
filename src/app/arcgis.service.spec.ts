import { TestBed, inject } from '@angular/core/testing';

import { ArcgisService } from './arcgis.service';

describe('ArcgisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArcgisService]
    });
  });

  it('should be created', inject([ArcgisService], (service: ArcgisService) => {
    expect(service).toBeTruthy();
  }));
});

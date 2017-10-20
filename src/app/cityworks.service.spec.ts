import { TestBed, inject } from '@angular/core/testing';

import { CityworksService } from './cityworks.service';

describe('CityworksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityworksService]
    });
  });

  it('should be created', inject([CityworksService], (service: CityworksService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataPointService } from './data-point.service';

describe('DataPointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataPointService]
    });
  });

  it('should ...', inject([DataPointService], (service: DataPointService) => {
    expect(service).toBeTruthy();
  }));
});

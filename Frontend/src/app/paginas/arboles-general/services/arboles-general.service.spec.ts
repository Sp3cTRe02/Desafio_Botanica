import { TestBed } from '@angular/core/testing';

import { ArbolesGeneralService } from './arboles-general.service';

describe('ArbolesGeneralService', () => {
  let service: ArbolesGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArbolesGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

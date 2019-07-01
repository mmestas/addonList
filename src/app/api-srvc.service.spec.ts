import { TestBed } from '@angular/core/testing';

import { ApiSrvc } from './api-srvc.service';

describe('ApiSrvc', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSrvc = TestBed.get(ApiSrvc);
    expect(service).toBeTruthy();
  });
});

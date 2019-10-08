import { TestBed, inject } from '@angular/core/testing';

import { ReverseAuthGuardService } from './reverse-auth-guard.service';

describe('ReverseAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReverseAuthGuardService]
    });
  });

  it('should be created', inject([ReverseAuthGuardService], (service: ReverseAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});

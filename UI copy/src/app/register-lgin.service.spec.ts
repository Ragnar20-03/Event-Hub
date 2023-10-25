import { TestBed } from '@angular/core/testing';

import { RegisterLginService } from './register-lgin.service';

describe('RegisterLginService', () => {
  let service: RegisterLginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterLginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

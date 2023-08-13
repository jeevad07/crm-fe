import { TestBed } from '@angular/core/testing';

import { UserinfostorageService } from './userinfostorage.service';

describe('UserinfostorageService', () => {
  let service: UserinfostorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserinfostorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

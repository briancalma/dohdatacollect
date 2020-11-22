import { TestBed } from '@angular/core/testing';

import { ProfileapiService } from './profileapi.service';

describe('ProfileapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileapiService = TestBed.get(ProfileapiService);
    expect(service).toBeTruthy();
  });
});

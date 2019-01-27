import { TestBed } from '@angular/core/testing';

import { FuelmgtService } from './fuelmgt.service';

describe('FuelmgtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuelmgtService = TestBed.get(FuelmgtService);
    expect(service).toBeTruthy();
  });
});

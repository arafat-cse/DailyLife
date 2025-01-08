import { TestBed } from '@angular/core/testing';

import { KidsVideoService } from './kids-video.service';

describe('KidsVideoService', () => {
  let service: KidsVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KidsVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

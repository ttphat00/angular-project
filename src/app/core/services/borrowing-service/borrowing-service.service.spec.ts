import { TestBed } from '@angular/core/testing';

import { BorrowingServiceService } from './borrowing-service.service';

describe('BorrowingServiceService', () => {
  let service: BorrowingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

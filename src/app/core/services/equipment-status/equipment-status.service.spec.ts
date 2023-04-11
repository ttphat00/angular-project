import { TestBed } from '@angular/core/testing';

import { EquipmentStatusService } from './equipment-status.service';

describe('EquipmentStatusService', () => {
  let service: EquipmentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

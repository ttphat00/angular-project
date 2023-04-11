import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingEquipmentComponent } from './borrowing-equipment.component';

describe('BorrowingEquipmentComponent', () => {
  let component: BorrowingEquipmentComponent;
  let fixture: ComponentFixture<BorrowingEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowingEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

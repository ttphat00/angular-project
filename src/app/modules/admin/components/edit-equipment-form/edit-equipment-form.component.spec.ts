import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipmentFormComponent } from './edit-equipment-form.component';

describe('EditEquipmentFormComponent', () => {
  let component: EditEquipmentFormComponent;
  let fixture: ComponentFixture<EditEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEquipmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

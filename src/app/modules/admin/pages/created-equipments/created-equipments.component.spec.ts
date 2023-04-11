import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedEquipmentsComponent } from './created-equipments.component';

describe('CreatedEquipmentsComponent', () => {
  let component: CreatedEquipmentsComponent;
  let fixture: ComponentFixture<CreatedEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedEquipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

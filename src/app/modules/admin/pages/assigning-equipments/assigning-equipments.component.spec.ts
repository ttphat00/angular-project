import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigningEquipmentsComponent } from './assigning-equipments.component';

describe('AssigningEquipmentsComponent', () => {
  let component: AssigningEquipmentsComponent;
  let fixture: ComponentFixture<AssigningEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigningEquipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigningEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

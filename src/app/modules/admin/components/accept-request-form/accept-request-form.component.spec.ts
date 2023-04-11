import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRequestFormComponent } from './accept-request-form.component';

describe('AcceptRequestFormComponent', () => {
  let component: AcceptRequestFormComponent;
  let fixture: ComponentFixture<AcceptRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptRequestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditbrandComponent } from './admineditbrand.component';

describe('AdmineditbrandComponent', () => {
  let component: AdmineditbrandComponent;
  let fixture: ComponentFixture<AdmineditbrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmineditbrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

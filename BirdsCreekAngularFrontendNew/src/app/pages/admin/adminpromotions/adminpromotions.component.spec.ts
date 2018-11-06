import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpromotionsComponent } from './adminpromotions.component';

describe('AdminpromotionsComponent', () => {
  let component: AdminpromotionsComponent;
  let fixture: ComponentFixture<AdminpromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

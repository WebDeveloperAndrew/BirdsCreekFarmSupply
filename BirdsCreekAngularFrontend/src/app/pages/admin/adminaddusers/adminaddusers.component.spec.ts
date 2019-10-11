import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddusersComponent } from './adminaddusers.component';

describe('AdminaddusersComponent', () => {
  let component: AdminaddusersComponent;
  let fixture: ComponentFixture<AdminaddusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminaddusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

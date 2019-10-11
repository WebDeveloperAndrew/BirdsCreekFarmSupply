import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditusersComponent } from './admineditusers.component';

describe('AdmineditusersComponent', () => {
  let component: AdmineditusersComponent;
  let fixture: ComponentFixture<AdmineditusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmineditusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditproductComponent } from './admineditproduct.component';

describe('AdmineditproductComponent', () => {
  let component: AdmineditproductComponent;
  let fixture: ComponentFixture<AdmineditproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmineditproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

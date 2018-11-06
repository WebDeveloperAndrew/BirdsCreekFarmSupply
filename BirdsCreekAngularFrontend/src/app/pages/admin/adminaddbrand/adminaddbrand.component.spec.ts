import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddbrandComponent } from './adminaddbrand.component';

describe('AdminaddbrandComponent', () => {
  let component: AdminaddbrandComponent;
  let fixture: ComponentFixture<AdminaddbrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminaddbrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

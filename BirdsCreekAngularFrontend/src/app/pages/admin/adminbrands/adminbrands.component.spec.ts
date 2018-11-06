import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbrandsComponent } from './adminbrands.component';

describe('AdminbrandsComponent', () => {
  let component: AdminbrandsComponent;
  let fixture: ComponentFixture<AdminbrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

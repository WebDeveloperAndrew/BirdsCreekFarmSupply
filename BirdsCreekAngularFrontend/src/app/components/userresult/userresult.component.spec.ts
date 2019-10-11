import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserresultComponent } from './userresult.component';

describe('UserresultComponent', () => {
  let component: UserresultComponent;
  let fixture: ComponentFixture<UserresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

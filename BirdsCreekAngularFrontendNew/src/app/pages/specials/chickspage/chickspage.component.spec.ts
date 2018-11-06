import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChickspageComponent } from './chickspage.component';

describe('ChickspageComponent', () => {
  let component: ChickspageComponent;
  let fixture: ComponentFixture<ChickspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChickspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChickspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

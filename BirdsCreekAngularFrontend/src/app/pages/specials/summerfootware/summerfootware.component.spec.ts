import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummerfootwareComponent } from './summerfootware.component';

describe('SummerfootwareComponent', () => {
  let component: SummerfootwareComponent;
  let fixture: ComponentFixture<SummerfootwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummerfootwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummerfootwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

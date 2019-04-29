import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterfootwareComponent } from './winterfootware.component';

describe('WinterfootwareComponent', () => {
  let component: WinterfootwareComponent;
  let fixture: ComponentFixture<WinterfootwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinterfootwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinterfootwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

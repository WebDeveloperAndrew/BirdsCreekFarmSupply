import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodpelletsComponent } from './woodpellets.component';

describe('WoodpelletsComponent', () => {
  let component: WoodpelletsComponent;
  let fixture: ComponentFixture<WoodpelletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoodpelletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodpelletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

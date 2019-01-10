import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandresultComponent } from './brandresult.component';

describe('BrandresultComponent', () => {
  let component: BrandresultComponent;
  let fixture: ComponentFixture<BrandresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

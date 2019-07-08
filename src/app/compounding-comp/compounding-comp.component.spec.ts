import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundingCompComponent } from './compounding-comp.component';

describe('CompoundingCompComponent', () => {
  let component: CompoundingCompComponent;
  let fixture: ComponentFixture<CompoundingCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundingCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundingCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

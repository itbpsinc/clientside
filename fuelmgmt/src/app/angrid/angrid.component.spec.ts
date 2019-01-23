import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngridComponent } from './angrid.component';

describe('AngridComponent', () => {
  let component: AngridComponent;
  let fixture: ComponentFixture<AngridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

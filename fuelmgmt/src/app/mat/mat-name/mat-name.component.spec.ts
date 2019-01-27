import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatNameComponent } from './mat-name.component';

describe('MatNameComponent', () => {
  let component: MatNameComponent;
  let fixture: ComponentFixture<MatNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

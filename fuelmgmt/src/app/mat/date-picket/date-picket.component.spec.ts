import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDatePicketComponent } from '../date-picket/date-picket.component';

describe('MatDatePicketComponent', () => {
  let component: MatDatePicketComponent;
  let fixture: ComponentFixture<MatDatePicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDatePicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDatePicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

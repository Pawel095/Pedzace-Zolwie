import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastGameResultsViewComponent } from './last-game-results-view.component';

describe('LastGameResultsViewComponent', () => {
  let component: LastGameResultsViewComponent;
  let fixture: ComponentFixture<LastGameResultsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastGameResultsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastGameResultsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTurtleViewComponent } from './player-turtle-view.component';

describe('PlayerTurtleViewComponent', () => {
  let component: PlayerTurtleViewComponent;
  let fixture: ComponentFixture<PlayerTurtleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTurtleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTurtleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

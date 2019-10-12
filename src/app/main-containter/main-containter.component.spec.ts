import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContainterComponent } from './main-containter.component';

describe('MainContainterComponent', () => {
  let component: MainContainterComponent;
  let fixture: ComponentFixture<MainContainterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContainterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContainterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

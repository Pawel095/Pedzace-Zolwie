import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColorDialogItemComponent } from './select-color-dialog-item.component';

describe('SelectColorDialogItemComponent', () => {
  let component: SelectColorDialogItemComponent;
  let fixture: ComponentFixture<SelectColorDialogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectColorDialogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectColorDialogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

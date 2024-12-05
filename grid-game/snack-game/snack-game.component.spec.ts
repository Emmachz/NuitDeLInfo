import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackGameComponent } from './snack-game.component';

describe('SnackGameComponent', () => {
  let component: SnackGameComponent;
  let fixture: ComponentFixture<SnackGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackGameComponent]
    });
    fixture = TestBed.createComponent(SnackGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

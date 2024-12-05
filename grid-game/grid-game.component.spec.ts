import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridGameComponent } from './grid-game.component';

describe('GridGameComponent', () => {
  let component: GridGameComponent;
  let fixture: ComponentFixture<GridGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridGameComponent]
    });
    fixture = TestBed.createComponent(GridGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

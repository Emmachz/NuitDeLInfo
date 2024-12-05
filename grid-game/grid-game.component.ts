import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-grid-game',
  templateUrl: './grid-game.component.html',
  styleUrls: ['./grid-game.component.scss']
})
export class GridGameComponent {
  public popupOpen: boolean = false;

  public constructor(private renderer: Renderer2) {}

  public openPopup(): void {
    this.popupOpen = true;
    this.lockScroll();
  }

  public closePopup(): void {
    this.popupOpen = false;
    this.unlockScroll();
  }

  public lockScroll(): void {
    const body = document.body;
    this.renderer.setStyle(body, 'position', 'fixed');
    this.renderer.setStyle(body, 'top', '0px');
    this.renderer.setStyle(body, 'left', '0px');
    this.renderer.setStyle(body, 'right', '0px');
  }

  public unlockScroll(): void {
    const body = document.body;
    this.renderer.removeStyle(body, 'position');
    this.renderer.removeStyle(body, 'top');
  }

}

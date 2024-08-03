import { Component, ElementRef, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-nested-component';
  canCloseId = '';

  readonly showCanClose = signal(false);

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    window.addEventListener('canClose', this.onCanClose.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('canClose', this.onCanClose.bind(this));
  }

  onCanClose(event: Event): void {
    if (event instanceof CustomEvent) {
      this.canCloseId = event.detail.id;
      this.showCanClose.set(true);
    }
  }

  allowClose(): void {
    window.dispatchEvent(this.buildCanCloseResponseEvent(true));

    this.showCanClose.set(false);
    this.canCloseId = '';
  }

  declineClose(): void {
    window.dispatchEvent(this.buildCanCloseResponseEvent(false));

    this.showCanClose.set(false);
    this.canCloseId = '';
  }

  buildCanCloseResponseEvent(canClose: boolean): CustomEvent {
    return new CustomEvent('canCloseResponse', {
      bubbles: true,
      cancelable: false,
      detail: {
        id: this.canCloseId,
        canClose: canClose,
      }
    });
  }
}

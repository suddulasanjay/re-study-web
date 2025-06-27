import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if(showSpinner){
    <div class="spinner-overlay">
      <mat-spinner
        [diameter]="diameter"
        [strokeWidth]="strokeWidth"
        [color]="color"
      >
      </mat-spinner>
    </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        text-align: center;

        .spinner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          background-color: rgb(0, 0, 0, 0.05);
        }
      }
    `,
  ],
})
export class SpinnerComponent {
  @Input() showSpinner: boolean = false;
  @Input() diameter: number = 50;
  @Input() strokeWidth: number = 10;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
}

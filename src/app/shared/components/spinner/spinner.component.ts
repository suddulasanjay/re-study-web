import { Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    @if(showLoader) {
    <div class="spinner-overlay">
      <mat-spinner [diameter]="50"></mat-spinner>
    </div>
    }
  `,
  styles: [
    `
      .spinner-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(0, 0, 0, 0.05);
        border-radius: 20px;
      }
    `,
  ],
})
export class SpinnerComponent implements OnInit {
  @Input() showLoader = false;
  constructor() {}

  ngOnInit() {}
}

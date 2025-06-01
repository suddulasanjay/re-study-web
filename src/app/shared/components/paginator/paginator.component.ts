import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  template: `
    <div class="paginator-container">
      <mat-paginator
        [pageSizeOptions]="pageSizeOptions"
        [length]="totalCount"
        [pageSize]="pageSize"
        [pageIndex]="pageNumber - 1"
        [showFirstLastButtons]="true"
        (page)="pageChange.emit($event)"
      ></mat-paginator>
    </div>
  `,
  styles: [`
    .paginator-container {
      width: 100%;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class PaginatorComponent {
  @Input({ required: true }) pageSizeOptions!: number[];
  @Input({ required: true }) totalCount!: number;
  @Input({ required: true }) pageNumber!: number;
  @Input({ required: true }) pageSize!: number;

  @Output() pageChange = new EventEmitter<PageEvent>();
}

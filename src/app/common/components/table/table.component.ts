import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Column } from './column.interface';
import { NgTemplateOutlet, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    SpinnerComponent,
    MatSortModule,
    NgTemplateOutlet,
    PaginatorComponent,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    CommonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnDestroy {
  private _tableActions: any;

  @Input() set tableActions(val: TemplateRef<any>) {
    setTimeout(() => (this._tableActions = val));
  }
  get tableActions() {
    return this._tableActions;
  }

  private _columns: Column[] = [];
  @Input({ required: true }) set columns(c: Column[]) {
    this._columns = c;
    this.setTableColumns();
  }
  get columns(): Column[] {
    return this._columns;
  }

  @Input({ required: true }) dataSource!: MatTableDataSource<any>;
  @Input() height = 500;
  @Input() showLoader = false;
  @Input() pageSizeOptions: number[] = [];
  @Input() pageNumber = 1;
  @Input() pageSize = this.pageSizeOptions[0];
  @Input() totalCount: number = 0;

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() rowClicked = new EventEmitter<any>();


  tableColumns: Column[] = [];
  columnsToDisplay: string[] = [];

  ngOnInit(): void {}

  setTableColumns() {
    this.tableColumns = [...this.columns];
    this.columnsToDisplay = this.tableColumns.map((c) => c.name);
  }

  ngOnDestroy(): void {}
}

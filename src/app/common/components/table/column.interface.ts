import { TemplateRef } from '@angular/core';

export interface Column {
  name: string;
  prop: string;
  sort?: boolean;
  cellTemplate?: TemplateRef<any>;
  headerCellClass?: string;
  dataCellClass?: string;
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Column } from '../../../common/components/table/column.interface';
import { TableComponent } from '../../../common/components/table/table.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { ConceptDto } from '../../../shared/models/response-models/concept.response-model';
import { CategoryService } from '../../../shared/services/category.service';
import { ConceptService } from '../../../shared/services/concept.service';

@Component({
  selector: 'app-concept',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, TableComponent, MatIconModule],
  templateUrl: './concept-list.component.html',
  styleUrls: ['./concept-list.component.scss']
})
export class ConceptListComponent{
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _conceptService = inject(ConceptService);
  private _categoryService = inject(CategoryService);

  concepts = new MatTableDataSource<ConceptDto & { categoryName: string }>();
  categories: Record<number, string> = {};
  pageNumber = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20];
  totalCount = 0;

  @ViewChild('scheduledDateTemplate') set scheduledDateTemplateRef(tpl: TemplateRef<any>) {
    const col = this.columns.find((c) => c.name === 'Scheduled Date');
    if (col) {
      col.cellTemplate = tpl;
    }
  }

  columns: Column[] = [
    { name: 'ID', prop: 'id' },
    { name: 'Concept', prop: 'name' },
    { name: 'Description', prop: 'description' },
    { name: 'Category', prop: 'categoryName' },
    { name: 'Scheduled Date', prop: 'scheduledDate' },
    { name: 'Repetition Gap (Days)', prop: 'repetitionGap' },
    { name: 'Duration (Minutes)', prop: 'duration' }
  ];

  ngOnInit(): void {
    this.loadCategoriesAndConcepts();
  }

  loadCategoriesAndConcepts() {
    this._categoryService.getCategories().subscribe(categories => {
      this.categories = Object.fromEntries(categories.map(c => [c.id, c.name]));
      this._conceptService.getConcepts().subscribe(concepts => {
        this.concepts.data = concepts.map(c => ({
          ...c,
          categoryName: this.categories[c.categoryId] ?? 'Unknown'
        }));
        this.totalCount = concepts.length;
      });
    });
  }

  onRowClicked(concept: ConceptDto) {
    this._router.navigate([`${concept.id}`], { relativeTo: this._activatedRoute });
  }

  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    // handle pagination
  }
}

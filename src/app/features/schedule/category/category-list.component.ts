import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../../common/components/table/table.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Column } from '../../../common/components/table/column.interface';
import { CategoryDto } from '../../../shared/models/response-models/category.response-model';
import { SubjectService } from '../../../shared/services/subject.service';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, TableComponent, MatIconModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  _router = inject(Router);
  _activatedRoute = inject(ActivatedRoute);
  _categoryService = inject(CategoryService);
  _subjectService = inject(SubjectService);

  categories = new MatTableDataSource<any>();
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  pageSizeOptions = [5, 10, 20];
  subjectMap = new Map<number, string>();

  columns: Column[] = [
    { name: 'ID', prop: 'id' },
    { name: 'Category', prop: 'name' },
    { name: 'Description', prop: 'description' },
    { name: 'Subject', prop: 'subjectName' }
  ];

  ngOnInit() {
    this.loadSubjectsAndCategories();
  }

  loadSubjectsAndCategories() {
    this._subjectService.getSubjects().subscribe(subjects => {
      for (const subj of subjects) {
        this.subjectMap.set(subj.id, subj.name);
      }
      this._categoryService.getCategories().subscribe(categories => {
        const enriched = categories.map(c => ({
          ...c,
          subjectName: this.subjectMap.get(c.subjectId ?? -1) || 'N/A'
        }));
        this.categories.data = enriched;
        this.totalCount = enriched.length;
      });
    });
  }

  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  onRowClicked(category: CategoryDto) {
    this._router.navigate([`${category.id}`], { relativeTo: this._activatedRoute });
  }
}

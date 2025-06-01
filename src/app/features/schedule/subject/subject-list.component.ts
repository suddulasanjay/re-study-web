import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { TableComponent } from '../../../common/components/table/table.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { SubjectDto } from '../../../shared/models/response-models/subject.response-model';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { SubjectService } from '../../../shared/services/subject.service';
import { Column } from '../../../common/components/table/column.interface';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  standalone : true,
  imports: [CommonModule, PaginatorComponent, TableComponent,MatIconModule],
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent{
  _router = inject(Router);
  _activatedRoute = inject(ActivatedRoute);
  _subjectService = inject(SubjectService);
 subjects =  new MatTableDataSource<SubjectDto>();
 pageNumber = 1;
 pageSize = 10;
 pageSizeOptions = [5, 10, 20];
 totalCount = 0;
 showLoader = false;

  @ViewChild('isPresetTemplate') set isPresetTemplateRef(t: TemplateRef<any>) {
    const col = this.columns.find((c) => c.name === 'Preset Subject');
    if (col) {
      col.cellTemplate = t;
    }
  }
  columns: Column[] = [
    {
      name: 'ID',
      prop: 'id',
    },
    {
      name: 'Subject',
      prop: 'name',
    },
    {
      name: 'Description',
      prop: 'description',
    },
    {
      name: 'Preset Subject',
      prop: 'isPreset',
      cellTemplate: this.isPresetTemplateRef,
    }
  ];

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects(){
    this.showLoader = true;
    this._subjectService.getSubjects().subscribe(subjects => {
      this.subjects.data = subjects;
      this.totalCount = subjects.length;
      this.showLoader = false;
    })
  }

  onPageChange(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    // Add logic to fetch new page
  }

  onRowClicked(subject : SubjectDto){
    this._router.navigate([`${subject.id}`], { relativeTo: this._activatedRoute });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../shared/services/category.service';
import { SubjectService } from '../../../../shared/services/subject.service';
import { AddCategoryDto, EditCategoryDto } from '../../../../shared/models/request-models/category.request-model';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    CommonModule, MatSelectModule
  ],
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _categoryService = inject(CategoryService);
  private _subjectService = inject(SubjectService);

  categoryForm!: FormGroup;
  isEditMode = false;
  categoryId: number | null = null;
  subjects: { id: number, name: string }[] = [];

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: ['', Validators.required],
      description: [''],
      subjectId: [null]
    });

    this._subjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });

    this._route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== 'add') {
        this.categoryId = +id;
        this.isEditMode = true;
        this.loadCategory();
      }
    });
  }

  loadCategory() {
    if (this.categoryId) {
      this._categoryService.getCategoryById(this.categoryId).subscribe(category => {
        this.categoryForm.patchValue({
          name: category.name,
          description: category.description,
          subjectId: category.subjectId
        });
      });
    }
  }

  onSubmit() {
    if (!this.categoryForm.valid) return;
  
    const category = this.categoryForm.value;
  
    const request$ = this.isEditMode
      ? this._categoryService.updateCategory({ ...category, id: this.categoryId } as EditCategoryDto)
      : this._categoryService.createCategory(category as AddCategoryDto);
  
    request$.subscribe(() => this.goToCategoryList());
  }
  
  goToCategoryList() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

}

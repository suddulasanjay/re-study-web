import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../shared/services/category.service';
import { ConceptService } from '../../../../shared/services/concept.service';
import { DatePickerComponent } from '../../../../common/components/form-controls/date-picker/date-picker.component';

@Component({
  selector: 'app-manage-concept',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,DatePickerComponent],
  templateUrl: './manage-concept.component.html',
  styleUrls: ['./manage-concept.component.scss']
})
export class ManageConceptComponent {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _conceptService = inject(ConceptService);
  private _categoryService = inject(CategoryService);

  conceptForm!: FormGroup;
  isEditMode = false;
  conceptId: number | null = null;
  categories: any[] = [];

  ngOnInit(): void {
    this.conceptForm = this._fb.group({
      name: ['', Validators.required],
      description: [''],
      categoryId: [null, Validators.required],
      scheduledDate: ['', Validators.required],
      repetitionGap: [5, Validators.required],
      duration: [30, Validators.required]
    });

    this._categoryService.getCategories().subscribe(cats => this.categories = cats);

    this._route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== 'add') {
        this.conceptId = +id;
        this.isEditMode = true;
        this.loadConcept();
      }
    });
  }

  loadConcept() {
    if (!this.conceptId) return;
    this._conceptService.getConceptById(this.conceptId).subscribe(concept => {
      this.conceptForm.patchValue({
        ...concept,
        scheduledDate: this.parseToLocalDate(concept.scheduledDate)
      });
    });
  }

  onSubmit() {
    if (this.conceptForm.invalid) return;
    const selected = this.conceptForm.value.scheduledDate;
    const utcDate = new Date(Date.UTC(
      selected.getFullYear(),
      selected.getMonth(),
      selected.getDate()
    ));

    const data = {
      ...this.conceptForm.value,
      scheduledDate: utcDate.toISOString()  // safe format
    };
    if (this.isEditMode) {
      this._conceptService.updateConcept({ ...data, id: this.conceptId }).subscribe(() => this.goToList());
    } else {
      this._conceptService.createConcept(data).subscribe(() => this.goToList());
    }
  }

  goToList() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  private parseToLocalDate(dateStr: string): Date {
    return new Date(dateStr+'Z');
  }
}

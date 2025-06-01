import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../../../shared/services/subject.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-manage-subject',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './manage-subject.component.html',
  styleUrls: ['./manage-subject.component.scss']
})
export class ManageSubjectComponent{
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _activeRoute = inject(ActivatedRoute);
  private _subjectService = inject(SubjectService);
  subjectForm!: FormGroup;
  isEditMode = false;
  subjectId: number | null = null;

  ngOnInit() {
    this.subjectForm = this._fb.group({
      name: ['',Validators.required],
      description: [''],
    });
    this._activeRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if(id !== null && id !== 'add') {
        this.subjectId = +id;
        this.isEditMode = true;
        this.getSubjectDetails();
        
      }
    })
  }

  getSubjectDetails(){
    if(this.subjectId){
      this._subjectService.getSubjectById(this.subjectId).subscribe(subject => {
        this.subjectForm.patchValue({
          name: subject.name,
          description: subject.description
        });
      })
    }
  }

  onSubmit(){
    console.log(this.subjectForm.value);
  }

  goToSubjectList() {
    this._router.navigate(['../'], { relativeTo: this._activeRoute });
  }
  

}

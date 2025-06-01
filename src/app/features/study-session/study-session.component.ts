import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptService } from '../../shared/services/concept.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { SubjectService } from '../../shared/services/subject.service';
import { ConceptStatus } from '../../shared/utilities/concept-status.enum';
import { AddStudySessionDto } from '../../shared/models/request-models/concept.request-model';
import { ConceptDto, StudySessionDto } from '../../shared/models/response-models/concept.response-model';

@Component({
  selector: 'app-study-session',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './study-session.component.html',
  styleUrls: ['./study-session.component.scss']
})
export class StudySessionComponent implements OnInit {
  private _conceptService = inject(ConceptService);
  private _categoryService = inject(CategoryService);
  private _subjectService = inject(SubjectService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  readonly conceptStatus = ConceptStatus;
  conceptId!: number;
  studySessionDetails!: StudySessionDto;
  concept : ConceptDto | null = null;
  userComment: string = '';

  timer: number = 0;
  intervalId: any;
  isRunning: boolean = false;

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.conceptId = +params.get('id')!;
      this.loadConcept();
      this.getStudySessionDetails();
    });
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  getStudySessionDetails() {
    this._conceptService.getStudySessionDetails(this.conceptId).subscribe(data => {
      this.studySessionDetails = data;
      this.timer = Math.floor(data.remainingDuration * 60);
      this.userComment = data.comment || '';
    });
  }

  loadConcept() {
    this._conceptService.getConceptById(this.conceptId).subscribe(data => {
      this.concept = data;
    });
  }

  startTimer() {
    if (!this.isRunning) {
      this.intervalId = setInterval(() => {
        if (this.timer > 0) this.timer--;
      }, 1000);
      this.isRunning = true;
    }
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.isRunning = false;
  }

  markStatus(status: ConceptStatus) {
    const data : AddStudySessionDto = {
      conceptId: this.conceptId,
      duration: this.concept!.duration - (this.studySessionDetails.remainingDuration -(this.timer/60)),
      conceptStateId: status,
      comment: this.userComment
    }
    this._conceptService.recordStudySession(data).subscribe(()=>{
      this._router.navigate(['/schedule']);
    });
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
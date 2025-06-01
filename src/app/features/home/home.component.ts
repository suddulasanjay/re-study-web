import { Component, OnInit, inject } from '@angular/core';
import { FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '../../common/components/form-controls/date-picker/date-picker.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { AgendaDto } from '../../shared/models/response-models/home.response-model';
import { ConceptStatus } from '../../shared/utilities/concept-status.enum';
import { Router } from '@angular/router';
import { HomeService } from '../../shared/services/home.service';

@Component({
  selector: 'app-home',
  standalone : true,
  imports : [ReactiveFormsModule,CommonModule,MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule , MatListModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private _homeService = inject(HomeService);
  private _router = inject(Router);

  conceptStatus = ConceptStatus;
  userName = 'Alex';
  motivationText = 'Stay organized. Study smart.';
  todaysConcepts : AgendaDto[] = [];
  reminderText = 'Next revision for Trees in 2 days';
  ngOnInit() {
    this._homeService.getAgenda().subscribe(data => {
      this.todaysConcepts = data;
    })
  }
  planWeek() {
    throw new Error('Method not implemented.');
  }
  addNewConcept() {
    this._router.navigate(['schedule/concept/add']);
  }

  goToStudySession(id  : number) {
    this._router.navigate([`learn/${id}`]);
  }

}

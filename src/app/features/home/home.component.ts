import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '../../common/components/form-controls/date-picker/date-picker.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

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
planWeek() {
throw new Error('Method not implemented.');
}
addNewConcept() {
throw new Error('Method not implemented.');
}
  userName = 'Alex';
  motivationText = 'Stay organized. Study smart.';

  // Progress Data
  completedCount = 3;
  totalCount = 5;

  // Concepts Data
  todaysConcepts = [
    { 
      name: 'Linked Lists', 
      subject: 'DSA', 
      status: 'in-progress',
      icon: 'hourglass_top',
      duration: '1hr 30min'
    },
    { 
      name: 'Atomic Habits Chapter 3', 
      subject: 'Reading', 
      status: 'completed',
      icon: 'check_circle',
      duration: '30min'
    },
    { 
      name: 'SQL Joins Practice', 
      subject: 'DBMS', 
      status: 'in-progress',
      icon: 'hourglass_top',
      duration: '45min'
    }
  ];

  // Reminder Data
  reminderText = 'Next revision for Trees in 2 days';

}

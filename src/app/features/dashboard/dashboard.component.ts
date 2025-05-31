import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports : [CommonModule,MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule , MatListModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor() { }

  ngOnInit() {
  }
  stats = {
    streak: 5,
    weeklyCompletion: 12,
    masteryLevel: 68,
    efficiency: 82
  };

  // Subject Performance
  subjects = [
    { name: 'Mathematics', progress: 75, trend: 'up' },
    { name: 'Physics', progress: 60, trend: 'up' },
    { name: 'Chemistry', progress: 45, trend: 'down' },
    { name: 'History', progress: 80, trend: 'up' }
  ];

  // Recent Activity
  recentActivity = [
    { concept: 'Integration by Parts', subject: 'Math', date: '2 hours ago', status: 'completed' },
    { concept: 'Ohm\'s Law', subject: 'Physics', date: 'Yesterday', status: 'completed' },
    { concept: 'Atomic Structure', subject: 'Chemistry', date: '2 days ago', status: 'reviewed' }
  ];

  // Study Patterns
  studyPatterns = {
    bestTime: 'Morning (8-11 AM)',
    avgDuration: '1.5 hours/session',
    consistency: '5 days/week'
  };
  getStats() {
    return [
      { value: this.stats.streak, label: 'Day Streak', icon: 'local_fire_department' },
      { value: this.stats.weeklyCompletion, label: 'Concepts This Week', icon: 'checklist' },
      { value: this.stats.masteryLevel + '%', label: 'Mastery Level', progress: this.stats.masteryLevel },
      { value: this.stats.efficiency + '%', label: 'Efficiency', progress: this.stats.efficiency }
    ];
  }
  
  getStudyPatterns() {
    return [
      { icon: 'schedule', label: 'Best Study Time', value: this.studyPatterns.bestTime },
      { icon: 'timer', label: 'Average Duration', value: this.studyPatterns.avgDuration },
      { icon: 'calendar_today', label: 'Consistency', value: this.studyPatterns.consistency }
    ];
  }

}

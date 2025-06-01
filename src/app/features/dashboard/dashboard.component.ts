import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StreakCalendarComponent } from '../../common/components/form-controls/streak-calender/streak-calender.component';
import { RecentActivityDto, StreakDetailsDto } from '../../shared/models/response-models/dashboard.response-model';
import { DashboardService } from '../../shared/services/dashboard.service';
import { ConceptStatus } from '../../shared/utilities/concept-status.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports : [CommonModule,MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule , MatListModule , StreakCalendarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private _dashboardService = inject(DashboardService);

  conceptStatus = ConceptStatus;
  streakDetails : StreakDetailsDto = {
    currentStreak : 0,
    maximumStreak : 0
  }
  recentActivities : RecentActivityDto[] = [];

  ngOnInit() {
    this.getStreakDetails();
    this.getRecentActivities();
  }

  getStreakDetails() {
    this._dashboardService.getStreakDetails().subscribe(data => {
      this.streakDetails = data
    })
  }

  getRecentActivities() {
    this._dashboardService.getRecentActivities().subscribe(data => {
      if(data.length > 0){
        // this.recentActivities = data;
      }
    })
  }

  timeSince(dateString: string): string {
    const now = new Date();
    const pastDate = new Date(dateString+'Z');
    const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);
    
    // Calculate time intervals
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
  
    // Calculate time passed in different units
    if (seconds < 60) {
      return 'just now';
    } else if (seconds < intervals.hour) {
      const minutes = Math.floor(seconds / intervals.minute);
      return `${minutes} mins ago`;
    } else if (seconds < intervals.day) {
      const hours = Math.floor(seconds / intervals.hour);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (seconds < intervals.week) {
      const days = Math.floor(seconds / intervals.day);
      if (days === 1) {
        return 'yesterday';
      }
      return `${days} days ago`;
    } else if (seconds < intervals.month) {
      const weeks = Math.floor(seconds / intervals.week);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (seconds < intervals.year) {
      const months = Math.floor(seconds / intervals.month);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(seconds / intervals.year);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  }

}

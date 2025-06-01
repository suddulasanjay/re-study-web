import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { StreakDay } from '../../../../shared/models/response-models/dashboard.response-model';

@Component({
  selector: 'app-streak-calendar',
  standalone : true,
  imports : [CommonModule,MatIconModule],
  templateUrl: './streak-calender.component.html',
  styleUrl: './streak-calender.component.scss'
})
export class StreakCalendarComponent implements OnInit {
  private _dashboardService = inject(DashboardService);

  currentMonth = new Date();
  daysInMonth: Date[] = [];
  streakData: StreakDay[] = [];

  ngOnInit(): void {
    this.generateCalendar();
    this.fetchStreakData();
  }

  generateCalendar(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
  
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0); // Last actual day
  
    this.daysInMonth = [];
  
    // Get how many blank slots to add before the first day
    const firstDayIndex = (firstDay.getDay() + 6) % 7; // Make Monday = 0
    for (let i = 0; i < firstDayIndex; i++) {
      this.daysInMonth.push(null as any); // Typecast null to Date for placeholder
    }
  
    for (let day = 1; day <= lastDay.getDate(); day++) {
      this.daysInMonth.push(new Date(year, month, day));
    }
  }
  

  fetchStreakData(): void {
    // Simulated data
    this.streakData = [
      { date: '2025-05-01', activityCount: 2 },
      { date: '2025-05-02', activityCount: 3 },
      { date: '2025-04-03', activityCount: 1 },
      { date: '2025-06-07', activityCount: 4 }
    ];

    this._dashboardService.getMonthlyStreakData(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1).subscribe(data => {
      if(data.length > 0){
        this.streakData = data;
      }
    })
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  isActive(day: Date | null): boolean {
    if(!day){
      return false;
    }
    else{
      return this.streakData.some(s =>
        this.isSameDay(new Date(s.date), day) && s.activityCount > 0
      );
    }
  }

  getFireIcon(day: Date): boolean {
    return this.streakData.some(s =>
      this.isSameDay(new Date(s.date), day) && s.activityCount >= 2
    );
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.fetchStreakData();
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.fetchStreakData();
    this.generateCalendar();
  }

  getMonthYear(): string {
    return this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}

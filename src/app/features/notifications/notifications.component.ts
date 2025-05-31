import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-notifications',
  standalone : true,
  imports: [MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent{
  notifications = [
    {
      id: 1,
      title: 'Upcoming Review',
      message: 'Remember to review "Integration by Parts" tomorrow',
      time: '2 hours ago',
      read: false,
      type: 'reminder'
    },
    {
      id: 2,
      title: 'Concept Scheduled',
      message: 'You scheduled "Ohm\'s Law" for today at 2 PM',
      time: 'Yesterday',
      read: true,
      type: 'schedule'
    },
    {
      id: 3,
      title: 'New Feature',
      message: 'Try the new study analytics dashboard',
      time: '2 days ago',
      read: true,
      type: 'system'
    }
  ];

  unreadCount = this.notifications.filter(n => !n.read).length;

  markAsRead(id: number) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      notification.read = true;
      this.unreadCount--;
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.unreadCount = 0;
  }

  deleteNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

}

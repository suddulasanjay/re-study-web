import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationDto } from '../../shared/models/response-models/notification.response-model';
import { NotificationService } from '../../shared/services/notification.service';

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
  private _notificationService = inject(NotificationService);

  notifications : NotificationDto[] = []
  unreadCount = 0;

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this._notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
      this.unreadCount = this.notifications.filter(n => !n.isRead).length;
    })
  }

  markAsRead(id: number) {
    this._notificationService.markNotificationAsRead(id).subscribe(()=>{
      this.fetchNotifications();
    })
  }

  markAsUnread(id: number) {
    this._notificationService.markNotificationAsUnRead(id).subscribe(()=>{
      this.fetchNotifications();
    })
  }

  markAllAsRead() {
    this._notificationService.markAllAsRead().subscribe(()=>{
      this.fetchNotifications();
    })
  }

  markAllAsUnread() {
    this._notificationService.markAllAsUnRead().subscribe(()=>{
      this.fetchNotifications();
    })
  }

  toggleReadStatus(notification: NotificationDto) {
    notification.isRead = !notification.isRead;
    if (notification.isRead) {
      this.markAsRead(notification.id);
    } else {
      this.markAsUnread(notification.id);
    }
  }

  deleteNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.unreadCount = this.notifications.filter(n => !n.isRead).length;
  }

}

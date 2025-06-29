import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { NotificationDto } from "../models/response-models/notification.response-model";

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private _httpClient = inject(HttpClient);
    private _controllerName = 'notification';
    getNotifications() {
        const url = environment.endpoint + this._controllerName;
        return this._httpClient.get<Array<NotificationDto>>(url);
    }

    markAllAsRead() {
        const url = environment.endpoint + this._controllerName + '/mark-all-as-read';
        return this._httpClient.get(url);
    }

    markNotificationAsRead(id: number) {
        const url = environment.endpoint + this._controllerName + '/mark-as-read/' + id;
        return this._httpClient.get(url);
    }

    markAllAsUnRead() {
        const url = environment.endpoint + this._controllerName + '/mark-all-as-un-read';
        return this._httpClient.get(url);
    }

    markNotificationAsUnRead(id: number) {
        const url = environment.endpoint + this._controllerName + '/mark-as-un-read/' + id;
        return this._httpClient.get(url);
    }

    deleteNotification(id: number) {
        const url = environment.endpoint + this._controllerName + '/' + id;
        return this._httpClient.delete(url);
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { RecentActivityDto, StreakDay, StreakDetailsDto } from "../models/response-models/dashboard.response-model";

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    private _httpClient = inject(HttpClient);
    private _controllerName = 'dashboard';
    getMonthlyStreakData(year: number, month: number){
        const url = environment.endpoint + this._controllerName + '/streak-calendar';
        return this._httpClient.get<StreakDay[]>(url, {
          params: { year, month }
        });
    }

    getStreakDetails(){
        const url = environment.endpoint + this._controllerName + '/streak-details';
        return this._httpClient.get<StreakDetailsDto>(url);
    }
     
    getRecentActivities(){
        const url = environment.endpoint + this._controllerName + '/recent-activities';
        return this._httpClient.get<RecentActivityDto[]>(url);
    }
}
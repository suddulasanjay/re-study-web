import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AgendaDto } from "../models/response-models/home.response-model";

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private _httpClient = inject(HttpClient);
    private _controllerName = 'home';

    getAgenda(){
        const url = environment.endpoint + this._controllerName + '/todays-agenda';
        return this._httpClient.get<AgendaDto[]>(url);
    }
}
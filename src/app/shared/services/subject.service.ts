import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { SubjectDto } from "../models/response-models/subject.response-model";

@Injectable({
    providedIn: 'root',
})
export class SubjectService {
    private _httpClient = inject(HttpClient);
    private _controllerName = 'subject';
    getSubjects() {
        const url = environment.endpoint + this._controllerName;
        return this._httpClient.get<Array<SubjectDto>>(url);
    }
}
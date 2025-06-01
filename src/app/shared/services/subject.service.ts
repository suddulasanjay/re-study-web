import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { SubjectDto } from "../models/response-models/subject.response-model";
import { AddSubjectDto } from "../models/request-models/subject.request-model";

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

    getSubjectById(id: number) {
        const url = environment.endpoint + this._controllerName + '/' + id;
        return this._httpClient.get<SubjectDto>(url);
    }

    createSubject(subject: AddSubjectDto) {
        const url = environment.endpoint + this._controllerName;
        return this._httpClient.post(url, subject);
    }
}
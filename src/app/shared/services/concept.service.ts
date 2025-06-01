import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AddConceptDto, EditConceptDto, AddStudySessionDto } from "../models/request-models/concept.request-model";
import { ConceptDto, StudySessionDto } from "../models/response-models/concept.response-model";

@Injectable({
    providedIn: 'root',
})
export class ConceptService {
    private _httpClient = inject(HttpClient);
    private _controllerName = 'concept';
    getConcepts() {
        const url = environment.endpoint + this._controllerName;
        return this._httpClient.get<Array<ConceptDto>>(url);
    }

    getConceptById(id: number) {
        const url = environment.endpoint + this._controllerName + '/' + id;
        return this._httpClient.get<ConceptDto>(url);
    }

    createConcept(concept: AddConceptDto) {
        const url = environment.endpoint + this._controllerName;
        return this._httpClient.post(url, concept);
    }

    updateConcept(concept: EditConceptDto) {
        const url = environment.endpoint + this._controllerName;
        return this._httpClient.put(url, concept);
    }

    recordStudySession(body : AddStudySessionDto) {
        const url = environment.endpoint + this._controllerName + '/record-study-session';
        return this._httpClient.post(url, body);
    }

    getStudySessionDetails(conceptId: number) {
        const url = environment.endpoint + this._controllerName + '/study-session/' + conceptId;
        return this._httpClient.get<StudySessionDto>(url);
    }
}
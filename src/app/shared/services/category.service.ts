import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { CategoryDto } from "../models/response-models/category.response-model";
import { AddCategoryDto, EditCategoryDto } from "../models/request-models/category.request-model";

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private _httpClient = inject(HttpClient);
    private _controllerName = 'category';
    getCategories() {
        const url = environment.endpoint + this._controllerName;
        return this._httpClient.get<Array<CategoryDto>>(url);
    }

    getCategoryById(id: number) {
        const url = environment.endpoint + this._controllerName + '/' + id;
        return this._httpClient.get<CategoryDto>(url);
    }

    createCategory(category: AddCategoryDto) {
        const url = environment.endpoint + this._controllerName;
        return this._httpClient.post(url, category);
    }

    updateCategory(category: EditCategoryDto) {
        const url = environment.endpoint + this._controllerName;
        return this._httpClient.put(url, category);
    }
}
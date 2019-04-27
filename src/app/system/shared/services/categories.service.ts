import { BaseApi } from 'src/app/shared/core/base-api';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }

    addCategory(category: Category): Observable<Category> {
        return this.post('categories', category);
    }

    getCategories(): Observable<Category[]> {
        return this.get('categories');
    }

    updateCategory(category: Category): Observable<Category> {
        return this.put(`categories/${category.id}`, category);
    }
}

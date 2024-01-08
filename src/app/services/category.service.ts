import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'https://api.escuelajs.co/api/v1/categories';

  constructor(private httpClient: HttpClient) {}

  getAllCategories() {
    return this.httpClient.get<Category[]>(this.url);
  }
}

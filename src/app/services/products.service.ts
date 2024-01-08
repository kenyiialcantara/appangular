import { Injectable } from '@angular/core';
import { NewProduct, Product, UpdateProduct } from '../models/product.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, map, throwError, zip } from 'rxjs';

import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [];

  private url = 'https://api.escuelajs.co/api/v1/products';
  constructor(private httpClient: HttpClient) {}

  getByCategory(catgeoryId: string) {
    let params = new HttpParams();
    return this.httpClient.get<Product[]>(
      `https://api.escuelajs.co/api/v1/categories/${catgeoryId}/products`,
      { params }
    );
  }

  getAllProducts() {
    let params = new HttpParams();
    return this.httpClient
      .get<Product[]>(this.url, { params, context: checkTime() })
      .pipe(
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: 0.19 * item.price,
            };
          })
        )
      );
  }

  getOneProduct(id: string) {
    return this.httpClient.get<Product>(`${this.url}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Ups algo salio mal en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProduct) {
    return zip(this.getOneProduct(id), this.update(id, dto));
  }

  create(data: NewProduct) {
    return this.httpClient.post<Product>(this.url, data);
  }
  update(id: string, data: UpdateProduct) {
    return this.httpClient.put<Product>(`${this.url}/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<boolean>(`${this.url}/${id}`);
  }
}

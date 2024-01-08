import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  private cardProducts: Product[] = [];

  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();

  getCardProducts() {
    return this.cardProducts;
  }

  addProduct(product: Product) {
    this.cardProducts.push(product);
    console.log(this.cardProducts, '🍅 ');
    this.myCart.next(this.cardProducts);
  }

  getTotal() {
    return this.cardProducts.reduce((sum, item) => sum + item.price, 0);
  }
}

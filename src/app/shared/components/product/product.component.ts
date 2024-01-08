import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: { id: '0', name: '' },
  };

  @Output() productToAdd = new EventEmitter<Product>();

  @Output() showProduct = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    console.log('ng on init');
  }

  handleAddToCard() {
    this.productToAdd.emit(this.product);
  }

  handleChangeColor(id: string) {
    console.log(id, '🌮 ');

    const el: HTMLElement | null = document.getElementById(id);

    if (el) {
      el.style.backgroundColor = 'green';
    }
  }

  handleShowDeatil() {
    this.showProduct.emit(this.product.id);
  }
}

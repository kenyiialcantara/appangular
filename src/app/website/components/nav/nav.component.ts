import { Component, OnInit } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private categoryService: CategoryService
  ) {}

  categories: Category[] = [];
  counter = 0;

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });

    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}

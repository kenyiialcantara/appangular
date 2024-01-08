import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  products: Product[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          console.log(this.categoryId);
          if (this.categoryId) {
            return this.productsService.getByCategory(this.categoryId);
          }
          return [];
        })
        //more sutchmaps
      )
      .subscribe((data) => {
        this.products = data;
      });
  }
}

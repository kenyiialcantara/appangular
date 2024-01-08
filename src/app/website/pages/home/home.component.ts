import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //async
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
      console.log(this.productId, '🇹🇼 ');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location,
    private router: Router
  ) {}

  product: Product | null = null;
  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          console.log(this.productId);
          if (this.productId) {
            return this.productsService.getOneProduct(this.productId);
          }
          return [null];
        })
        //more sutchmaps
      )
      .subscribe((data) => {
        this.product = data;
      });
  }

  goToBak() {
    this.location.back();
    // this.router.navigate(['/login']);
  }
}

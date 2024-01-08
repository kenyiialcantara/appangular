import {
  Component,
  Input,
  IterableDiffers,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  NewProduct,
  Product,
  UpdateProduct,
} from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

import { ProductsService } from 'src/app/services/products.service';
import { switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.scss'],
})
export class ListproductsComponent implements OnChanges {
  @Input() products: Product[] = [];

  // @Input() productId: string | null = null;

  @Input()
  set productId(id: string | null) {
    if (id) {
      this.handleShowProductDetail(id);
    }
  }

  total = 0;

  cardProductd: Product[] = [];

  today = new Date();

  showDeail = false;

  currentDetailProduct: Product | null = null;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.cardProductd = this.storeService.getCardProducts();
  }

  // ngOnInit(): void {
  //   //async
  //   this.productsService.getAllProducts().subscribe((data) => {
  //     this.products = data;
  //   });
  // }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, '🗃  ');
  }

  handleAddToCard(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  //
  toggleProductDetail() {
    this.showDeail = !this.showDeail;
  }

  statusDeatail: 'loading' | 'success' | 'error' | 'init' = 'init';

  handleShowProductDetail(id: string) {
    console.log(id);
    this.statusDeatail = 'loading';

    if (!this.showDeail) {
      this.showDeail = true;
    }

    this.productsService.getOneProduct(id).subscribe(
      (data) => {
        console.log(data);
        this.currentDetailProduct = data;
        this.showDeail = true;
        this.statusDeatail = 'success';
      },
      (response) => {
        console.log(response, '💆 ');

        window.alert(response);
        // console.log(response.error.message, '🥼 ');
        this.statusDeatail = 'error';
      }
    );
  }

  readAndUpdate(id: string) {
    this.productsService
      .getOneProduct(id)
      .pipe(
        switchMap((product) => {
          return this.productsService.update(product.id, { title: 'change 2' });
        }),
        switchMap((product) => {
          return this.productsService.update(product.id, { title: 'change 3' });
        }),
        switchMap((product) => {
          return this.productsService.update(product.id, { title: 'change 4' });
        })
      )
      .subscribe((data) => {
        console.log(data);
      });

    this.productsService
      .fetchReadAndUpdate(id, { title: 'change change' })
      .subscribe((response) => {
        const product = response[0];
        const update = response[1];
      });
  }

  handleCreateProduct() {
    const product: NewProduct = {
      title: 'New Product',
      price: 10,
      description: 'A description',
      categoryId: 1,
      images: ['https://api.lorem.space/image/fashion?w=640&h=480&r=4278'],
    };
    this.productsService.create(product).subscribe((data) => {
      console.log('created:', data);
      this.products.unshift(data);
    });
  }

  handleUpdateProduct() {
    const chage: UpdateProduct = {
      title: 'Change title',
      price: 100,
    };

    if (this.currentDetailProduct?.id) {
      this.productsService
        .update(this.currentDetailProduct?.id, chage)
        .subscribe((data) => {
          console.log(data);

          const productIndex = this.products.findIndex(
            (item) => item.id === this.currentDetailProduct?.id
          );

          this.products[productIndex] = data;
        });
    }
  }

  handleDeleteProduct() {
    if (this.currentDetailProduct) {
      this.productsService
        .delete(this.currentDetailProduct?.id)
        .subscribe((response) => {
          console.log(response);

          const productIndex = this.products.findIndex(
            (item) => item.id === this.currentDetailProduct?.id
          );

          this.products.splice(productIndex, 1);
          this.showDeail = false;
        });
    }
  }
}

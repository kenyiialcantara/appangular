import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from '../shared/components/img/img.component';
import { ProductComponent } from '../shared/components/product/product.component';
import { ListproductsComponent } from '../shared/components/listproducts/listproducts.component';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ListproductsComponent,
    ReversePipe,
    HighlightDirective,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ImgComponent,
    ProductComponent,
    ListproductsComponent,
    ReversePipe,
    HighlightDirective,
  ],
})
export class SharedModule {}

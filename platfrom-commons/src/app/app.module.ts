import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { CartService } from './cart.service';

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    CartComponent,
    ConfirmOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }

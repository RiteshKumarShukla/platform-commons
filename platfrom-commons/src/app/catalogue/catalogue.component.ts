import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  products: any[] = [];
  cartItems: any[] = [];
  cartControls: { [productId: number]: { isAdding: boolean; quantity: number } } = {};

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.cartService.getCartItems().subscribe((data) => {
      this.cartItems = data;
    });
  }

  addToCart(product: any): void {
    const productId = product.id;
    if (!this.cartControls[productId]) {
      this.cartControls[productId] = { isAdding: false, quantity: 0 };
    }

    this.cartControls[productId].isAdding = true;

    setTimeout(() => {
      this.cartService.addToCart(product);
      this.cartControls[productId].isAdding = false;
      this.cartControls[productId].quantity = 1;
    }, 1000); // Simulated delay, adjust as needed
  }

  increaseQuantity(productId: number): void {
    if (this.cartControls[productId] && this.cartControls[productId].quantity >= 0) {
      this.cartControls[productId].quantity++;
      this.cartService.increaseCartItemQuantity(productId);
    }
  }

  decreaseQuantity(productId: number): void {
    if (this.cartControls[productId] && this.cartControls[productId].quantity > 0) {
      this.cartControls[productId].quantity--;
      if (this.cartControls[productId].quantity === 0) {
        this.cartControls[productId].isAdding = false;
      }
      this.cartService.decreaseCartItemQuantity(productId);
    }
  }
}

// cart.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  constructor() { }

  addToCart(product: any): void {
    // Check if the product is already in the cart
    const existingProduct = this.cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, increase the quantity
      existingProduct.quantity++;
    } else {
      // If the product is not in the cart, add it with quantity 1
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(productId: number): void {
    // Remove the product from the cart by its ID
    const index = this.cart.findIndex(item => item.id === productId);

    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  getCartItems(): any[] {
    return this.cart;
  }
}


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);

  constructor() { }

  addToCart(product: any): void {
    const existingProduct = this.cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.cartSubject.next(this.cart);
  }

  removeFromCart(productId: number): void {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartSubject.next(this.cart);
    }
  }

  // Implement other cart-related methods for increasing and decreasing item quantities

  getCartItems(): BehaviorSubject<any[]> {
    return this.cartSubject;
  }

  // Add other methods for increasing and decreasing item quantities
  increaseCartItemQuantity(productId: number): void {
    const product = this.cart.find(item => item.id === productId);
    if (product) {
      product.quantity++;
      this.cartSubject.next(this.cart);
    }
  }

  decreaseCartItemQuantity(productId: number): void {
    const product = this.cart.find(item => item.id === productId);
    if (product && product.quantity > 0) {
      product.quantity--;
      if (product.quantity === 0) {
        // Remove the item from the cart if the quantity is zero
        const index = this.cart.indexOf(product);
        if (index !== -1) {
          this.cart.splice(index, 1);
        }
      }
      this.cartSubject.next(this.cart);
    }
  }


}

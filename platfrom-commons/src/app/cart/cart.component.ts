import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchCartItems();
  }

  fetchCartItems(): void {
    this.cartService.getCartItems().subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(
      () => {
        this.fetchCartItems();
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  calculateOrderTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateEstimatedDeliveryDate(): string {
    const currentDate = new Date();
    const estimatedDeliveryDate = new Date(currentDate);
    estimatedDeliveryDate.setDate(currentDate.getDate() + 3);
    return `${estimatedDeliveryDate.getFullYear()}-${this.formatNumber(
      estimatedDeliveryDate.getMonth() + 1
    )}-${this.formatNumber(estimatedDeliveryDate.getDate())}`;
  }

  formatNumber(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }

  checkout(): void {
    const orderPayload = {
      cartItems: this.cartItems,
      orderTotal: this.calculateOrderTotal(),
      estimatedDeliveryDate: this.calculateEstimatedDeliveryDate()
    };

    this.cartService.createOrder(orderPayload).subscribe(
      (response) => {
        console.log('Order created:', response);
        this.router.navigate(['/confirm-order']);
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }
}

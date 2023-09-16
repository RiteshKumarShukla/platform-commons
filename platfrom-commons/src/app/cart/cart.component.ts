import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((data) => {
      this.cartItems = data;
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  calculateOrderTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateEstimatedDeliveryDate(): string {
    // Implement logic to calculate estimated delivery date here
    return '2-3 days'; // Example: Replace with actual calculation
  }

  checkout(): void {
    // Implement checkout logic here (e.g., navigate to a confirmation page)
  }
}

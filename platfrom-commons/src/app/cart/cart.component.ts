import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service'; // Import CartService
import { CartDataService } from '../cart-data.service'; // Import CartDataService

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private cartDataService: CartDataService, // Inject CartDataService
    private router: Router
  ) { }

  ngOnInit(): void {
    // Fetch cart items from the CartService
    this.cartService.getCartItems().subscribe((data) => {
      this.cartItems = data;
      // Also, set cart items in CartDataService
      this.cartDataService.setCartItems(data);
    });
  }

  removeFromCart(productId: number): void {
    // Remove item from the cart using the CartService
    this.cartService.removeFromCart(productId);
    // Update cart items in CartDataService
    this.cartDataService.setCartItems(this.cartItems);
  }

  calculateOrderTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateEstimatedDeliveryDate(): string {
    // Implement logic to calculate estimated delivery date here
    return '2-3 days'; // Example: Replace with actual calculation
  }

  checkout(): void {
    console.log('Cart Items:', this.cartItems);
    this.cartDataService.setCartItems(this.cartItems);
    // Navigate to "confirm-order" route
    this.router.navigate(['/confirm-order']);
  }
}

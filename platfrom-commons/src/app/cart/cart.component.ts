import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { CartDataService } from '../cart-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private cartDataService: CartDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch cart items from the server using the CartService
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
      // Also, set cart items in CartDataService
      this.cartDataService.setCartItems(cartItems);
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe((cartItems) => {
      this.cartItems = cartItems;
      // Also, update cart items in CartDataService if needed
      this.cartDataService.setCartItems(cartItems);
    });
  }

  calculateOrderTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateEstimatedDeliveryDate(): string {
    // Get the current date
    const currentDate = new Date();

    const estimatedDeliveryDate = new Date(currentDate);
    estimatedDeliveryDate.setDate(currentDate.getDate() + 3);

    const formattedDate = `${estimatedDeliveryDate.getFullYear()}-${this.formatNumber(
      estimatedDeliveryDate.getMonth() + 1
    )}-${this.formatNumber(estimatedDeliveryDate.getDate())}`;
  
    return formattedDate;
  }
  

  formatNumber(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
  

  checkout(): void {
    console.log('Cart Items:', this.cartItems);
    this.cartDataService.setCartItems(this.cartItems);
    // Navigate to "confirm-order" route
    this.router.navigate(['/confirm-order']);
  }
}

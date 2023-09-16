import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';

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
        Swal.fire('Error', 'Error fetching cart items', 'error');
      }
    );
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(
      () => {
        this.fetchCartItems();
        Swal.fire('Removed from Cart', 'Item removed from cart successfully', 'success');
      },
      (error) => {
        console.error('Error removing item from cart:', error);
        Swal.fire('Error', 'Error removing item from cart', 'error');
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
        Swal.fire('Order Created', 'Your order has been placed successfully', 'success');

        // Delete each cart item one by one
        this.cartItems.forEach(item => {
          this.cartService.removeFromCart(item.id).subscribe(
            () => {
              console.log(`Removed item with ID ${item.id} from the cart.`);
            },
            (error) => {
              console.error(`Error removing item with ID ${item.id} from the cart:`, error);
            }
          );
        });

        // Clear the cart locally
        this.cartItems = [];
        this.router.navigate(['/confirm-order']);
      },
      (error) => {
        console.error('Error creating order:', error);
        Swal.fire('Error', 'Error creating order', 'error');
      }
    );
  }

}

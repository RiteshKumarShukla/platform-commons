// app.component.ts (or your component)
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service'; // Import your cart service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cartData: any[] = []; // Assuming you have the cart data here

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Fetch the cart data from your service (You may need to update this based on your actual implementation)
    this.cartService.getCartItems().subscribe((data) => {
      this.cartData = data;
    });
  }

  get cartCount(): number {
    return this.cartData.length;
  }
}

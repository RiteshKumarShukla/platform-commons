import { Component, OnInit } from '@angular/core';
import { CartDataService } from '../cart-data.service'; 

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartDataService: CartDataService) { }

  ngOnInit(): void {
    this.cartItems = this.cartDataService.getCartItems();
    console.log('Received Data:', this.cartItems);
  }
}

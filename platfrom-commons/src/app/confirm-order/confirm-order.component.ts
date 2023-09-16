import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Order {
  cartItems: any[];
  orderTotal: number;
  estimatedDeliveryDate: string;
  id: number;
}

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.http.get<Order[]>('https://platform-commons-api.onrender.com/order')
      .subscribe(data => {
        this.orders = data;
      });
  }
}

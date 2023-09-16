import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import Swal from 'sweetalert2';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  weight: number;
  quantity: number;
}

interface Order {
  cartItems: CartItem[];
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
  orderData: Order | null = null;

  constructor(private orderService: OrderService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.orderData = await this.orderService.getOrderData().toPromise();
      console.log(this.orderData);
      Swal.fire('Order Details', 'Order data fetched successfully', 'success');
    } catch (error) {
      console.error('Error fetching order data:', error);
      Swal.fire('Error', 'Error fetching order data', 'error');
      // Handle the error (e.g., display a message to the user)
    }
  }
}

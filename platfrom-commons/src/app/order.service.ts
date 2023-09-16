import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'http://localhost:3000/order';  // Adjust the URL for your API

  constructor(private http: HttpClient) { }

  getOrderData(): Observable<any> {
    return this.http.get<any>(this.orderUrl);
  }
}

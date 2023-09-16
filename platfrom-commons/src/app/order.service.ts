import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'https://platform-commons-api.onrender.com/order';  

  constructor(private http: HttpClient) { }

  getOrderData(): Observable<any> {
    return this.http.get<any>(this.orderUrl);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  private cartControlsSubject = new BehaviorSubject<{ [productId: number]: { isAdding: boolean; quantity: number } }>({});
  cartControls$ = this.cartControlsSubject.asObservable();

  private cartUrl = 'https://platform-commons-api.onrender.com/cart';

  constructor(private http: HttpClient) {
    // Fetch cart items from the server initially
    this.fetchCartItems().subscribe();
  }

  private fetchCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl).pipe(
      map((data) => {
        // Flatten the array of arrays into a flat array
        const flatCartItems = data.reduce((acc, current) => acc.concat(current), []);
        this.cartSubject.next(flatCartItems);
        return flatCartItems;
      })
    );
  }

  addToCart(product: any): Observable<any> {
    // Make a POST request to add the product to the cart
    return this.http.post(this.cartUrl, product).pipe(
      switchMap(() => {
        // After successful addition, fetch and update the cart items
        return this.fetchCartItems();
      })
    );
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.cartUrl}/${productId}`).pipe(
      switchMap(() => {
        // After successful removal, fetch and update the cart items
        return this.fetchCartItems();
      })
    );
  }

  getCartItems(): BehaviorSubject<any[]> {
    return this.cartSubject;
  }

  increaseCartItemQuantity(productId: number): void {
    const product = this.cartSubject.value.find(item => item.id === productId);
    if (product) {
      product.quantity++;
      // Make a PATCH request to update the cart item quantity on the server
      this.http.patch(`${this.cartUrl}/${productId}`, { quantity: product.quantity }).subscribe();

      this.cartSubject.next([...this.cartSubject.value]);
    }
  }

  decreaseCartItemQuantity(productId: number): void {
    const product = this.cartSubject.value.find(item => item.id === productId);
    if (product && product.quantity > 0) {
      product.quantity--;

      if (product.quantity === 0) {
        const index = this.cartSubject.value.indexOf(product);
        if (index !== -1) {
          this.cartSubject.value.splice(index, 1);
        }
      }

      // Make a PATCH request to update the cart item quantity on the server
      this.http.patch(`${this.cartUrl}/${productId}`, { quantity: product.quantity }).subscribe();

      this.cartSubject.next([...this.cartSubject.value]);
    }
  }

  updateCart(cartItems: any[]) {
    // Make a PUT request to update the entire cart on the server
    return this.http.put(this.cartUrl, cartItems).pipe(
      switchMap(() => {
        // After successful update, fetch and update the cart items
        return this.fetchCartItems();
      })
    );
  }

  createOrder(orderPayload: any): Observable<any> {
    const orderUrl = 'https://platform-commons-api.onrender.com/order';  
    return this.http.post<any>(orderUrl, orderPayload);
  }

}

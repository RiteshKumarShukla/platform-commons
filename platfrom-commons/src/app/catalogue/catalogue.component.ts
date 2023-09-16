import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  products: any[] = [];
  cartItems: any[] = [];
  cartControls: { [productId: number]: { isAdding: boolean; quantity: number } } = {};
  searchText: string = '';
  selectedSortOption: string = 'priceLowToHigh';
  selectedFilterOption: string = 'all';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });

    
    this.cartService.getCartItems().subscribe((data) => {
      this.cartItems = data;
    });
  }

  addToCart(product: any): void {
    const productId = product.id;
    if (!this.cartControls[productId]) {
      this.cartControls[productId] = { isAdding: false, quantity: 0 };
    }
  
    this.cartControls[productId].isAdding = true;
  
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
      quantity: 1,
    };
  
    // Make a POST request to add the product to the cart
    this.cartService.addToCart(cartItem).subscribe(
      () => {
        // On success, update the UI
        const existingCartItem = this.cartItems.find((item) => item.id === productId);
  
        if (existingCartItem) {
          existingCartItem.quantity++;
        } else {
          this.cartItems.push(cartItem);
        }
  
        this.cartControls[productId].isAdding = false;
        this.cartControls[productId].quantity = 1;
      },
      (error) => {
        console.error('Error adding to cart:', error);
        this.cartControls[productId].isAdding = false;
      }
    );
  }
  increaseQuantity(productId: number): void {
    const cartItem = this.cartItems.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
      this.cartService.increaseCartItemQuantity(productId);
    }
  }
  
  decreaseQuantity(productId: number): void {
    const cartItem = this.cartItems.find((item) => item.id === productId);
    if (cartItem) {
      if (cartItem.quantity > 0) {
        cartItem.quantity--;
  
        if (cartItem.quantity === 0) {
          // Remove the product from the cart
          const index = this.cartItems.indexOf(cartItem);
          if (index !== -1) {
            this.cartItems.splice(index, 1);
          }
          // Replace UI with "Add to Cart" button
          this.cartControls[productId].quantity = 0;
        } else {
          this.cartService.decreaseCartItemQuantity(productId);
        }
      }
    }
  }
  
      
  onSearch(): void {
    if (this.searchText.trim() !== '') {
      this.products = this.products.filter(product => product.name.toLowerCase().includes(this.searchText.toLowerCase()));

    }
  }

  onSort(): void {
    if (this.selectedSortOption === 'priceLowToHigh') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (this.selectedSortOption === 'priceHighToLow') {
      this.products.sort((a, b) => b.price - a.price);
    }
  }

}

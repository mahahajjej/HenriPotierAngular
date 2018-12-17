import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  cartNumber: Subject<number> = new Subject<number>();

  public setCart(value) {
    localStorage.setItem('cart', JSON.stringify(value));
  }
  public getCart(): any {
    return localStorage.getItem('cart');
  }

  public emptyCart(){
    localStorage.removeItem('cart');
  }

  public setCartProductsNumber(n: number) {
    this.cartNumber.next(n);
  }

  public getCartProductsNumber(): Observable<number> {
    return this.cartNumber.asObservable();
  }
}

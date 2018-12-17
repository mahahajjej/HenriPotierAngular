import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  toCart: boolean = true;
  cartNumber: number;

  constructor(private router: Router,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/cart') {
          this.toCart = false;
        } else {
          this.toCart = true;
        }
      }
    });
    this.localStorageService.getCartProductsNumber().subscribe((n) => {
      this.cartNumber = n;
    });
  }

}

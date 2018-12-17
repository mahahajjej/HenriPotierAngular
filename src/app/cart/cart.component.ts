import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { OfferService } from '../offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartBooks: any;
  totalPrice: number = 0;
  totalPriceAfterOffer: number = 0;
  offers: any;
  selectedOffer: any;

  constructor(private localStorageService: LocalStorageService,
    private offerService: OfferService,
    private router: Router) { }

  ngOnInit() {
    this.cartBooks = JSON.parse(this.localStorageService.getCart());
    this.cartBooks.forEach((book) => {
      this.totalPrice = this.totalPrice + parseInt(book.price);
    });

    this.offerService.findOffers(this.cartBooks.length).subscribe((data) => {
      this.offers = data.body.offers;
      this.determineOffer();
    });

  }

  pay(){
    alert("Thank you for purchasing !");
    this.localStorageService.emptyCart();
    this.router.navigate(['/shop']);
  }

  determineOffer() {

    let pOffer = this.totalPrice;
    let mOffer = this.totalPrice;
    let sOffer = this.totalPrice;

    this.offers.forEach((item) => {
      switch (item.type) {
        case 'percentage': {
          pOffer = pOffer - (pOffer*(parseInt(item.value)/100));
          break;
        }
        case 'minus': {
          mOffer = mOffer - parseInt(item.value);
          break;
        }
        case 'slice': {
          if(sOffer >= parseInt(item.sliceValue)){
            let slices = Math.floor(sOffer / parseInt(item.sliceValue));
            sOffer = sOffer - (slices * parseInt(item.value));
          }
          break;
        }
      }
    });

    let lowest = Math.min(pOffer, mOffer, sOffer);
    this.totalPriceAfterOffer = lowest;

    let offersMap = this.offers.map((o)=>{
      return o.type;
    });

    if(lowest == pOffer){
      this.selectedOffer = this.offers[offersMap.indexOf('percentage')];

    }else if(lowest == mOffer){
      this.selectedOffer = this.offers[offersMap.indexOf('minus')];

    }else if(lowest == sOffer){
      this.selectedOffer = this.offers[offersMap.indexOf('slice')];

    }

  }

}

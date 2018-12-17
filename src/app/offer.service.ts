import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  apiUrl = 'http://localhost:8080/api/offers/';

  constructor(private http: HttpClient) { }

  findOffers(items: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.apiUrl + items, {observe : 'response'});
  }
}

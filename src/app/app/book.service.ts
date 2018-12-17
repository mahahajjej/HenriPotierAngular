import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  findBooks(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.apiUrl, {observe : 'response'});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "./customer";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private url = "http://localhost:8081/shopping/customers?name=Maxwell+Stark";

  constructor(private http: HttpClient) { }

  // getProducts(): Observable<Customer[]> {
  //   return this.http.get(this.url)
  //     .map((response: Response) => <Customer[]>response.json())
  //     .catch(this.handleError);
  // }
}

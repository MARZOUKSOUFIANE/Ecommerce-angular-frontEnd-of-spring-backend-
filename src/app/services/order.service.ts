import { Injectable } from '@angular/core';
import {Order} from '../model/order.model';
import {Client} from '../model/client.model';
import {CaddyService} from './caddy.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CatalogueService} from './catalogue.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public order:Order;


  constructor(private caddyService:CaddyService,
              private http:HttpClient,
              private catalService:CatalogueService) { }

  setClient(client: Client) {
    this.order.client=client;
  }

  loadProductsFromCaddy() {
    let caddy=this.caddyService.getCurrentCaddy();
    for(let key in caddy.items){
      this.order.products.push(caddy.items[key]);
    }
  }

  getTotal(){
    let total=0;
    this.order.products.forEach(p=>{
      total+=p.price*p.quantity
    });
    this.order.totalAmount=total;
    return total;
  }

  submitOrder() {
    console.log(this.order)
    return this.http.post<Order>(this.catalService.host+'/orders',this.order);
  }
}

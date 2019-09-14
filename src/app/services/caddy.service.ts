import { Injectable } from '@angular/core';
import {Caddy} from '../model/caddy.model';
import {Product} from '../model/product.model';
import {ProductItem} from '../model/productItem.model';
import {Client} from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  public currentCaddyName:string;
  public caddies:Map<string,Caddy>=new Map();

  constructor() {
    if(!this.loadCaddyFromLocalStorage()){
      this.currentCaddyName='Caddy1';
      let caddy=new Caddy(this.currentCaddyName);
      localStorage.setItem('currentCaddy',this.currentCaddyName);
      this.caddies[this.currentCaddyName]=caddy;
    }
    else
    this.currentCaddyName=localStorage.getItem('currentCaddy');
  }

  public addProductToCaddy(product:Product){
    let caddy=this.caddies[this.currentCaddyName];
    let productItem:ProductItem=caddy.items[product.id];
    if(productItem){
      productItem.quantity+=product.quantity;
    }
    else{
      productItem=new ProductItem();
      productItem.price=product.currentPrice;
      productItem.quantity=product.quantity;
      productItem.product=product;
      productItem.id=product.id;
      caddy.items[product.id]=productItem;
    }
    this.saveCaddies();
  }

  public getCurrentCaddy():Caddy{
    return this.caddies[this.currentCaddyName];
  }

  public getTotal():number{
    let caddy=this.getCurrentCaddy();
    let total=0;
    for(let key in caddy.items ){
      total+=caddy.items[key].price*caddy.items[key].quantity;
    }
    return total;
  }

  public saveCaddies(){
    localStorage.setItem('myCaddies',JSON.stringify(this.caddies));
  }

  public getSize(){
    let caddy=this.caddies[this.currentCaddyName];
    return Object.keys(caddy.items).length;
  }

  public getCaddiesSize(){
    return Object.keys(this.caddies).length;
  }

  public loadCaddyFromLocalStorage(){
    let caddies=JSON.parse(localStorage.getItem('myCaddies'));
    if(caddies){
      this.caddies=caddies;
      return true;
    }
    else
      return false;
  }

  setClient(client: Client) {
    this.getCurrentCaddy().client=client;
    this.saveCaddies();
  }

  addCaddy() {
    let caddy=new Caddy('Caddy'+(this.getCaddiesSize()+1));
    this.caddies[caddy.name]=caddy;
    this.saveCaddies();
  }

  selectCaddy(caddyName) {
    this.currentCaddyName=caddyName;
    localStorage.setItem('currentCaddy',caddyName);
  }
}

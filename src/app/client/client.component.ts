import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';
import {AuthenticationService} from '../services/authentication.service';
import {CaddyService} from '../services/caddy.service';
import {Router} from '@angular/router';
import {Client} from '../model/client.model';
import {Order} from '../model/order.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public mode:number=0;
  panelStyle:string= "panel-default";

  constructor(private orderService:OrderService,
              private authService:AuthenticationService,
              private caddyService:CaddyService,
              private router:Router) { }

  ngOnInit() {
    this.orderService.order=new Order();
    this.caddyService.getCurrentCaddy().client=new Client();
  }

  onSaveClient(client:Client) {
    client.username=this.authService.userAuthenticated.username;
    this.orderService.setClient(client);
    this.caddyService.setClient(client);
    this.orderService.loadProductsFromCaddy();
    this.mode=1
  }

  onOrder() {
    this.orderService.submitOrder().
    subscribe(data=>{
      this.orderService.order.id=data['id'];
      this.orderService.order.date=data['date'];
      this.panelStyle='panel-success';
    },err=>{
      console.log(err);
    })
  }
}

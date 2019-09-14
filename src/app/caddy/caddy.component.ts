import { Component, OnInit } from '@angular/core';
import {CaddyService} from '../services/caddy.service';
import {Caddy} from '../model/caddy.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {

  public caddy:Caddy;

  constructor(private caddyService:CaddyService,
              private router:Router,private authService:AuthenticationService) { }

  ngOnInit() {
    this.caddyService.loadCaddyFromLocalStorage();
    this.caddy=this.caddyService.getCurrentCaddy();
  }

  onNewOrder() {
    this.router.navigate(['/client']);
  }

  onAddCaddy() {
    this.caddyService.addCaddy();
  }

  onSelectCaddy(caddyName) {
    this.caddyService.selectCaddy(caddyName);
  }
}

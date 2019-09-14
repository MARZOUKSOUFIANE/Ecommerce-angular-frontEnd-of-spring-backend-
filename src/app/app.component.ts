import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './services/catalogue.service';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {CaddyService} from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private categories: any;
  public currentCategory;

  constructor(private catalogueService:CatalogueService,
              private router:Router,private authService:AuthenticationService,
              private  caddyService:CaddyService){}

  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();
  }

  private getCategories() {
    this.catalogueService.getResource("/categories")
      .subscribe(data=>{
        this.categories=data;
      },error=>{
        console.log(error);
      })
  }

  getProductsByCat(c) {
    this.currentCategory=c;
    this.router.navigate(['/products/2/'+c.id]);
  }

  onSelectedProduct() {
    this.currentCategory=undefined;
    this.router.navigate(['']);
  }

  onProductPromo() {
    this.currentCategory=undefined;
    this.router.navigate(['/products/3/0']);
  }

  onProductDispo() {
    this.currentCategory=undefined;
    this.router.navigate(['/products/4/0']);
  }

  onLogout() {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigate(['login'])}
}

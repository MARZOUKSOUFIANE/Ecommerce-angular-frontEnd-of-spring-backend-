import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {LoginComponent} from './login/login.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CaddyComponent} from './caddy/caddy.component';
import {ClientComponent} from './client/client.component';

const routes: Routes = [
  {path:'products/:p1/:p2', component:ProductComponent},
  {path:'', redirectTo:'products/1/0', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'product-details/:url', component:ProductDetailComponent},
  {path:'caddies', component:CaddyComponent},
  {path:'client', component:ClientComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {Product} from '../model/product.model';
import {CaddyService} from '../services/caddy.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public products;
  public editPhoto: boolean;
  public currentProduct: any;
  public selectedFiles: any;
  public progress: number;
  public currentUploadedFile: any;
  public title:String;
  public timestamp: number=0;

  constructor(private catalogueService:CatalogueService,
              private activatedRoute:ActivatedRoute,
              private router:Router,public authService:AuthenticationService,
              private caddyService:CaddyService) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        this.gererRouter();
      }
    });
  this.gererRouter();
  }

  public gererRouter(){
    let p1=this.activatedRoute.snapshot.params.p1;
    if(p1==1){
      this.getProducts("/products/search/selectedProducts");
      this.title="Les produits selectionnes"
    }
    else if (p1==2){
      let idCat=this.activatedRoute.snapshot.params.p2;
      this.title="Les produits de la categorie"+idCat;
      this.getProducts('/categories/'+idCat+'/products');
    }
    else if (p1==3){
      let idCat=this.activatedRoute.snapshot.params.p2;
      this.title="Les produits en promotion";
      this.getProducts('/products/search/productPromo');
    }
    else if (p1==4){
      let idCat=this.activatedRoute.snapshot.params.p2;
      this.title="Les produits Disponibles"
      this.getProducts('/products/search/productDispo');
    }
    else if (p1==5){
      let idCat=this.activatedRoute.snapshot.params.p2;
      this.title="Les produits recherches"
      this.getProducts('/products/search/productsByKeyword?');
    }
  }

  private getProducts(url) {
    this.catalogueService.getResource(url)
      .subscribe(data=>{
        this.products=data;
      },error => {
        console.log(error)
      })
  }

  onEditProduct(p) {
    this.progress=0;
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress=0;
    this.currentUploadedFile=this.selectedFiles.item(0);
    this.catalogueService.uploadPhotoProduct(this.currentUploadedFile,this.currentProduct.id).subscribe(event=>{
      if(event.type==HttpEventType.UploadProgress){
        this.progress=Math.round(100*event.loaded/event.total);
      }else if (event instanceof HttpResponse){
        //alert("Upload est termine avec succe");
        //this.getProducts("/products/search/selectedProducts");
        //window.location.reload();
        this.timestamp=Date.now();
      }
    },err=>{
      alert("problem de chargement... ");
    });
  }

  getTs() {
    return this.timestamp;
  }

  isAdmin() {
    return this.authService.isAdmin()
  }


  onAddProductToCaddy(p:Product) {
    if(this.authService.isAuthenticated)
    this.caddyService.addProductToCaddy(p);
    else
      this.router.navigate(['/login']);
  }


  onProductDetails(p:Product) {
    let url=btoa(p._links.product.href);
    this.router.navigate(['product-details/'+url]);
  }
}

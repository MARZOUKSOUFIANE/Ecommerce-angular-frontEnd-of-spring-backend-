import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {AuthenticationService} from '../services/authentication.service';
import {HttpEventType, HttpResponse} from '../../../node_modules/@angular/common/http';
import {Product} from '../model/product.model';
//import {CaddyService} from '../services/caddy.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  currentProduct:Product;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  private currentTime: number;
  private editPhoto: boolean;
  private mode: number=0;

  constructor(private router:Router, private route:ActivatedRoute,
              public catalService:CatalogueService,
              public authService:AuthenticationService,
             /* public caddyService:CaddyService*/) { }

  ngOnInit() {
    let url=atob(this.route.snapshot.params.url);
    console.log(url);
    this.catalService.getProduct(url)
      .subscribe(data=>{
        this.currentProduct=data;
      },err=>{
        console.log(err);
      })
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  onAddProductToCaddy(p:Product) {
    if(!this.authService.isAuthenticated){
      this.router.navigateByUrl("/login");
    }
    else{
     // this.caddyService.addProduct(p);
    }
  }

  getTS() {
    return this.currentTime;
  }

  onEditProduct() {
    this.mode=1;
  }

  onUpdateProduct(data) {
    let url=this.currentProduct._links.self.href;
    this.catalService.patchResource(url,data)
      .subscribe(d=>{
      //  this.currentProduct=d;
        this.mode=0;
      },err=>{
        console.log(err);
      })
  }
}

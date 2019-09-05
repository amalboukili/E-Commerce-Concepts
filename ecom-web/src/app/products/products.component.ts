import { CatalogueService } from './../catalogue.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;
  editPhoto: boolean;
  currentProduct: any;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  title: string;
  timestamp: number = 0;


  constructor(
    private catService: CatalogueService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthentificationService
  ) {

  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof (NavigationEnd || NavigationStart)) {
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {
          this.title = "Selection";
          this.getProducts("/products/search/selectedProducts");
        }

        else if (p1 == 2) {
          let idCat = this.route.snapshot.params.p2;
          this.title = "Produits de la categorie " + idCat;
          this.getProducts('/categories/' + idCat + '/products');
        }

        else if (p1 == 3) {
          this.title = "Produits en Promotion ";
          this.getProducts('/products/search/promoProducts');
        }

        else if (p1 == 4) {
          this.title = "Produits Disponibles ";
          this.getProducts('/products/search/dispoProducts');
        }

        else if (p1 == 5) {
          this.title = "Recherche... ";
          this.getProducts('/products/search/dispoProducts');
        }
      }

    });
    let p1 = this.route.snapshot.params.p1;
    if (p1 == 1) {
      this.getProducts("/products/search/selectedProducts");
    }
  }

  private getProducts(url) {
    //throw new Error("Method not implemented.");
    this.catService.getResource(url)
      .subscribe(data => {
        this.products = data;
      }, err => {
        console.log(err);
      })
  }
  onEditPhoto(p) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id)
      .subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress);
        }
        else if (event instanceof HttpResponse) {
          //this.getProducts("/products/search/selectedProducts");
          //alert ("Fin du telechargement...");
          this.timestamp = Date.now();
        }
      }, err => {
        alert("Probleme de chargement");
      })
    this.selectedFiles = undefined
  }

  getTS() {
    return this.timestamp;
  }

isAdmin(){
  return this.authService.isAdmin();
}

}

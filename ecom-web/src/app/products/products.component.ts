import { CatalogueService } from './../catalogue.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;

  constructor(
    private catService: CatalogueService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof (NavigationEnd || NavigationStart)) {
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {
          this.getProducts("/products/search/selectedProducts");
        }

        else if (p1 == 2) {
          let idCat = this.route.snapshot.params.p2;
          this.getProducts('/categories/' + idCat + '/products');
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

}

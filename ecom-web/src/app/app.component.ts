import { CatalogueService } from './catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecom-web';

  private categories;
  private currentCategorie;

  constructor(
    private catService:CatalogueService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    //throw new Error("Method not implemented.");
    this.catService.getResource("/categories")
    .subscribe(data=>{
      this.categories = data;
    }, err=>{
      console.log(err);
    })
  }
 
  onselectedProducts(){
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/1/0");
  }

  getProductsByCat(c){
    this.currentCategorie=c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onProductsPromo(){
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/3/0');
  }

  onProductsDispo(){
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/4/0');
  }
  

}

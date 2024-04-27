import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  public productList : any ;
  searchkey :string ="";
  public filterCtegory : any = "";
 constructor(private api : ApiService, private cartservice :CartService){}

 ngOnInit(): void{
  this.api.getproduct()
  .subscribe(res=>{
  this.productList = res;
  this.filterCtegory = res;
  this.productList.forEach((a:any) => {
    if(a.category==="women's clothing" || a.category==="men's clothing"){
      a.category ='fashion'
    }
    Object.assign(a,{quantity:1,total:a.price})
  });
  console.log(this.productList);
  
  })
  this.cartservice.search.subscribe((val:any)=>{
    this.searchkey= val;
  })
 }
 addtocart(item:any){
  this.cartservice.addtoCart(item)
 }
 filter(category:string){
this.filterCtegory = this.productList
.filter((a:any)=>{
  if(a.category == category || category==''){
    return a;
  }
})
 }
}

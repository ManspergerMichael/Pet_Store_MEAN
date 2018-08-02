import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  prod:any
  id:any
  messages:any
  deleteFlag:boolean
  constructor(private _http:HttpService,private _route: ActivatedRoute, private _router:Router) {
    this.deleteFlag = false;
    this.prod = {_id:'',name:'',quantity:'',price:''};
    this.id = this._route.snapshot.paramMap.get("id");
    console.log(this.id);
   }

  ngOnInit() {
    this.find(this.id);
  }

  find(id){
    let observeable = this._http.find(id);
    observeable.subscribe(data =>{
      console.log(data['data']);
      this.prod = data['data'];
    })
  }

  delete(){
    let observeable = this._http.delete(this.id);
    observeable.subscribe(data =>{
      if(data['message'] == "Success"){
        this._router.navigate(['/list']);
      }
    })
  }
}

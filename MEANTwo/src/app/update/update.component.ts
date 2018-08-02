import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  prod:any
  messages:any
  id:any
  constructor(private _http:HttpService,private _route: ActivatedRoute, private _router:Router) {
    this.prod = {name:'',quantity:'',price:''}
    this.id = this._route.snapshot.paramMap.get("id");
    this.messages = [];
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

  update($event){
    this.messages = [];
    let obs = this._http.update(this.id,this.prod);
    obs.subscribe(data =>{
      console.log(data);
      if(data['message']=="Error"){
        console.log(data);
        if(data['error']['errors']['name']){
          this.messages.push(data['error']['errors']['name']['message']);
        }
        if(data['error']['errors']['quantity']){
          this.messages.push(data['error']['errors']['quantity']['message']);
        }
        if(data['error']['errors']['price']){
          this.messages.push(data['error']['errors']['price']['message']);
        }
      }
      else{
        this._router.navigate(['/list']);
      }
    })
  }
}

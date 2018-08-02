import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  prod:any
  messages:any

  constructor(private _http:HttpService,private _route: ActivatedRoute, private _router:Router) {
    this.prod = {name:"",quantity:"",price:""};
    this.messages = [];
   }

  ngOnInit() {
  }

  create(event){
    this.messages = [];
    let obs = this._http.create(this.prod);
    obs.subscribe(data =>{
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

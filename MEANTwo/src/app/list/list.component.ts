import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products:any
  constructor(private _http:HttpService) { }

  ngOnInit() {
    this.show();
  }

  show(){
    let observeable = this._http.getAll();
      observeable.subscribe(data => {
        //console.log(data['data']);
        this.products = data['data'];
      })
  }

}

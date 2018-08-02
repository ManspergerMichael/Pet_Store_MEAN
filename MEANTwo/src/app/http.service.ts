import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  //routes
  getAll(){
    return this._http.get('/getAll');
  }
  find(id){
    return this._http.get('/find/'+id);
  }
  delete(id){
    return this._http.get('/delete/'+id);
  }
  create(data){
    return this._http.post('/create', data);
  }
  update(id, data){
    return this._http.post('/update/'+id, data);
  }
}

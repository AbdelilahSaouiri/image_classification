import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
   name!:any
   roles:any 
   public islogged:boolean=false

  constructor(private http:HttpClient) { }

  login(user:any):Observable<HttpResponse<any>>{
     return this.http.post(`${environment.backurl}/auth`,user,{observe:'response'});
  }

  profile(data:any){
      this.name=data.name
      this.islogged=true
      localStorage.setItem("name",this.name)
      localStorage.setItem("roles",data.role)
  }


  loadProfile(){
    this.name=localStorage.getItem("name")?.split("@")[0]
    if(this.name){
      this.islogged=true
    }
    this.roles=localStorage.getItem("roles")
  }
}

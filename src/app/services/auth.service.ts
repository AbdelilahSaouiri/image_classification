import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
   name!:string
   roles:any 

  constructor(private http:HttpClient) { }

  login(user:any):Observable<HttpResponse<any>>{
     return this.http.post(`${environment.backurl}/auth`,user,{observe:'response'});
  }

  profile(data:any){
      this.name=data.name
      this.roles=data.role
      localStorage.setItem("name",this.name)
  }
}

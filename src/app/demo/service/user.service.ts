import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url : string='http://localhost:8000/api';

  constructor(private http: HttpClient) { }
  login(data: any){
  
    return this.http.post(this.url+'/login',data)

  }
  signup(data:any){
    return this.http.post(this.url+'/signup',data)

  }
  getrole(email:any){
    return this.http.get(this.url+'/getuserByEmail/'+email)

  }

  sendPasswordResetLink(data: any) {
    return this.http.post(this.url + '/sendpasswordresetlink', data); // Include data parameter in the post request
  }
  changepassword(data: any) {
    return this.http.post(this.url + '/resetpassword', data); // Include data parameter in the post request
  }

  listusers(){
    return this.http.get(this.url+'/users')

  }
  updateuser(id:any, user:any){
    return this.http.put<any>(this.url+'/updateuser/'+id,user);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable()
export class CustomerService {
    url : string='http://localhost:8000';
    constructor(private http: HttpClient) { }


    login(form:any){
        return this.http.post<any>(this.url+'/api/aut/login',form);
  

    }
}

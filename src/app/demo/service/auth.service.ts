import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn())
  authstatus=this.loggedIn.asObservable();
  changeauthstatus(value : boolean){
    this.loggedIn.next(value)
    console.log("++++++++++++++++++++",value)
  }
  constructor(private token : TokenService) { }
}

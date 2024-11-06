import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './demo/service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Retrieve user role from local storage
    const userRole = localStorage.getItem('role');

    // Check if the user has the required role (e.g., technician)
    if (userRole === 'technicien') {
      // Redirect to the access page
      this.router.navigate(['/auth/access']);
      console.log("false")
      console.log(userRole)
      return false; // Prevent access to the dashboard
   
    }

    // Allow access for other roles
    console.log("true")
    return true;
  }
  
}

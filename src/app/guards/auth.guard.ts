import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

	constructor(private service: AuthService, private router: Router) {}
  	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  	if (this.service.isAuthenticated()) {
  		return true;
  	}
  	else {
  		this.router.navigate(['/login']);
  		return false;
  	}
  }
  
}
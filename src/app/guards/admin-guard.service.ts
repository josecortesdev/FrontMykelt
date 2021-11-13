import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate { // Implementamos canactive

  constructor(
    private tokenService: TokenService, // inyectamos tokenservice
    private router: Router // inyectamos router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.tokenService.isAdmin()) {
      this.router.navigate(['/'])
      return false
    }
    return true;

  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard  {
  constructor( private auth:AuthService ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return true
      // this.auth._dni
      // .subscribe( dni => {
      //   if(dni == '') {
      //     return false
      //   } else {
      //     return true
      //   }
      // })
  
}
}

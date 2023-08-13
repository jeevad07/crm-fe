import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserinfostorageService } from 'src/app/userinfostorage.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GadminGuardService {
  constructor(private router: Router, public userinfostorage: UserinfostorageService, public cookies: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    let roleID;
    let userInfo:any = this.cookies.get('userInfo');
    userInfo = JSON.parse(userInfo);
    roleID=userInfo.roleID
    if (roleID === '3') {
      return true;
    } else {
      return this.router.createUrlTree(['/unauthorized']);
    }
  }
}

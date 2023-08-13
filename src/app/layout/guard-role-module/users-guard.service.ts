import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserinfostorageService } from 'src/app/userinfostorage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuardService {
  constructor(private router: Router,public userinfostorage:UserinfostorageService, public cookies: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    let roleID;
    let userInfo:any = this.cookies.get('userInfo');
    userInfo = JSON.parse(userInfo);
    roleID=userInfo.roleID
    if (roleID === '2') {
      return true;
    } else {
      return this.router.createUrlTree(['/unauthorized']);
    }
  }
}

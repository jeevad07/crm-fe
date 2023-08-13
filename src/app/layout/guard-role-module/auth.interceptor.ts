import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserinfostorageService } from 'src/app/userinfostorage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public cookies: CookieService,public userserivce:UserinfostorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const userInfoString = this.cookies.get('userInfo');

        try {
            const userInfo = JSON.parse(userInfoString);
            const authToken = userInfo.token;
      
            if (authToken) {
              const cloned = req.clone({
                headers: req.headers.set('Authorization', authToken)
              });
              
              return next.handle(cloned)
                .pipe(
                  catchError(error => {
                   const value = JSON.parse(userInfoString);
                    if (error.status === 401 && error.error.message === 'Token has expired') {
                      return this.userserivce.refreshToken({email:value.email,roleID:value.roleID})
                        .pipe(
                          switchMap((newToken:any )=> {
                            const refreshedReq = req.clone({
                              headers: req.headers.set('Authorization',newToken.accessToken)
                            });
                            return next.handle(refreshedReq);
                          })
                        );
                    }
                    throw error;
                  })
                );
            } else {
              return next.handle(req);
            }
          } catch (error) {
            console.error('Error parsing userInfo:', error);
            return next.handle(req);
          }
    }
}


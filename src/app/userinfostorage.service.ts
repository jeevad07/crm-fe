import { Injectable } from '@angular/core';
import { environment } from './environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserinfostorageService {

  constructor(public http:HttpClient,public toster:ToastrService,public router:Router,public cookies:CookieService) { }
  API_URL =environment.apiUrl;
  private userInformationsSubject ={};

  getUserInfo(data: any) {
     this.login(data).subscribe((data:any)=>{
        this.userInformationsSubject={
          token: data.token,
          name: data.userdetails_id.name,
          email: data.userdetails_id.email,
          roleID: data.userdetails_id.roleID,
          roledesignation: data.userdetails_id.roledesignation,
          companyID: data.userdetails_id.companyID,
          userID:data.userdetails_id.ID
        };
        this.cookies.set('userInfo', JSON.stringify(this.userInformationsSubject));
        this.toster.success("login successfully ");
        if(data.userdetails_id.roleID ==1)
        {
          this.router.navigate(['cadmin']);
        }
        else if(data.userdetails_id.roleID ==2){
          this.router.navigate(['users']);
        }else if(data.userdetails_id.roleID ==3){
          // this.router.navigate(['dashboard']);
          this.router.navigate(['/gadmin']);
        }
      },
      (err) => {
        console.log("err", err);
        this.toster.error(err.error.message);
      })
    }

  login(data:any)
  {
    return this.http.post(this.API_URL+'/global/login',data);
  }

  refreshToken(Data:any){
    const { email,roleID } = Data;
    
    let params = new HttpParams().set('email', email).set('roleID', roleID);

    return this.http.get(this.API_URL+'/global/refreshToken',{params});
  }

}

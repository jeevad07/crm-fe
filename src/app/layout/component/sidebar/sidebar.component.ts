import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
   roleID:any;
   role:any;
   name:any;
   isHighlighted_dash: boolean = true;
   isHighlighted_Cust: boolean = false;
  ngOnInit(): void {
    let userInfo:any = this.cookies.get('userInfo');
    userInfo = JSON.parse(userInfo);
    this.roleID=userInfo.roleID
    this.role=userInfo.roledesignation;
    this.name=userInfo.name
  }
 
  constructor(public cookies:CookieService,public router:Router){}
   
  logout(){
    this.cookies.delete('userInfo');
    this.router.navigate(['login'])
  }

  navigateTOcustomer(){
    this.isHighlighted_dash=false;
    this.isHighlighted_Cust=true;
    this.router.navigate(['customers']);
  }

  navigateTocadmin(){
   this.isHighlighted_dash=true;
    this.isHighlighted_Cust=false;
    this.router.navigate(['cadmin']);
  }
}

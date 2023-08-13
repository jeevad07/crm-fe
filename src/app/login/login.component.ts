import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserinfostorageService } from '../userinfostorage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public serivce: UserinfostorageService,public toster:ToastrService) { }

  email: any;
  password: any;


  loginDetails = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  })

  ngOnInit(): void {
  }

  logInuser() {
    if (this.loginDetails.invalid) {
      this.toster.error("Validations error"," please fill the required fields")
    }else{
      this.serivce.getUserInfo(this.loginDetails.value)
    }
  }


}

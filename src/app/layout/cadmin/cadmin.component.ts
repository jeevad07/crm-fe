import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cadmin',
  templateUrl: './cadmin.component.html',
  styleUrls: ['./cadmin.component.css']
})
export class CadminComponent {

  constructor(private modalService: NgbModal,public toster:ToastrService, public apiservice :ApiserviceService,config: NgbNavConfig,public cookies:CookieService){
    config.destroyOnHide = false;
    config.roles = false;
  }
  companyID:any;
  userList:any;
  editID:any;
  userID:any;
  role:any;
  name:any;
  ngOnInit(): void {
    let userInfo:any = this.cookies.get('userInfo');
    userInfo = JSON.parse(userInfo);
    this.role=userInfo.roledesignation;
    this.name=userInfo.name
    this.companyID=userInfo.companyID;
   this.getUserlist();
  }
  closeResult = '';
  newUsersDetails = new FormGroup({
  name: new FormControl("", [Validators.required]),
  email: new FormControl("", [Validators.required]),
  password: new FormControl("", [Validators.required])
})
  open(content:any,value:any) {
    this.newUsersDetails.patchValue({
      name: '',
      email: '',
      password: '',
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
      if(this.newUsersDetails.invalid)
      {
        this.toster.error("Validations error","please fill required fields")
      }else{
        if(value)
        {
          let updateQuery={
            name:this.newUsersDetails.value.name,
            email:this.newUsersDetails.value.email,
            password:this.newUsersDetails.value.password,
            id:this.editID,
            ID:this.userID
          }
          this.apiservice.updateUserlist(updateQuery).subscribe((data:any)=>{
            console.log(data)
            this.toster.success('Updated successfully')
            this.getUserlist();
          })
        }else{
          let updateQuery={
            name:this.newUsersDetails.value.name,
            email:this.newUsersDetails.value.email,
            password:this.newUsersDetails.value.password,
            companyID:this.companyID
          }
          this.apiservice.newUserlist(updateQuery).subscribe((data:any)=>{
            console.log("data",data);
            this.toster.success('Save successfully')
            this.getUserlist();
          })
        }
      }
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getUserlist(){
    this.apiservice.getuserlist(this.companyID).subscribe((data:any)=>{
      this.userList=data;
      console.log("userList",this.userList);
  })
  }
  editByIDRecords(users:any)
  {
    this.editID=users._id;
    this.userID=users.ID;
    this.apiservice.getuserByID(users._id).subscribe((data:any)=>{
      this.newUsersDetails.patchValue({
        name: data.name,
        email: data.email,
        password: '',
      });
    })
  }
  
  deleteByID(ID:any)
  {
    this.apiservice.DeleteuserByID(ID).subscribe((data:any)=>{
      this.toster.success('Deleted successfully');
      this.getUserlist();
    })
  }
}

import { Component } from '@angular/core';
import { UserinfostorageService } from 'src/app/userinfostorage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import { CookieService } from 'ngx-cookie-service';
import { NgbNavConfig, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-gadmin',
  templateUrl: './gadmin.component.html',
  styleUrls: ['./gadmin.component.css']
})
export class GadminComponent {
constructor(public service:UserinfostorageService,private modalService: NgbModal,public toster:ToastrService, public apiservice :ApiserviceService,config: NgbNavConfig,public cookies:CookieService){
  config.destroyOnHide = false;
  config.roles = false;
}
role:any;
name:any;
ngOnInit(): void {
  let userInfo:any = this.cookies.get('userInfo');
  userInfo = JSON.parse(userInfo);
  this.role=userInfo.roledesignation;
  this.name=userInfo.name
  this.getAdminDetails();
}
newAdminDetails = new FormGroup({
  name: new FormControl("", [Validators.required]),
  email: new FormControl("", [Validators.required]),
  password: new FormControl("", [Validators.required]),
  companyname: new FormControl("", [Validators.required]),
})
closeResult = '';
adminDetails:any;
page=4;
idEdit:any;
companyID:any

open(content:any,value:any) {
  this.newAdminDetails.patchValue({
    name: '',
    email: '',
    password: '',
    companyname:'',
  });
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
    if(this.newAdminDetails.invalid)
    {
      this.toster.error("Validations error","please fill required fields")
    }else{
      if(value)
      {
        let updateQuery={
          id:this.idEdit,
          name:this.newAdminDetails.value.name,
          email:this.newAdminDetails.value.email,
          password:this.newAdminDetails.value.password,
          companyname:this.newAdminDetails.value.companyname,
          companyid:this.companyID
        }
          this.apiservice.updateAdminDetailsByID(updateQuery).subscribe((data:any)=>{
          this.toster.success('Updated successfully')
          this.getAdminDetails();
          }) 
      }else{
        this.apiservice.newCompanyadmin(this.newAdminDetails.value).subscribe((data:any)=>{
          this.toster.success('Save successfully')
          this.getAdminDetails();
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

getAdminDetails(){
  this.apiservice.getDetailsAdmin().subscribe((data:any)=>{
    this.adminDetails=data;
  })
}

editByIDRecords(users:any){
  this.idEdit=users._id;
  this.companyID=users.companyID;
  this.apiservice.getAdminDetailsBYID(users._id).subscribe((data:any)=>{
    this.newAdminDetails.patchValue({
      name: data.name,
      email: data.email,
      password: '',
      companyname: data.companyname,
    });
  })
}
deleteByID(id:any){
  this.apiservice.deleteByID(id).subscribe((data:any)=>{
    this.toster.success("Deleted successfully ");
    this.getAdminDetails();
  })
}
}

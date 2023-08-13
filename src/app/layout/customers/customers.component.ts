import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {

  constructor(private modalService: NgbModal, public toster: ToastrService, public apiservice: ApiserviceService, public cookies: CookieService, config: NgbNavConfig) {
    config.destroyOnHide = false;
    config.roles = false;
  }
  role: any;
  name: any;
  assignUsername: any;
  assignID: any
  ngOnInit(): void {
    let userInfo: any = this.cookies.get('userInfo');
    userInfo = JSON.parse(userInfo);
    this.role = userInfo.roledesignation;
    this.name = userInfo.name
    this.companyID = userInfo.companyID;
    this.getCustomerList();
    this.getUserlist();
  }
  closeResult = '';
  companyID: any;
  customerList: any;
  isEditID: any;
  userList: any;
  newCustomerDetails = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
    Place: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    AssignUsername: new FormControl("", [Validators.required])
  })
  open(content: any, value: any) {
    this.newCustomerDetails.patchValue({
      name: '',
      email: '',
      status: '',
      Place: '',
      phoneNumber: ''
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (this.newCustomerDetails.invalid) {
          this.toster.error("Validations error", "please fill required fields")
        } else {
          if (value) {
            let updateQuery = {
              id: this.isEditID,
              name: this.newCustomerDetails.value.name,
              email: this.newCustomerDetails.value.email,
              status: this.newCustomerDetails.value.status,
              Place: this.newCustomerDetails.value.Place,
              phoneNumber: this.newCustomerDetails.value.phoneNumber,
              assignUsername:this.assignUsername,
              assignID:this.assignID
            }
            console.log("updateQuery ",updateQuery);
            this.apiservice.updateCustomerdetails(updateQuery).subscribe((data: any) => {
              console.log(data);
              this.toster.success('Updated successfully');
              this.getCustomerList();
            })
          } else {
            let updateQuery = {
              name: this.newCustomerDetails.value.name,
              email: this.newCustomerDetails.value.email,
              status: this.newCustomerDetails.value.status,
              Place: this.newCustomerDetails.value.Place,
              phoneNumber: this.newCustomerDetails.value.phoneNumber,
              companyID: this.companyID,
              assignUsername:this.assignUsername,
              assignID:this.assignID,
            }
            console.log("updateQuery ",updateQuery);
            this.apiservice.postNewcustomer(updateQuery).subscribe((data: any) => {
              console.log("data", data);
              this.toster.success('Save successfully')
              this.getCustomerList();
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

  getCustomerList() {
    this.apiservice.getCustomerList(this.companyID).subscribe((data: any) => {
      this.customerList = data;
      console.log(this.customerList);

    })
  }

  editByIDRecords(customers: any) {
    this.isEditID = customers._id;
    console.log(customers._id)
    this.apiservice.getCustomerDetails(customers._id).subscribe((data: any) => {
      console.log(data)
      this.newCustomerDetails.patchValue({
        name: data[0].name,
        email: data[0].email,
        status: data[0].status,
        Place: data[0].Place,
        AssignUsername:data[0].assignUsername,
        phoneNumber: data[0].phoneNumber
      })
    })
  }
  deleteByID(Id: any) {
    this.apiservice.deleteCustomerByID(Id).subscribe((data: any) => {
      console.log("d", data);
      this.toster.success("Deleted successfully");
      this.getCustomerList();
    })
  }
  getUserlist() {
    this.apiservice.getuserlist(this.companyID).subscribe((data: any) => {
      this.userList = data;
      console.log("userList", this.userList);
    })
  }
  assignUsers(staffdetails: any) {
    this.assignUsername = staffdetails.value;
    const filter = this.userList.filter((user:any) => user.name == staffdetails.value);
     this.assignID= filter[0].ID
    
  }
}

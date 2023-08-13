import { Injectable } from '@angular/core';
import { environment } from './environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(public http:HttpClient) { }
  API_URL=environment.apiUrl;
  
  newCompanyadmin(data:any)
  {
    return this.http.post(this.API_URL+'/company/registration',data)
  }

  getDetailsAdmin(){
    return this.http.get(this.API_URL+'/global/getcompanyadmin');
  }

  getAdminDetailsBYID(ID:any)
  {
    return this.http.get(this.API_URL+"/global/getById/"+ID)
  }

  updateAdminDetailsByID(data:any)
  {
    return this.http.put(this.API_URL+"/global/updateDetails",data)
  }

  deleteByID(id:any){
    return this.http.delete(this.API_URL+"/global/deleteByid/"+id);
  }

  newUserlist(data:any)
  {
    return this.http.post(this.API_URL+'/user/registrations',data);
  }

  getuserlist(Id:any){
    return this.http.get(this.API_URL+'/user/getlistByID/'+Id);
  }

  updateUserlist(details:any)
  {
    return this.http.put(this.API_URL+'/user/updateUsers',details);
  }
  getuserByID(Id:any){
    return this.http.get(this.API_URL+'/user/geteditByID/'+Id);
  }
  DeleteuserByID(Id:any){
    return this.http.delete(this.API_URL+'/user/deleteByid/'+Id);
  }
  postNewcustomer(data:any){
    return this.http.post(this.API_URL+'/company/newcustomer',data);
  }
  getCustomerList(Id:any){
    return this.http.get(this.API_URL+'/company/getcustomerByID/'+Id);
  }
  getCustomerForUsers(Id:any,data:any){
    const { userID } = data;
    let params = new HttpParams().set('userID', userID);
    return this.http.get(this.API_URL+'/company/getcustomerForUsers/'+Id,{params});
  }
  getCustomerDetails(Id:any){
    return this.http.get(this.API_URL+'/company/getdetailsbyID/'+Id);
  }
  updateCustomerdetails(data:any)
  {
    return this.http.put(this.API_URL+'/company/updatecustomer',data)
  }
  deleteCustomerByID(ID:any){
    return this.http.delete(this.API_URL+'/company/deletecustomer/'+ID)
  }

}

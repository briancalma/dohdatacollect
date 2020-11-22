import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, throwError, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { timeout } from 'rxjs/operators';


const inventoryserver = "http://10.0.0.38/inventoryapi/";


@Injectable({
  providedIn: 'root'
})
export class InventoryapiService {
myuser : any;

  constructor(private http: HttpClient,
  	) { 


       this.myuser=[{   
            usercnt: "",
            userid: "",
            userpass: "",
            regcode: "",
            provcode: "",
            citycode: "",
            bgycode: "",
            cfname: "",
            clname: "",
            UserLevelID: "",
            mobileno: "",
            telno: "",
            emailadd: "",
            ofc_code: "",
            postitle: ""
           }]
  }

authuser(user): Observable<Object> {
 console.log(user);
let response = this.http.post(inventoryserver +'v1/employees/auth',{
      userid: user.userid,
      userpass: user.userpass
    },{headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}}).pipe(timeout(1000));
//.pipe(timeout(1000));
console.log(response);
return forkJoin(response);
  }

getuserlevel(userlevelid): Observable<Object> {
let response = this.http.post(inventoryserver +'v1/employees/getuserlevel',{
      userlevelid: userlevelid
    },{headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}});
console.log(response);
return forkJoin(response);
  }

getinventoryrpt(filter): Observable<Object> {
let response = this.http.post(inventoryserver +'v1/inventory/inventorylist',{
	userid:  filter.userid,
	limit:  filter.limit,
},{headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}});
//.pipe(timeout(1000));
return forkJoin(response);
}

inventoryadd(data): Observable<Object> {
	console.log(data);
let response = this.http.post(inventoryserver +'v1/inventory/inventoryadd',{
userid: this.myuser.userid,
ms1: data.ms1,
ms2: data.ms2,
ms3: data.ms3,
ms4: data.ms4,
ms5: data.ms5,
ms6: data.ms6,
reportdate: data.reportdate,
addedby: this.myuser.userid,
addeddate: this.completedate(),
updatedby: this.myuser.userid,
updateddate: this.completedate()
},{headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}});
return forkJoin(response);
  }

inventoryedit(data): Observable<Object> {
	console.log(data.userid);
let response = this.http.post(inventoryserver +'v1/inventory/inventoryedit',{
userid: data.userid,
ms1: data.ms1,
ms2: data.ms2,
ms3: data.ms3,
ms4: data.ms4,
ms5: data.ms5,
ms6: data.ms6,
reportdate: data.reportdate,
updatedby: this.myuser.userid,
updateddate: this.completedate()
},{headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}});
return forkJoin(response);
  }


inventorydelete(data): Observable<Object> {
  console.log(data.userid);
let response = this.http.post(inventoryserver +'v1/inventory/inventorydelete',{
userid: data.userid,
reportdate: data.reportdate
},{headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}});
return forkJoin(response);
  }



 updateuser(user): Observable<Object> {
let response = this.http.post(inventoryserver +'v1/employees/update',{
      userid: user.userid,
      cfname: user.cfname,
      clname: user.clname,
      mobileno: user.mobileno,
      telno: user.telno,
      emailadd: user.emailadd,
      ofc_code: user.ofc_code,
      postitle: user.postitle,

    },{headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}});

return forkJoin(response);
  }




completedate()
 {
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var time= today.getTime();
var yyyy = today.getFullYear();

var day;
var month;
var currentdate;

if(dd<10) {
    day = '0'+dd
} 

if(mm<10) {
    month = '0'+mm
}

currentdate = yyyy + '-' + mm + '-' + dd + ' ' + this.currenttime();


//console.log(currentdate);
  return currentdate;
 }

currentdate()
 {
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var time= today.getTime();
var yyyy = today.getFullYear();

var day;
var month;
var currentdate;

if(dd<10) {
    day = '0'+dd;
} 
else{
    day = ''+dd;
}

if(mm<10) {
    month = '0'+mm;
}
else{
    month = ''+mm;
}

currentdate = yyyy + '-' + month + '-' + day;


console.log(currentdate);
  return currentdate;
 }

 currenttime()
 {
   var today = new Date();
   var time= today.getTime();
   var timetest;
   var hh:any=new Date().getHours();
   var mm:any=new Date().getMinutes();
   var ss:any=new Date().getSeconds();

    if(hh<10) {
        hh = '0'+hh
    } 

    if(mm<10) {
        mm = '0'+mm
    }

    if(ss<10) {
        ss = '0'+ss
    }

   timetest=hh+':'+mm+':'+ss;
  // console.log(timetest);
  // console.log(time);
   return timetest;  
 } 

}

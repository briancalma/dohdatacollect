import { Injectable } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { timeout } from 'rxjs/operators'; 


// const inventoryserver = "http://localhost/inventoryapi/";
 const inventoryserver = "http://10.0.0.38/inventoryapi/";

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private http: HttpClient,
  	) 
  { 

  }


regionlist(filter): Observable<Object> {
let response = this.http.post(inventoryserver +'v1/reference/regionlist',{
	searchtext:  filter.searchtext,
	limit:  filter.limit,
},{headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}});
//.pipe(timeout(1000));
return forkJoin(response);
}

regionadd(data): Observable<Object> {
	console.log(data);
let response = this.http.post(inventoryserver +'v1/reference/regionadd',{
regcode: data.regcode,
regname: data.regname,
regdesc: data.regdesc,
regpop: data.regpop,
userid: data.userid,
dateupdated: data.dateupdated,
status: data.status
},{headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}});
return forkJoin(response);
  }

regionedit(data): Observable<Object> {
	console.log(data.userid);
let response = this.http.post(inventoryserver +'v1/reference/regionedit',{
regcode: data.regcode,
regname: data.regname,
regdesc: data.regdesc,
regpop: data.regpop,
userid: data.userid,
dateupdated: data.dateupdated,
status: data.status
},{headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}});
return forkJoin(response);
  }


regiondelete(data): Observable<Object> {
  console.log(data.regcode);
let response = this.http.post(inventoryserver +'v1/reference/regiondelete',{
regcode: data.regcode
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

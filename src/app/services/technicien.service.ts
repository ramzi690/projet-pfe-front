import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TechnicienService {
  numtech:number=0;
  url : string='http://localhost:8000';

  constructor(private http: HttpClient) { }
  techniciens :any []=[];
  listtechniciens(){
    return this.http.get<any>(this.url+'/api/techniciens');
  }
  
  deletetech(id:any){
    return this.http.delete<any>(this.url+'/api/technicien/'+id);
  }
  updatetech(id:any, technicien:any){
    return this.http.put(this.url+'/api/technicien/'+id , technicien);
  }
  //listtechniciens(){
  //  return this.http.get<any>(this.url+'/api/techniciens');
 // }
 getbyid(id:any){
  return this.http.get(this.url+'api/technicien/'+id )
}
getbyplace(place:any){
  return this.http.get(this.url+'api/technicien/place'+place )
}
addedittech(technicien:any , selectedtechnicien:any, ){
  if(!selectedtechnicien){
  return this.http.post<any>(this.url+'/api/techniciens' , technicien);
  }else{
    return this.http.put(this.url+'/api/technicien/'+selectedtechnicien.id , technicien);
  }

}
addtechform(technicien:any){
 const headers=new HttpHeaders
  return this.http.post<any>(this.url+'/api/technicienform' , technicien,{headers:headers});

}



}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  gettechnicienwithemail(email:any){
    return this.http.get<any>(this.url+'/api/techniciens/'+email);
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
listtechniciensform(){
  return this.http.get<any>(this.url+'/api/techform');
}

pdflisttechnicienss(): Observable<Blob> {
  return this.http.get('http://localhost:8000/api/technicienopdf', {
    responseType: 'blob'
  });
}
getClientEmail(clientId: number): Observable<string> {
  return this.http.get<string>(`/api/getClientEmail/${clientId}`); // Adjust the URL as per your backend route
}
gettaches(id:any){
  return this.http.get<any>(this.url+'/api/tacheclient/'+id);
}
addtache( tache:any){
  return this.http.post<any>(this.url+'/api/taches',tache);
}
addedittache(tache:any , selectedtechnicien:any, ){
  if(!selectedtechnicien){
  return this.http.post<any>(this.url+'/api/taches' , tache);
  }else{
    return this.http.put(this.url+'/api/tache/'+selectedtechnicien.id , tache);
  }

}
updatetache(id:any, tache:any){
  return this.http.put<any>(this.url+'/api/tache/'+id,tache);
}
deletetache(id:any){
  return this.http.delete<any>(this.url+'/api/tache/'+id);
}
sendEmail(data: any,email:any,view:any) {
  return this.http.post<any>(this.url+'/api/sendemailrefu/'+email+'/'+view, data); // Adjust the URL as per your backend endpoint
}




getrendezvouss(){
  return this.http.get<any>(this.url+'/api/rendezvous');
}
getrendezvousbytech(id:any){
  return this.http.get<any>(this.url+'/api/getByTechnicienId/'+id);
}
addrendezvous( rendezvouss:any){
  return this.http.post<any>(this.url+'/api/rendezvouss',rendezvouss);
}

updaterendezvous(id:any, rendezvouss:any){
  return this.http.put<any>(this.url+'/api/rendezvousup/'+id,rendezvouss);
}
deleterendezvous(id:any){
  return this.http.delete<any>(this.url+'/api/rendezvousdel/'+id);
}
}


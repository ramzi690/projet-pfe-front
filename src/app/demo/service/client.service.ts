import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url : string='http://localhost:8000';
  numcommandes: number = 0;


 

  getNumCommandes(): number {
        console.log('+++++++++',sessionStorage.getItem('nCommande'))

    return this.numcommandes;

  }


  constructor(private http: HttpClient) { }
  techniciens :any []=[];
 //setNumCommandes(num: number): void {
   // this._numcommandes.next(num);
  //}

  listclients(){
    return this.http.get<any>(this.url+'/api/clientwithall');
  }
  deleteclient(id:any){
    return this.http.delete<any>(this.url+'/api/client/'+id);
  }
  /*updatetech(id:any, technicien:any){
    return this.http.put(this.url+'/api/technicien/'+id , technicien);
  }
  listtechniciens(){
    return this.http.get<any>(this.url+'/api/techniciens');
  }*/
 getbyid(id:any){
  return this.http.get(this.url+'api/client/'+id )
}
addclient(technicien:any ){
  
  return this.http.post<any>(this.url+'/api/clients' , technicien);
  

}
addaffectation(affectation:any ){
  
  return this.http.post<any>(this.url+'/api/affectationn' , affectation);
  

}
emailtechnicien(mail:any,data:any){
  return this.http.post<any>(this.url+'/api/sendemail/'+mail+'/technicien',data);
}
emailclient(mail:any,data:any){
  return this.http.post<any>(this.url+'/api/sendemail/'+mail+'/client/',data);
}
listart(){
  return this.http.get<any>(this.url+'/api/articles');
}
getArticlesForClient(id:any){
  return this.http.get(this.url+'/api/article/'+id )
}
getcommandebyid(id:any){
  return this.http.get(this.url+'/api/commane/'+id )
}
sendEmail(data: any) {
  return this.http.post<any>(this.url+'/api/article/email/send', data); // Adjust the URL as per your backend endpoint
}
pdflistclients(): Observable<Blob> {
  return this.http.get('http://localhost:8000/api/clientpdf', {
    responseType: 'blob'
  });
}



}

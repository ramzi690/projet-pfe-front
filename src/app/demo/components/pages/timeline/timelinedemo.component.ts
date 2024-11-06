import { Component, OnInit } from '@angular/core';
import { TechnicienService } from 'src/app/demo/service/technicien.service';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { Techf } from 'src/app/demo/api/techf';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './timelinedemo.component.html',
    styleUrls: ['./timelinedemo.scss'],
    providers: [
        ConfirmationService,
        MessageService
      ]
})
export class TimelineDemoComponent implements OnInit {
    techf:Techf[]=[]
    plandate:any
    affecteddate:any
    techform : FormGroup;
    displaymodel: boolean = false;
    selectedform:any =null;
    clientemail:any;
    technicienemail:any;
    clientname:any
    techniciennamee:any
    message1="affectation du date"
    message2="changement de date"



    constructor( private fb : FormBuilder , private messageservice:MessageService ,private technicienservice:TechnicienService) {
      this.techform = this.fb.group({
        start:["",Validators.required],
        end:["",Validators.required],
        photo:["",Validators.required],
        review:["",Validators.required],
        plan:["",Validators.required],
        client_id:["",Validators.required],
        technicien_id:["",Validators.required],

       
    
      })
     }
    techniciens : any;
    ngOnInit(): void {
      this.showtechniciens();
      
      
    }

    showModel(techf : Techf){
      
      this.displaymodel=true;
      this.selectedform = techf;  
      console.log('***', this.selectedform); // Log the selected form object
      
      this.techform.patchValue(this.selectedform)
      console.log('***', this.techform.value.plan)
      this.plandate=this.techform.value.plan
      console.log(this.plandate)
      }
    affecter(){

      console.log('**hggvjf*', this.formatDate(this.techform.value.plan))

      console.log('***', this.techform.value.plan)
      this.affecteddate=this.formatDate(this.techform.value.plan)
      console.log('affected',this.affecteddate)
      console.log('planed',this.plandate)
      if(this.affecteddate==this.plandate){
        this.snedemailtechacc(this.plandate,this.affecteddate)
      this.snedemailclientacc(this.plandate,this.affecteddate)
      }else{
      this.snedemailtechrefu(this.plandate,this.affecteddate)
      this.snedemailclientrefu(this.plandate,this.affecteddate)

    }}
    snedemailtechrefu(plandate:any,affecteddate:any){
 
      let obj = {
        subject : this.message2,
        technicienname: this.techniciennamee,
        clientname: this.clientname,
        olddate: affecteddate,
        newdate: plandate,
        
        
      };
      this.technicienservice.sendEmail(obj,this.technicienemail,"technicienrefu").subscribe(() => {
          console.log('Email sent to technicien:', this.technicienemail);
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'date assigned successfully!' });
          this.displaymodel=false
          
      });
    }
    snedemailtechacc(plandate:any,affecteddate:any){
 
      let obj = {
        subject : this.message1,
        technicienname: this.techniciennamee,
        clientname: this.clientname,
        olddate: affecteddate,
        newdate: plandate,
        
        
      };
      this.technicienservice.sendEmail(obj,this.technicienemail,"technicienacc").subscribe(() => {
          console.log('Email sent to technicien:', this.technicienemail);
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'date assigned successfully!' });
          this.displaymodel=false
          
      });
    }
    snedemailclientrefu(plandate:any,affecteddate:any){
 
      let obj = {
        subject : this.message2,
        technicienname: this.techniciennamee,
        clientname: this.clientname,
        olddate: affecteddate,
        newdate: plandate,
        
        
      };
      this.technicienservice.sendEmail(obj,this.clientemail,"clientrefu").subscribe(() => {
          console.log('Email sent to client:', this.technicienemail);
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'date assigned successfully!' });
          this.displaymodel=false
          
      });
    }
    snedemailclientacc(plandate:any,affecteddate:any){
 
      let obj = {
        subject : this.message1,
        technicienname: this.techniciennamee,
        clientname: this.clientname,
        olddate: affecteddate,
        newdate: plandate,
        
        
      };
      this.technicienservice.sendEmail(obj,this.clientemail,"clientacc").subscribe(() => {
          console.log('Email sent to client:', this.technicienemail);
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'date assigned successfully!' });
          this.displaymodel=false
          
      });
    }
  closeModel(){
    this.displaymodel = false;

  }
  showtechniciens() {
    this.technicienservice.listtechniciensform().subscribe(techniciens => {
        this.techniciens = techniciens;
        this.techniciens.forEach((technicien: { client: {
          name: any; email: any; 
}; technicien: {
  name: any; email: any; 
}; }) => {
            console.log('Client Email:', technicien.client.email);
            console.log('Client name:', technicien.client.name);
            this.clientemail=technicien.client.email
            this.clientname=technicien.client.name
            console.log('Technician Email:', technicien.technicien.email);
            console.log('Technician name:', technicien.technicien.name);

            this.technicienemail=technicien.technicien.email
            this.techniciennamee=technicien.technicien.name

          });
    }); 
}

    getPhotoUrl(photo: string): string {
      return `${this.technicienservice.url}/storage/${photo}`;
    }
    private formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because JavaScript months are zero-based
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
  }
    
  }
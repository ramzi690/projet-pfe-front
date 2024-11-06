import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../demo/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnicienService } from '../demo/service/technicien.service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  providers: [
    ConfirmationService,
    MessageService
  ]
})

export class RendezvousComponent implements OnInit {
  rendezvousform:FormGroup;
  rendezvous: any
  rendezvoustech: any

  numrendezvous:number=0;
  technicianRendezvous: any;
  constructor(private fb :FormBuilder ,private technicien:TechnicienService , private confirmationService: ConfirmationService , private messageservice:MessageService) {
    this.rendezvousform = this.fb.group({
      plan:["",Validators.required],
      raison:["",Validators.required],
      client_id:["",Validators.required],
      technicien_id:["",Validators.required]
    })


   }
   showUsers() {
    setTimeout(() => {
      if (localStorage.getItem('role') == 'admin') {
        this.rendezvous = this.technicien.getrendezvouss().subscribe(rendezvous => {
          this.rendezvous = rendezvous;
        });
      } else {
        const technicianId = localStorage.getItem('id');
       
          this.rendezvoustech = this.technicien.getrendezvousbytech(technicianId).subscribe(rendezvous => {
            this.rendezvous = rendezvous;
          });
        
      }
    }, 500);
  }
  
  ngOnInit(): void {
    this.showUsers()
    this.countrendezvous()
  }

countrendezvous(){
  this.rendezvous = this.technicien.getrendezvouss().subscribe(user => {
    this.rendezvous = user;
    this.numrendezvous = this.rendezvous.length;
    sessionStorage.setItem('numrendezvous', this.numrendezvous.toString());
    console.log(this.rendezvous);
});
}
}
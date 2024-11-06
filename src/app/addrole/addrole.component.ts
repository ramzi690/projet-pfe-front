import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../demo/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { users } from '../demo/api/user';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class AddroleComponent implements OnInit {

  @Output() clickaddedit : EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() clickclose : EventEmitter<boolean> = new EventEmitter<boolean>()

  displayaddeditmodel: boolean = false;
  selectedtechnicien:any =null;
  numusers:number=0;

 
  technicienform:FormGroup;
  roles: any[] = [];
  constructor(private fb :FormBuilder ,private userservice:UserService , private confirmationService: ConfirmationService , private messageservice:MessageService) { 
    this.technicienform = this.fb.group({
      name:["",Validators.required],
      email:["",Validators.required],
      role:["",Validators.required],
     
    })
  }
users : any;
  ngOnInit(): void {
    this.showusers();
  }
  showusers(){
     this.users= this.userservice.listusers().subscribe(user=>{
      this.users=user;
      this.numusers=this.users.length
      sessionStorage.setItem('numusers', this.numusers.toString())
      console.log(this.numusers)

     })
  }

  hideAddModel(isclosed : boolean){
    this.displayaddeditmodel=!isclosed;
  }
  closeModel(){
    this.technicienform.reset();
    
      this.displayaddeditmodel = false;
  
  }

  showeditModel(technicien : users){
    this.displayaddeditmodel=true;
    this.selectedtechnicien = technicien;
    this.technicienform.patchValue(this.selectedtechnicien)
    console.log(this.selectedtechnicien)
    this.roles = [
      { label: 'admin', value: 'admin' },
      { label: 'technicien', value: 'technicien' }
  ];

  }
  addRole() {
    // Create a new object with the form values
    const formData = {
      ...this.technicienform.value,
      role:this.technicienform.value.role // Wrap the role value in an object
    };

    this.userservice.updateuser( this.selectedtechnicien.id,formData).subscribe(
      (response: any) => {
        const isSuccess: boolean = response && response.success === true;
        this.clickaddedit.emit(isSuccess);
        this.closeModel();
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'role ajouté avec succès' });
      },
      error => {
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Erreur');
      }
    );
}




}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-requestpassword',
  templateUrl: './requestpassword.component.html',
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class RequestpasswordComponent implements OnInit {

  passwordreset:FormGroup
public error = null
    constructor(private fb: FormBuilder,
     private user:UserService,
     private messageservice:MessageService
    ) { 
        this.passwordreset = this.fb.group({
          email: ["", [Validators.required, Validators.email]], // Validator for email format
        });
    }

  ngOnInit(): void {
  }
  onSubmit() {
    this.user.sendPasswordResetLink(this.passwordreset.value).subscribe(
      data => {
        this.messageservice.add({severity: 'success', summary: 'success', detail: 'email send'});
        console.log(data);
        this.handleresponce(data); // Call handleresponce method here
      },
      error => {
        this.messageservice.add({severity: 'error', summary: 'Error', detail: error.error.error});
        this.handleresponce(error);
      }
    );
  }
  


handleresponce(data:any){
    this.passwordreset.reset();
  
}
}

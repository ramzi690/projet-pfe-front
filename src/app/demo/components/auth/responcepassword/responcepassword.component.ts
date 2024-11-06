import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TokenService } from 'src/app/demo/service/token.service';
import { UserService } from 'src/app/demo/service/user.service';


interface ErrorType {
  email?: string[];
  password?: string[];
  // Add other properties as needed
}
@Component({
  selector: 'app-responcepassword',
  templateUrl: './responcepassword.component.html',
  providers: [
    ConfirmationService,
    MessageService
  ]
})

export class ResponcepasswordComponent implements OnInit {

  changepassword:FormGroup
  public error : ErrorType = {};;
  
  constructor(private fb: FormBuilder,
     private user:UserService,
     private messageservice:MessageService,
     private route :ActivatedRoute,
     private token:TokenService,
     private router:Router
  ) { 
    this.changepassword = this.fb.group({
      email: ["", [Validators.required, Validators.email]], // Validator for email format
      password: ["", Validators.required],
      password_confirmation: ["", Validators.required],
      resetToken: ["", Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.changepassword.patchValue({
        resetToken: params['token']
      });
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.user.changepassword(this.changepassword.value).subscribe(
      data => {
        this.messageservice.add({severity: 'success', summary: 'success', detail: 'password reset'});
        console.log(data);
        this.handleresponce(data); // Call handleresponce method here
      },
      error => {
        this.messageservice.add({severity: 'error', summary: 'Error', detail: "invalid data"});
      
        this.handleerror(error);
      }
    );
  }
  handleresponce(data:any){
    this.router.navigateByUrl('/auth/login')
    this.changepassword.reset();
}
  handleerror(error: any) {
    this.error = error.error.errors as ErrorType;


  }
}

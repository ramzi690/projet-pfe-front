import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { UserService } from 'src/app/demo/service/user.service';
import { TokenService } from 'src/app/demo/service/token.service';
import { Router } from '@angular/router';

interface ErrorType {
  name?: string[];
  email?: string[];
  password?: string[];
  // Add other properties as needed
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  public error: ErrorType = {}; // Define the type of error object

  constructor(
    private user: UserService,
    private fb: FormBuilder,
    private messageservice: MessageService,
    private token:TokenService,
    private router:Router
  ) {
    this.signupform = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]], // Validator for email format
      password: ["", Validators.required],
      password_confirmation: ["", Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signupform);

    this.user.signup(this.signupform.value).subscribe(
      data => this.handleresponce(data),
      error => this.handleerror(error)
    );
  }
  handleresponce(data:any){
    this.router.navigateByUrl('/auth/login')
}
  handleerror(error: any) {
    this.error = error.error.errors as ErrorType; // Cast error object to ErrorType
  }
}

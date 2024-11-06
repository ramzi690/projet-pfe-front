import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { UserService } from 'src/app/demo/service/user.service';
import { TokenService } from 'src/app/demo/service/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';
import { TechnicienService } from 'src/app/demo/service/technicien.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],providers: [
        ConfirmationService, // Make sure to include only the necessary services
        MessageService
      ]
})
export class LoginComponent {

  loginform:FormGroup
public error = null
    constructor(private user:UserService,
        private fb: FormBuilder,
         private messageservice: MessageService,
         private token:TokenService,
         private router:Router,
         private Auth:AuthService,
         private techservice:TechnicienService,
         ) { 
        this.loginform = this.fb.group({
            email: ["", [Validators.required, Validators.email]], // Validator for email format
            password: ["", Validators.required]
          });
    }

onSubmit(){
console.log(this.loginform)

 this.user.login(this.loginform.value).subscribe(
    data=>this.handleresponce(data),
    error=>this.handleerror(error)

)
}
handleerror(error:any){
this.error=error.error.error;
}
handleresponce(data: any) {
    this.token.handle(data.access_token);
    this.Auth.changeauthstatus(true);
    this.techservice.gettechnicienwithemail(this.loginform.value.email).subscribe(
        (technician: any) => {
            const technicianId = technician.id;
            console.log('Technician ID:', technicianId);
            localStorage.setItem('id',technicianId)
        },
        error => console.log(error)
    );
    this.user.getrole(this.loginform.value.email).subscribe(
        (technician: any) => {
            const technicianrole = technician.role;
            console.log('Technician role:', technicianrole);
            localStorage.setItem('role',technicianrole)
            
            
        },
        error => console.log(error)
    );

    this.router.navigateByUrl('/uikit/list');
}
}

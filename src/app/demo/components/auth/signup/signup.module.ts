import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { signupRoutingModule } from './signup-routing.module';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    signupRoutingModule,ButtonModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,PasswordModule,InputTextModule

  ]
})
export class SignupModule { }

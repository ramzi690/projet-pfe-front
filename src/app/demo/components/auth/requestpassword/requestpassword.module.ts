import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestpasswordComponent } from './requestpassword.component';
import { requestpasswordRoutinModule } from './requestpassword-routin.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [RequestpasswordComponent],
  imports: [
    CommonModule,
    requestpasswordRoutinModule, ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,ReactiveFormsModule,ToastModule
  ]
})
export class RequestpasswordModule { }

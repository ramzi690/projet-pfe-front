import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponcepasswordComponent } from './responcepassword.component';
import { ResponcepasswordRoutingModule } from './responcepassword-routing.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [ResponcepasswordComponent],
  imports: [
    CommonModule,ResponcepasswordRoutingModule,ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,ReactiveFormsModule,ToastModule
  ]
})
export class ResponcepasswordModule { }

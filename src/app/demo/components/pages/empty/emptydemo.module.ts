import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from "primeng/calendar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ToastModule } from 'primeng/toast';


@NgModule({
    imports: [
        CommonModule,
        InputTextareaModule,
        EmptyDemoRoutingModule,ToastModule,ReactiveFormsModule,CalendarModule
    ],
    declarations: [EmptyDemoComponent]
})
export class EmptyDemoModule { }

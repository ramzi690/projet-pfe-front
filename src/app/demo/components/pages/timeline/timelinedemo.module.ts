import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineDemoRoutingModule } from './timelinedemo-routing.module';
import { TimelineDemoComponent } from './timelinedemo.component';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from "primeng/calendar";




@NgModule({
    imports: [
        MultiSelectModule, RippleModule,InputTextModule,ToggleButtonModule,
        CommonModule,
        TimelineModule,
        ButtonModule,
        CardModule,
        TimelineDemoRoutingModule,TableModule,ToastModule,
        DialogModule, FormsModule, ReactiveFormsModule ,CalendarModule
    ],
    declarations: [TimelineDemoComponent]
})
export class TimelineDemoModule { }

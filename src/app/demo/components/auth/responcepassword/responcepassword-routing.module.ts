import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResponcepasswordComponent } from './responcepassword.component'; 

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ResponcepasswordComponent }
    ])],
    exports: [RouterModule]
})
export class ResponcepasswordRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestpasswordComponent } from './requestpassword.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RequestpasswordComponent }
    ])],
    exports: [RouterModule]
})
export class requestpasswordRoutinModule { }

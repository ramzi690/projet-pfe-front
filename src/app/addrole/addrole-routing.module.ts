import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddroleComponent } from './addrole.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AddroleComponent }
    ])],
    exports: [RouterModule]
})
export class addroleRoutingModule { }

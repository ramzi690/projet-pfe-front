import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RendezvousComponent } from './rendezvous.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RendezvousComponent }
    ])],
    exports: [RouterModule]
})
export class rendezvousRoutingModule { }

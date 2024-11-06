import { NgModule } from '@angular/core' ;
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HttpClientModule } from '@angular/common/http'; 
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TableDemoComponent } from './demo/components/uikit/table/tabledemo.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { UserService } from './demo/service/user.service';
import { AddroleComponent } from './addrole/addrole.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,TableModule,DialogModule,DropdownModule,ToastModule,ButtonModule,ReactiveFormsModule,ConfirmDialogModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
       
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

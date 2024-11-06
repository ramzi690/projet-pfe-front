import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { OnInit } from '@angular/core';
import { AuthService } from '../demo/service/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../demo/service/token.service';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{
    public loggedIn!: boolean;
    public admin: boolean=false;

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
         private router:Router,
          private Auth:AuthService,
        private Token :TokenService) { }

    ngOnInit(){
        setTimeout(() => {
        this.Auth.authstatus.subscribe(value => {
            this.loggedIn = value;
            console.log('loggedIn:', this.loggedIn); // Add this line to check the value
        });

        if (localStorage.getItem('role')==='admin'){
            this.admin=true
        }
        console.log( "admin",this.admin)
    }, 500);

    }
    logout(event:MouseEvent){
        event.preventDefault()
        this.Token.remove()
        localStorage.removeItem('id')
        localStorage.removeItem('role')
        this.Auth.changeauthstatus(false)
    this.router.navigateByUrl('/landing')
    }
    
    
}

import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/service/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    role : any;
  

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {

        this.role = localStorage.getItem('Role')
        

        setTimeout(() => {


        this.model = [
            {
                label: 'Accueil',
                items: [
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/'], visible: localStorage.getItem('role') === 'admin' 
                }
                ]
            },
            {
                label: 'Composants UI',
                items: [
                   
                    { label: 'Clients', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] 
                        ,                        visible: localStorage.getItem('role') === 'admin' 

                    },
                    { label: 'Utilisateurs', icon: 'pi pi-fw pi-table', routerLink: ['/addrole'],
                     visible: localStorage.getItem('role') === 'admin' 

                    },
                    { label: 'Rendes-vous', icon: 'pi pi-fw pi-table', routerLink: ['/rendez-vous']

                    },
                    { label: 'Tâches', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] ,
                    visible: localStorage.getItem('role') === 'technicien' 

                    },
                    
                ]
            },
           
           
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                 
                  
                    {
                        label: 'Techniciens',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud'], 
                        visible: localStorage.getItem('role') === 'admin' 
                    },
                    {
                        label: 'Liste des formulaires techniciens',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline'],
                        visible: localStorage.getItem('role') === 'admin' 

                    },
                  
                    {
                        label: 'Formulaire technicien',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty'],
                        visible: localStorage.getItem('role') === 'technicien' 

                    },
                    
                ]
            },
           
          
        ];
    }, 1000);

    }

}

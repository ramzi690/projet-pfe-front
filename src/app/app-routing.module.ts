import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { BeforeLoginService } from './demo/service/before-login.service';
import { AfterLoginService } from './demo/service/after-login.service';
import { AuthGuard } from './auth.guard';
import { AddroleModule } from './addrole/addrole.module';








@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AfterLoginService,AuthGuard] },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UikitModule),canActivate:[AfterLoginService] },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule),canActivate:[AfterLoginService] },
                    { path: 'addrole', loadChildren: () => import('C:/Users/USER/Downloads/sakai-ng-14.0.2/sakai-ng-14.0.2/src/app/addrole/addrole.module').then(m => m.AddroleModule),canActivate:[AfterLoginService,AuthGuard]  },
                    { path: 'rendez-vous', loadChildren: () => import('C:/Users/USER/Downloads/sakai-ng-14.0.2/sakai-ng-14.0.2/src/app/rendezvous/rendezvous.module').then(m => m.RendezvousModule),canActivate:[AfterLoginService]  },

                ],
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
        
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule),canActivate:[BeforeLoginService] },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

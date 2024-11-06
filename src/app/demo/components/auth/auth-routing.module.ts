import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BeforeLoginService } from '../../service/before-login.service';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),canActivate:[BeforeLoginService] },
        { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule),canActivate:[BeforeLoginService] },
        { path: 'requestpassword', loadChildren: () => import('./requestpassword/requestpassword.module').then(m => m.RequestpasswordModule),canActivate:[BeforeLoginService]},
        { path: 'responcepassword', loadChildren: () => import('./responcepassword/responcepassword.module').then(m => m.ResponcepasswordModule),canActivate:[BeforeLoginService] }

    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

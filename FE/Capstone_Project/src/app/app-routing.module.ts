import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { HomeComponent } from './components/home/home.component';
import { SingupConcessionarioComponent } from './components/singup-concessionario/singup-concessionario.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AddAnnuncioComponent } from './components/add-annuncio/add-annuncio.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registerUtente',
        component: SingupComponent
    },
    {
        path: 'registerConcessionario',
        component: SingupConcessionarioComponent
    },
    {
        path: 'userDashboard',
        component: UserDashboardComponent
    },
    {
        path: 'addAnnuncio',
        component: AddAnnuncioComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

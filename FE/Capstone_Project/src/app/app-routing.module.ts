import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { HomeComponent } from './components/home/home.component';
import { SingupConcessionarioComponent } from './components/singup-concessionario/singup-concessionario.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AddAnnuncioComponent } from './components/add-annuncio/add-annuncio.component';
import { ConcessionarioDashboardComponent } from './components/concessionario-dashboard/concessionario-dashboard.component';
import { DettagliPostComponent } from './components/dettagli-post/dettagli-post.component';
import { ModificaUtenteOConcessionarioComponent } from './components/modifica-utente-oconcessionario/modifica-utente-oconcessionario.component';
import { PreferitiComponent } from './components/preferiti/preferiti.component';
import { ModificaPostComponent } from './components/modifica-post/modifica-post.component';

import { AuthGuard } from './auth/auth.guard';

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
        component: UserDashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'concessionarioDashboard',
        component: ConcessionarioDashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'addAnnuncio',
        component: AddAnnuncioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dettagliPost/:id',
        component: DettagliPostComponent
    },
    {
        path: 'editProfile',
        component: ModificaUtenteOConcessionarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'preferiti',
        component: PreferitiComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'modifica-post/:id',
        component: ModificaPostComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

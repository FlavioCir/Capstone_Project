import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TokenInterceptor } from './auth/token.interceptor';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { SingupConcessionarioComponent } from './components/singup-concessionario/singup-concessionario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AddAnnuncioComponent } from './components/add-annuncio/add-annuncio.component';
import { ConcessionarioDashboardComponent } from './components/concessionario-dashboard/concessionario-dashboard.component';
import { DettagliPostComponent } from './components/dettagli-post/dettagli-post.component';
import { ModificaUtenteOConcessionarioComponent } from './components/modifica-utente-oconcessionario/modifica-utente-oconcessionario.component';
import { PreferitiComponent } from './components/preferiti/preferiti.component';

import { NgToastModule } from 'ng-angular-popup';
import { ModificaPostComponent } from './components/modifica-post/modifica-post.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SingupComponent,
        SingupConcessionarioComponent,
        NavbarComponent,
        UserDashboardComponent,
        AddAnnuncioComponent,
        ConcessionarioDashboardComponent,
        DettagliPostComponent,
        ModificaUtenteOConcessionarioComponent,
        PreferitiComponent,
        ModificaPostComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        NgxDropzoneModule,
        NgToastModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

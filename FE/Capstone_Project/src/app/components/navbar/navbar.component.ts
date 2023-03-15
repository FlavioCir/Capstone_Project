import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    nome: string | undefined;
    cognome: string | undefined;
    ragioneSociale: string | undefined;

    constructor(private router: Router, private storagesrv: StorageService) { }

    ngOnInit(): void {
        if (this.storagesrv.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storagesrv.getUser().roles;
            this.getUser();
            this.getAdmin();
        }
    }

    getUser(): void {
        const user = this.storagesrv.getUser();
        if(user && user.id) {
            this.nome = user.nome;
            this.cognome = user.cognome;
        }
    }

    getAdmin(): void {
        const user = this.storagesrv.getUser();
        if(user && user.id) {
            this.ragioneSociale = user.ragioneSociale;
        }
    }

    isAdmin(): boolean {
        return this.storagesrv.isAdmin();
    }

    logout(): void {
        window.sessionStorage.removeItem('auth-user');
        this.isLoggedIn = false;
        this.router.navigate(['/']);

    }

}

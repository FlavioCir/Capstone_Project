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

    constructor(private router: Router, private storagesrv: StorageService) { }

    ngOnInit(): void {
        if (this.storagesrv.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storagesrv.getUser().roles;
        }
    }

    getUserById(): void {

    }

    logout(): void {
        window.sessionStorage.removeItem('auth-user');
        this.isLoggedIn = false;
        this.router.navigate(['/']);

    }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageService } from 'src/app/auth/storage.service';

import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage: string | undefined;
    roles: string[] = [];

    constructor(private usrsrv: AuthService, private router: Router, private storageService: StorageService, private toast: NgToastService) { }

    ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
        }
    }

    async onsubmit(form: NgForm) {
        try {
            await this.usrsrv.login(form.value).subscribe({
                next: data => {
                    this.storageService.saveUser(data);
                    this.isLoginFailed = false;
                    this.isLoggedIn = true;
                    this.roles = this.storageService.getUser().roles;
                    this.toast.success({detail: "Login effettuato!", summary: "Benvenuto/a !", duration: 5000});
                    this.router.navigate(['/']);
                },
                error: err => {
                    this.toast.error({detail: "Errore durante il login", summary: "Username o password errati!", duration: 5000});
                    console.log(err);
                }
            })
        } catch(error) {
            console.error(error);
        }
    }

}

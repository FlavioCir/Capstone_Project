import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private router: Router) { }

    clear(): void {
        window.sessionStorage.clear();
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getToken(): any {
        const authUser: any = window.sessionStorage.getItem(USER_KEY);
        const parseAuthUser = JSON.parse(authUser);
        if (parseAuthUser) {
            return parseAuthUser.token;
        }

        return {};
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }

    public isLoggedIn(): boolean {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return true;
        }

        return false;
        // return this.router.createUrlTree(['/login']);
    }

    public isLogged_In() {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return true;
        }

        return this.router.createUrlTree(['/login']);
    }

    public isAdmin(): boolean {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user && JSON.parse(user).roles.includes('ROLE_ADMIN')) {
            return true;
        }
        return false;
    }

}

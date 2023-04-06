import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-singup',
    templateUrl: './singup.component.html',
    styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

    constructor(private asrv: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    // Funzione per la registrazione di un utente
    async onsubmit(form: NgForm) {
        try {
            await this.asrv.registerUser(form.value).subscribe({
                next: data => {
                    console.log(data);
                    this.router.navigate(['/login']);
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

}

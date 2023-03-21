import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-singup-concessionario',
    templateUrl: './singup-concessionario.component.html',
    styleUrls: ['./singup-concessionario.component.scss']
})
export class SingupConcessionarioComponent implements OnInit {

    constructor(private asrv: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    async onsubmit(form: NgForm) {
        try {
            await this.asrv.registerConcessionario(form.value).subscribe({
                next: data => {
                    console.log(data);
                    this.router.navigate(['/login'])
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

}

import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Capstone_Project';

    ngOnInit(): void {
        let consentStatus = localStorage.getItem('cookie-consent');

        if (consentStatus === null) {
            // Se il valore non è stato ancora impostato, salva la scelta dell'utente
            let cc = window as any;
            cc.cookieconsent.initialise({
                "cookie": {
                    "domain": "http://localhost:4200"
                },
                "position": "bottom-right",
                "theme": "classic",
                "palette": {
                    "popup": {
                        "background": "#272727",
                        "text": "#ffffff",
                        "link": "#7b7b7b"
                    },
                    "button": {
                        "background": "#ff0000",
                        "text": "#ffffff",
                        "border": "transparent"
                    }
                },
                "type": "info",
                "content": {
                    "message": "Utilizziamo i cookie per ottimizzare la funzionalità del sito Web e offrirti la migliore esperienza.",
                    "dismiss": "Accetta cookie",
                    "deny": "Refuse cookies",
                    "link": "Scopri di più",
                    "href": "http://localhost:4200/cookie",
                    "policy": "Cookie Policy"
                },
                onStatusChange: function (status: string) {
                    localStorage.setItem('cookie-consent', status);
                    consentStatus = status;
                }
            });

            // Aggiungi la regola CSS per rimuovere l'underline del link "Ho capito"
            let style = document.createElement('style');
            style.innerHTML = '.cc-window .cc-dismiss a { text-decoration: none; }';
            document.head.appendChild(style);
        } else {
            // Se il valore è stato già impostato, non fare nulla
        }
    }

}

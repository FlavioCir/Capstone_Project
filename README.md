# Capstone_Project

# Nome del progetto: RideResale

Per la creazione di questo progetto, ho preso ispirazione dalla mia più grande passione, ### Le moto 🏍
La mia applicazione da la possibilita ai concessionari di mettere in vendita le moto che posseggono.

<hr>

## Funzionamento

Nello specifico la mia applicazione è sviluppata su tre livelli:

- IL CONCESSIONARIO:
  ha la possibilità di visualizzare gli annunci di tutti
  fare dei filtri su quest'ultimi
  ma ha anche la possibilità di:
  - aggiungere l'annuncio,
  - eliminare l'annuncio,
  - modificare l'annuncio
  
- L'UTENTE:
  ha la possibilità di visualizzare gli annnunci
  fare filtri su questi ultimi
  e inserire gli annunci che più gli piacciono nella lista dei preferiti
  
- IL PUBBLICO:
  possono vedere tutti i post, e come gli altri possono vedere tutti gli annunci, compresi i dettagli
  ma hanno una limitazione, cioè che se non sono loggati non possono inserire gli annunci nella loro lista dei preferiti
  
I filtri che si possono fare sono per:
- MARCA
- MODELLO
- ANNO D'IMMATRICOLAZIONE
- KILOMETRI
- PREZZO

<hr>

## Tecnologie usate

La mia applicazione ha un'architettura full-stak:
- Utilizzando ANGULAR per il Front-End
- JAVA o più nello specifico SPRING-BOOT per il Back-End
- E come data-base appoggiandomi a PostgreSQL

<hr>

## Obiettivo

L'obiettivo per il quale ho sviluppato questa applicazione, è per rendere la vendita delle moto più semplice, dinamica e perchè no divertente.
Mettendo davanti agli occhi dell'utente una applicazione con un design accattivante e funzionalità all'apparenza banali, ma coincise per l'utilizzo.

<hr>

## Per avviare l'applicazione

Per aprire il mio progetto bisogna seguire questi passaggi:
<ul>
  <li>Scaricare il progetto</li>
  <li>Aprire i file, BE e FE</li>
  <li>Crearti un database in locale, ed inserire tutte le direttive del file application.properties del BE</li>
  <li>Aprire il main del BE e scommentare il popolaDb() e runnare l'applicazione</li>
  <li>Criptare la password degli utenti creati con il popolaDb() usando Postman</li>
  <li>Avviare anche il progetto Angular (ng serve) o (ng serve -o) per farlo aprire automaticamente nel browser</li>
</ul>

Ora puoi divertirti con le funzionalità offerte dalla mia applicazione!

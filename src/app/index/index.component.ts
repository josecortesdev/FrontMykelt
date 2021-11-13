import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { parse } from 'querystring';

// Para recibir parámetros. Para el OAuth.
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  nombreUsuario: string; // vacío
  userEmail: string;

  userName: string;

  tokenoauth: string;

  mitoken: string;

  constructor(private tokenService: TokenService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    if (this.tokenService.isLogged()) {
      this.tokenService.timeToken();
    }

    this.activatedRoute.queryParams.subscribe(params => {

      if (params['token']) {

        this.tokenoauth = params.token;

        window.localStorage.role = 0;

        // Creamos una variable tipo objeto que contiene valor y fecha actual con la hora
        // var object = {value: this.tokenoauth, timestamp: new Date().getTime()}
        // Lo añadimos al localstorage, nombre key, con json stringify
        // este método convierte un objeto javascript en una cadena de texto JSON
        // this.tokenService.setToken(JSON.stringify(object));

        var time = new Date().getTime().toString();

        this.tokenService.setToken(this.tokenoauth);
        this.tokenService.setHour(time);

        window.localStorage.userName = params.name;
        window.localStorage.UserEmail = params.email;

        this.userName = window.localStorage.userName;

        this.userEmail = window.localStorage.UserEmail;

      } else {

        if (this.tokenService.isLogged()) {
          this.infoUser();
        }
      }

    })

    this.nombreUsuario = this.tokenService.getUserName();

  }

  infoUser() {

    if (this.tokenService.isLogged) {

      this.mitoken = this.tokenService.getToken();

      const payload = this.mitoken.split('.')[1];
      //split convierte un array a partir de un caracter, le ponemos posición 1 para acceder al payload
      const payloadDecoded = atob(payload);

      const values = JSON.parse(payloadDecoded); // parseamos a JSON

      const username = values.sub;

      this.userEmail = window.localStorage.UserEmail;
      this.userName = window.localStorage.UserName;

    }
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


const TOKEN_KEY = 'AuthToken';  // de clave
const HOUR = 'Hour';  // de clave
const ROL = 'Rol'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  //Creamos un array con los roles

  roles: Array<string> = [];

  constructor(
    private router: Router


  ) { }

  public isAdmin(): boolean{
    // if(window.localStorage.role = true){
    //   return true;
    // }
    // return false;


    if(localStorage.getItem(ROL) == 'admin'){
      return true;
    }
    return false;

  }

  public setRole(rol: boolean): void{

    if(rol){
      window.localStorage.setItem(ROL, 'admin');
    }else{
      window.localStorage.setItem(ROL, 'user');
    }


  }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);

    window.localStorage.setItem(TOKEN_KEY, token); // token key y el token que le estamos pasando como parámetro
  }

  public setHour(hour: string): void {
    window.localStorage.removeItem(HOUR);

    window.localStorage.setItem(HOUR, hour); // token key y el token que le estamos pasando como parámetro
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getHour(): string {
    return localStorage.getItem(HOUR);
  }

  public isLogged(): boolean {

    if (this.getToken()) {
      return true;
    }

    return false;
  }

  public timeToken(): void {


    var hour = this.getHour()
    var hourNumber = Number(hour)


    var now = new Date().getTime().toString();
    var nowNumber = Number(now)

    var ONE_HOUR = 60 * 60 * 1000;

    var diference = nowNumber - hourNumber

    if (diference > ONE_HOUR) {
      window.localStorage.clear();
    }
  }




  public getUserName(): string {
    if (!this.isLogged()) {
      return null;
      // return 'manolo'
    }
    // el token tiene un aspecto similar a este: dijsdnfdjinf.fasidjnffi.fisjdfnsdif 
    // se compone de: header, payload y firma
    // ahora nos interesa el payload
    // Para sacarlo, lo primero que hacemos es convertir la cadena en un array de cadenas

    const token = this.getToken();
    const payload = token.split('.')[1];
    //split convierte un array a partir de un caracter, le ponemos posición 1 para acceder al payload
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded); // parseamos a JSON

    const username = values.sub;
    return username;
  }

  // public isAdmin(): boolean {
  //   if (!this.isLogged()) {
  //     return false;
  //   }


  //   if (window.localStorage.role == true) {
  //     return true;
  //   }
  //   return false;

  // }

  //Para cerrar sesión
  public logOut(): void {
    window.localStorage.clear(); // Va a limpiar todo lo que tengamos en el localstorage
    this.router.navigate(['/login']); // Vamos a inicio
  }
}

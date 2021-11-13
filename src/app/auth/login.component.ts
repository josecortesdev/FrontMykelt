import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginUsuario: LoginUsuario; // loginusuario, que es un objeto de la clase login-usuario.ts

  cargandoLogin: boolean = false;

  //dos campos, nombre y password, los valores que les pasa al loginusuario
  email: string;
  password: string;
  errMsj: string;  // creada para usarla en el mensaje de error

  heroku: string = environment.herokuURL;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Iniciar sesión | MYKELT');
  }

  // Método para hacer el login
  onLogin(): void {

    this.cargandoLogin = true;

    //inicializamos el loginusuario y le pasamos el usuario y el password
    this.loginUsuario = new LoginUsuario(this.email, this.password);

    window.localStorage.UserEmail = this.email;

    //Vamos a enviarlo al authservice
    this.authService.login(this.loginUsuario).subscribe(
      data => { // hacemos un callback

        // Creamos una variable tipo objeto que contiene valor y fecha actual con la hora
        // var object = {value: data.token, timestamp: new Date().getTime()}
        // Lo añadimos al localstorage, nombre key, con json stringify
        // este método convierte un objeto javascript en una cadena de texto JSON
        // this.tokenService.setToken(JSON.stringify(object));

        var time = new Date().getTime().toString();

        this.tokenService.setToken(data.token);
        this.tokenService.setHour(time);


        window.localStorage.UserName = data.name;

        // window.localStorage.role = data.role;
        // if(data.role == true){
        //   window.localStorage.role = data.role;
        // }
        this.tokenService.setRole(data.role);


        this.router.navigate(['/']);  // lo mandamos al index

        this.cargandoLogin = false;
      },
      err => { // en caso de error
        this.errMsj = err.error.message;  // variable que habíamos creado para el error, saldrá el mensaje del backend
        this.toastr.error(this.errMsj, 'Error', {
          timeOut: 3000
        });

        this.cargandoLogin = false;

      }
    );
  }


}

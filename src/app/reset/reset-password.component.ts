import { Email } from './../models/email';
import { ResetService } from './../service/reset.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string;
  errMsj: string; 
  EmailReset: Email;

  constructor(
    private tokenService: TokenService,
    private resetService: ResetService,
    private router: Router,
    private toastr: ToastrService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Restablecer contraseña | MYKELT');

    window.scrollTo(0, 0);
    
  }

  restore(){

    this.EmailReset = new Email(this.email);

    this.resetService.email(this.EmailReset).subscribe(
      data=> {

        this.toastr.success('Correo electrónico enviado', '', {
          timeOut: 3000
        });
       

      }, err=>{

        this.errMsj = err.error.message;  // variable que habíamos creado para el error, saldrá el mensaje del backend
        this.toastr.error(this.errMsj, 'Error', {
          timeOut: 3000
        });

      });


  }

}

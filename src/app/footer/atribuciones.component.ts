import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atribuciones',
  templateUrl: './atribuciones.component.html',
  styleUrls: ['./atribuciones.component.css']
})
export class AtribucionesComponent implements OnInit {

  constructor(
    private titleService: Title, 
    public router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Atribuciones | MYKELT');
  }

}

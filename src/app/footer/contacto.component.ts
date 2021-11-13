import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(
    private titleService: Title, 
    public router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Contacto | MYKELT');
  }

}

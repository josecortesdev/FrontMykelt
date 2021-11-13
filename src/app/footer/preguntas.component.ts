import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  constructor(
    private titleService: Title, 
    public router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Preguntas | MYKELT');
    
    window.scrollTo(0, 0);
  }

}

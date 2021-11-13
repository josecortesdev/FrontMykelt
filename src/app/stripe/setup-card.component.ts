import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-setup-card',
  templateUrl: './setup-card.component.html',
  styleUrls: ['./setup-card.component.css']
})
export class SetupCardComponent implements OnInit {

  constructor(private productoService: ProductoService,
  ) { }

  ngOnInit(): void {

    this.productoService.card().subscribe(
      data => {

      },
      err => {

      }
    );

  }



}

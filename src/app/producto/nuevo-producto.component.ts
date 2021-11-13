import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  name = '';
  price: number = null;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router,
    private titleService: Title
  ) {

  }

  ngOnInit() {
    this.titleService.setTitle('Nuevo producto | MYKELT');
  }

  //Crear uno nuevo
  onCreate(): void {

    const producto = new Producto(this.name, this.price);
    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Producto creado', '', {
          timeOut: 3000
        });
        this.router.navigate(['/lista']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });

      }
    );
  }

}

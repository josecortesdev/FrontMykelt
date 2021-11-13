import { CartService } from './../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';

import { IndexComponent } from '../index/index.component';
import { Sinid } from '../models/sinid';

import { DecimalPipe } from '@angular/common'; // para decimal pipe
import { Cart } from '../models/cart';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {


  productos: any[] = [];

  cartProduct: Cart[];

  price: any[] = [];

  cargado: boolean = false;

  cargando: boolean = true;

  duplicado: Producto[] = [];

  listaAdmin: Producto[] = [];

  isAdmin = false;

  //Para cargar usuario
  isLogged = false;
  nombreUsuario: string = '';

  filterPost = '';

  totalLength: any;
  page: number = 1;

  constructor(

    private cartService: CartService,
    private productoService: ProductoService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    private DecimalPipe: DecimalPipe,
    private titleService: Title
  ) { }

  ngOnInit() {

    this.titleService.setTitle('Productos | MYKELT');

    if (this.tokenService.isLogged()) {
      this.tokenService.timeToken();
    }

    this.cargarProductos(); // Carga los productos

    this.isAdmin = this.tokenService.isAdmin();

  }

  onPageChange(page: number) {
    this.page = page;
    window.scrollTo(0, 0);
  }

  cargarProductos(): void {


    this.productoService.lista().subscribe(
      data => {
        this.productos = data; // lo carga en el Array que hemos creado, llamado productos

        this.totalLength = data.length;

        this.cargado = true;

      },
      err => {
    
      }
    );

  }


  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto eliminado', '', {
          timeOut: 3000
        });
        this.cargarProductos();

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });
      }
    );
  }

  addCart(productoId: string, quantity: number) {   // Recibe el productId y la cantidad 

 

  }



}

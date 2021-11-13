import { Cart } from './../models/cart';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../models/producto';
import { CartService } from '../service/cart.service';
import { TokenService } from '../service/token.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: any[] = [];

  price: any[] = [];

  quantity: number = 1;

  cargado: boolean = false;

  cargando: boolean = true;

  isLogged = false;  // variable de si está logueado

  constructor(
    private cartService: CartService,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private titleService: Title
  ) {

  }

  ngOnInit() {

    this.titleService.setTitle('Detalles del producto | MYKELT');

    this.isLogged = this.tokenService.isLogged();

    const id = this.activatedRoute.snapshot.params.idProduct;

    this.productoService.detail(id).subscribe(
      data => {

        this.producto = data;

        this.cargado = true;


      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });
        this.volver();
      }
    );

  }


  volver(): void {
    this.router.navigate(['/productos']);
  }


  resta() {

    this.quantity = this.quantity - 1;

  }


  suma() {

    this.quantity = this.quantity + 1;

  }




  addCart(productoId: string, quantity: number) {


    this.productoService.price(productoId).subscribe(
      data => {

        let idprice = data.data[0].id;

        this.crear(productoId, idprice, quantity);

      },
      err => {

      }
    );

  }


  crear(productoId, idprice, quantity) {

    const cart = new Cart(productoId, idprice, quantity);
    this.cartService.save(cart).subscribe(
      data => {
        this.toastr.success('Añadido a la cesta', '', {
          timeOut: 3000
        });

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });
      }
    );
  }



  priceId(productoId: string) {

    this.productoService.price(productoId).subscribe(
      data => {

      },
      err => {

      }
    );


  }

}

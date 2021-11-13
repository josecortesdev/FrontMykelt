import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../service/cart.service';
import { ProductoService } from '../service/producto.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

//Prueba stripe
declare var Stripe: any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  precio: any[] = [];

  carrito: Cart[] = []; // Aquí se carga los productos de carrito que tenemos en la db

  cartProducts: any[] = [];

  PricesArray: any[] = [];

  cargado: boolean = false;

  isLogged = false;

  livemode: boolean = false;


  // Calcular precio
  ShowPrice: number;
  Sumaprecios: any[] = [];
  PrecioTotal: number = 0;
  PrecioTotalDecimal: string;


  //-----

  constructor(
    private cartService: CartService,
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private titleService: Title
  ) { }


  ngOnInit(): void {

    this.titleService.setTitle('Cesta | MYKELT');

    this.isLogged = this.tokenService.isLogged();

    this.cargarCarrito();

  }

  boxChange(price: number, quantity: number, check: boolean) {
    //Comprueba si este producto tiene el check
    //Si lo tiene, usa el método totalprice para calcular el precio
    //Si no lo tiene, no lo añadas

    if (check) { // Si hay check...

      this.TotalPrice(price, quantity)
    } else { // Si quita el check, resta el precio*cantidad al precio total

      this.RemoveOfTotalPrice(price, quantity)

    }
  }


  TotalPrice(precio, cantidad) { // Método para calcular el precio total

    // Modificamos la variable que muestra el precio total
    this.PrecioTotal = this.PrecioTotal + (Number(precio) * Number(cantidad))

  }

  RemoveOfTotalPrice(precio, cantidad) {

    // Modificamos la variable que muestra el precio total
    this.PrecioTotal = this.PrecioTotal - (Number(precio) * Number(cantidad))

  }

  cargarCarrito(): void {

    this.cartService.lista().subscribe(
      data => {
        this.carrito = data; // Nos devuelve el cart de la db

        this.Sumaprecios = data;

        // Lo recorremos para sacar el nombre y precio. Además, añadimos a este array el quantity y el id.
        // Para sacar el nombre y precio, es necesario hacer un subscribe a produtoService.detail

        for (let nombre of this.carrito) {

          const idp = nombre.idProduct;

          this.productoService.detail(idp).subscribe(
            data => {

              data.quantity = nombre.quantity;
              data.idDB = nombre.id;
              data.select = false;

              this.cartProducts.push(data);   // Tenemos un array con todos los datos de la API + quantity + nombre

              this.PrecioTotal = 0;

            },
            err => {
              this.toastr.error(err.error.mensaje, 'Error', {
                timeOut: 3000
              });

            }
          );
          this.cargado = true;
        }
      },
      err => {

      }
    );
  }



  resta(idproduct: string, quantity: number) {

    // quiero coger el array cartProducts, acceder al producto indicado y restarle/sumarle una unidad
    // Esto lo hago para que se muestre la modificación de la unidad directamente en la vista

    quantity = quantity - 1;

    // paso 1: acceder al array que tiene como idProduct, idproduct
    let coincide = this.cartProducts.find(producto => producto.id == idproduct);

    // paso 2: sustituir su quantity
    coincide.quantity = quantity;


    // Llama al servidor para modificar el quantity en la base de datos.

    const cart = new Cart(idproduct, 'pruebaid', quantity);
    this.cartService.save(cart).subscribe(
      data => {

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });

      }
    );

    this.PrecioResta(idproduct); // Restamos 1 al precio total

  }



  PrecioResta(idproduct) {
    this.productoService.detail(idproduct).subscribe(
      data => {
        //Modificamos el array que se enviará al checkout
        for (let cart of this.carrito) {

          if (cart.idProduct == idproduct) {
            cart.quantity = cart.quantity - 1
          }
        }


        // Recorremos el producto. Si el id coincide y además, el check es true, restamos al cuadro del precio
        for (let cartProduct of this.cartProducts) {
          if (cartProduct.id == idproduct && cartProduct.select == true) {
            //Resta al cuadro, el precio*quantity
            this.PrecioTotal = this.PrecioTotal - Number(data.metadata.price);
          }
        }
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });

      }
    );
  }


  suma(idproduct: string, quantity: number) {

    // Muestra directamente en la vista el cambio de las unidades. Sumamos una.

    quantity = quantity + 1;

    let coincide = this.cartProducts.find(producto => producto.id == idproduct);

    coincide.quantity = quantity;


    // Llama al servidor para modificar el quantity en la base de datos.

    const cart = new Cart(idproduct, 'pruebaid', quantity);
    this.cartService.save(cart).subscribe(
      data => {

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });

      }
    );

    this.PrecioSuma(idproduct); // Método para modificar las unidades que se enviarán al checkout y el precio de la vista
  }


  PrecioSuma(idproduct) {

    this.productoService.detail(idproduct).subscribe(
      data => {

        //Modificamos el array que se enviará al checkout
        for (let cart of this.carrito) {

          if (cart.idProduct == idproduct) {
            cart.quantity = cart.quantity + 1
          }
        }

        // Recorremos el producto. Si el id coincide y además, el check es true, sumamos al cuadro del precio
        for (let cartProduct of this.cartProducts) {
          if (cartProduct.id == idproduct && cartProduct.select == true) {
            //Suma al cuadro, el precio*quantity
            this.PrecioTotal = this.PrecioTotal + Number(data.metadata.price);
          }
        }

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });
      }
    );
  }



  pagar() {

    for (let cart of this.carrito) {

      // Por cada registro del carrito, probamos todos los cartproducts
      for (let cartProduct of this.cartProducts) {
        if (cartProduct.idDB == cart.id) {

          if (cartProduct.select == true) {

            this.PricesArray.push({ price: cart.idPrice, quantity: cart.quantity })
          } else {
          }
        }
      }
    }

    this.checkout(this.PricesArray)  // Se lo pasamos al método que utilizamos para el checkout
  }


  priceId() {

    for (let cart of this.cartProducts) {

      this.productoService.price(cart.id).subscribe(
        data => {

          cart.idPrice = data[0].id;

          this.PricesArray.push({ price: cart.idPrice, quantity: cart.quantity })

        },
        err => {
        }
      );
    }

    this.checkout(this.PricesArray) // Se lo pasamos al método que utilizamos para el checkout

  }



  pruebaArray() {
    let cartArray: any[] = [];
    cartArray.push({ price: 'price_1JRykpEDzo7bolN0pL6nAUjv', quantity: 1 }, { price: 'price_1JRwekEDzo7bolN0BFSLdzXs', quantity: 1 })

  }


  checkout(pricesArray) { // Método que utilizamos para redireccionarlo al checkout de Stripe

    var stripe = Stripe(environment.stripeId);

    stripe.redirectToCheckout({
      lineItems: pricesArray,

      shippingAddressCollection:
      {
        allowedCountries: ['ES', 'US', 'CH', 'DE', 'GB', 'NZ'],
      },
      mode: 'payment',
      successUrl: environment.dominio + 'productos',
      cancelUrl: environment.dominio + 'cart',
    })
      .then(function (result) {
        if (result.error) {
          /*
           * Si la redirección al checkout falla, muestra el siguiente mensaje 
           */
          var displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        }
      });
  }


  borrar(id: number) {

    this.cartService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto eliminado del carrito', '', {
          timeOut: 3000
        });
        this.cargarCarrito();
        window.location.reload();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });
      }
    );
  }

}

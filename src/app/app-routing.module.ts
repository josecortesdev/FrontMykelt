import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { AdminGuardService } from './guards/admin-guard.service';

import { LoginGuard } from './guards/login.guard';
import { ListaPostComponent } from './post/lista-post.component';
import { NuevoPostComponent } from './post/nuevo-post.component';
import { FullPostComponent } from './post/full-post.component';
import { EditarPostComponent } from './post/editar-post.component';
import { SetupCardComponent } from './stripe/setup-card.component';
import { CartComponent } from './cart/cart.component';
import { ResetPasswordComponent } from './reset/reset-password.component';
import { ResetFormComponent } from './reset/reset-form.component';
import { AdminPanelComponent } from './admin/admin-panel.component';
import { AtribucionesComponent } from './footer/atribuciones.component';
import { PreguntasComponent } from './footer/preguntas.component';
import { ContactoComponent } from './footer/contacto.component';



const routes: Routes = [
  { path: '', component: IndexComponent },

  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },

  { path: 'restablecer', component: ResetPasswordComponent },
  { path: 'formulario-restablecer', component: ResetFormComponent },


  { path: 'setupcard', component: SetupCardComponent },

  { path: 'cart', component: CartComponent },
  { path: 'canceled', component: CartComponent },

  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuardService] },

  { path: 'admin/nuevo', component: NuevoPostComponent, canActivate: [AdminGuardService] },
  
  { path: 'admin/editar/:id', component: EditarPostComponent, canActivate: [AdminGuardService] },

  { path: 'blog', component: ListaPostComponent },
  { path: 'blog/:id', component: FullPostComponent },

  { path: 'productos', component: ListaProductoComponent },
  { path: 'productos/:idProduct', component: DetalleProductoComponent },


  { path: 'preguntas', component: PreguntasComponent },
  { path: 'contacto', component: ContactoComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

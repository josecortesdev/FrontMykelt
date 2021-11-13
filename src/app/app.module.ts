import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';

import { DecimalPipe, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LOCALE_ID, NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { FilterPipe } from './pipes/filter.pipe';
import { ListaPostComponent } from './post/lista-post.component';
import { NuevoPostComponent } from './post/nuevo-post.component';
import { EditarPostComponent } from './post/editar-post.component';
//import { CKEditorModule } from 'ckeditor4-angular';
import { FullPostComponent } from './post/full-post.component';
import { bottom, right } from '@popperjs/core';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SetupCardComponent } from './stripe/setup-card.component';
import { CartComponent } from './cart/cart.component';
import { ResetPasswordComponent } from './reset/reset-password.component';
import { ResetFormComponent } from './reset/reset-form.component';
import { FooterComponent } from './footer/footer.component';
import { AdminPanelComponent } from './admin/admin-panel.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { AtribucionesComponent } from './footer/atribuciones.component';
import { PreguntasComponent } from './footer/preguntas.component';
import { ContactoComponent } from './footer/contacto.component';
import {CloudinaryModule} from '@cloudinary/angular';
import { NgxDropzoneModule } from 'ngx-dropzone';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ListaProductoComponent,
    DetalleProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    FilterPipe,
    ListaPostComponent,
    NuevoPostComponent,
    EditarPostComponent,
    FullPostComponent,
    SetupCardComponent,
    CartComponent,
    ResetPasswordComponent,
    ResetFormComponent,
    FooterComponent,
    AdminPanelComponent,
    AtribucionesComponent,
    PreguntasComponent,
    ContactoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
      // closeButton: true
    }),
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxPaginationModule,
    CloudinaryModule, 
    NgxDropzoneModule

  ],
  providers: [
    interceptorProvider,
    DecimalPipe, //Para poner decimales con el sistema europeo

    { provide: LOCALE_ID, useValue: 'es' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

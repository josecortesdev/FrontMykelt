import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PostService } from './../service/post.service';
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { post } from 'jquery';
import { Post } from '../models/post';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import * as customEditor from './../build2/ckeditor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css']
})
export class NuevoPostComponent implements OnInit {

  public Editor = customEditor;

  name = '';
  header = '';
  body = 'Escribe aquí el cuerpo del artículo';

  files: File[] = [];

  public archivos: any = [];

  public previsualizacion: string;

  portada: File = null;

  nuevoPost: Post;

  public config = {

  };

  constructor(private postService: PostService, private toastr: ToastrService,
    private router: Router, private sanitizer: DomSanitizer,
    private titleService: Title) {


  }

  ngOnInit() {
    this.titleService.setTitle('Nuevo artículo | MYKELT');
  }


  onSelect(event) {
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpload(){
    if(!this.files[0]){
      alert('Primero sube una imagen, por favor');
    }
      const file_data = this.files[0];
      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'mykelt');
      data.append('cloud_name', 'djqmzihzr');


      fetch(environment.cloudinaryUpload,
  {
    method: 'POST',
    body: data
  }
  
).then(response => response.json()).then(data => 

  this.crea(data.secure_url) 
);
   
  }


  // captura(event): any {

  //   const archivoCapturado = <File>event.target.files[0];

  //   this.extraerBase64(archivoCapturado).then((imagen: any) => {
  //     this.previsualizacion = imagen.base; // en esta variable almacenamos la codificación de la imagen, base64

  //   });

  //   this.portada = archivoCapturado;

  // }

  crea(url: string): void {
  
    this.nuevoPost = new Post(this.name, this.header, this.body, url);

    this.postService.save(this.nuevoPost).subscribe(
      data => {
        this.toastr.success('Artículo creado', '', {
          timeOut: 3000
        });
        this.router.navigate(['/admin']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });

      }
    );

  }


  // // El evento que le pasamos, crea una función tipo file, la lee y nos devuelve el base64
  // extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
  //   try {
  //     const unsafeImg = window.URL.createObjectURL($event);
  //     const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
  //     const reader = new FileReader();
  //     reader.readAsDataURL($event);
  //     reader.onload = () => {
  //       resolve({
  //         base: reader.result
  //       });
  //     };
  //     reader.onerror = error => {
  //       resolve({
  //         base: null
  //       });
  //     };

  //   } catch (e) {
  //     return null;
  //   }
  // });


}

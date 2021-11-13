import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';
import { PostService } from '../service/post.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import * as customEditor from './../build2/ckeditor';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-editar-post',
  templateUrl: './editar-post.component.html',
  styleUrls: ['./editar-post.component.css']
})
export class EditarPostComponent implements OnInit {

  public Editor = customEditor;


  name = '';
  header = '';
  body = 'Escribe aquí el cuerpo del artículo';
  post: Post = null;

  public previsualizacion: string;
  portada: File = null;

  files: File[] = [];

  editPost: Post;

  editIMG: boolean = false;

  public config = {

  };


  constructor(private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService, private router: Router, private sanitizer: DomSanitizer,
    private titleService: Title) { }

  ngOnInit() {

    this.titleService.setTitle('Editar | MYKELT');

    const id = this.activatedRoute.snapshot.params.id;
    this.postService.detail(id).subscribe(
      data => {
        this.post = data;

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,
        });
        this.router.navigate(['/']);
      }
    );


  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpdate(){
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
  this.store(data.secure_url) 
);
   
  }

  store(url: string): void {

    const id = this.activatedRoute.snapshot.params.id;

    this.editPost = new Post(this.post.name, this.post.header, this.post.body, url, id);

    this.postService.update( id, this.editPost).subscribe(
      data => {
        this.toastr.success('Artículo editado', '', {
          timeOut: 2000,

        });
        this.router.navigate(['/admin']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,
        });

      }
    );
  }


  // captura(event): any {

  //   const archivoCapturado = <File>event.target.files[0];

  //   this.extraerBase64(archivoCapturado).then((imagen: any) => {
  //     this.previsualizacion = imagen.base; // en esta variable almacenamos la codificación de la imagen, base64

  //   });

  //   this.portada = archivoCapturado;

  // }


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

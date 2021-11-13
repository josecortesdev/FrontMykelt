import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';
import { PostService } from '../service/post.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-post',
  templateUrl: './lista-post.component.html',
  styleUrls: ['./lista-post.component.css']
})
export class ListaPostComponent implements OnInit {

  posts: Post[] = [];

  totalLength: any;
  page: number = 1;

  constructor(private tokenService: TokenService, private postService: PostService, private toastr: ToastrService, private titleService: Title, public router: Router) { }

  ngOnInit() {

    if (this.router.url === '/blog') {
      this.titleService.setTitle('Blog | MYKELT');
    }

    if (this.tokenService.isLogged()) {
      this.tokenService.timeToken();
    }

    this.cargarPosts();

    
    
  }

  onPageChange(page: number) {
    this.page = page;
    window.scrollTo(0, 0);
  }

  cargarPosts(): void {

    this.postService.lista().subscribe(
      data => {
        this.posts = data; // lo carga en el Array que hemos creado, llamado posts
        
        this.totalLength = data.length;

      },
      err => {

      }
    );

  }

  borrar(id: number) {

    this.postService.delete(id).subscribe(
      data => {
        this.toastr.success('Artículo eliminado', '', {
          timeOut: 3000
        });
        this.cargarPosts();

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000
        });
      }
    );


  }

}

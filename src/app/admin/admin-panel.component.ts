import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {


  posts: Post[] = [];



  constructor(private postService: PostService, private toastr: ToastrService,
    private titleService: Title,
    public router: Router) { }

  ngOnInit() {

    this.titleService.setTitle('Dashboard | MYKELT');

    this.cargarPosts();
  }

  cargarPosts(): void {

    this.postService.lista().subscribe(
      data => {
        this.posts = data; // lo carga en el Array creado, llamado posts
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

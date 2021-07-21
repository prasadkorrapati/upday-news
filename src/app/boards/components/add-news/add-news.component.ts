import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { News } from 'src/app/core/types/types';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  
  public boardId:string;
  public addNewsForm: FormGroup;
  private urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(private fb:FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.boardId = this.activatedRoute.snapshot.paramMap.get('boardId');
    this.addNewsForm = this.fb.group( {
      boardId: [this.boardId],
      author: [JSON.parse(localStorage.getItem('userDetails')).email],
      title: ['',Validators.required],
      description: ['', Validators.required],
      imageURL: ['', [Validators.required, Validators.pattern(this.urlPattern)]]
    });
  }

  save(news: News) {
    news.createdAt = new Date().toISOString();
    this.apiService.createNews(news).subscribe ( (news: News) => {
        this.router.navigate([`/boards/${this.boardId}`]);
      }, (error) => {
        // TODO: Show the error message 
      });
  }

  back() {
    this.router.navigate([`/boards/${this.boardId}`]);
  }
}

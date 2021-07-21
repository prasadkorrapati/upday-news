import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { News } from 'src/app/core/types/types';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  
  public editNewsForm: FormGroup;
  private urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  public boardId: string;
  constructor(private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.boardId = this.activatedRoute.snapshot.paramMap.get('boardId');
    const newsId = this.activatedRoute.snapshot.paramMap.get('newsId');
    this.apiService.getNews(newsId).subscribe( (news: News) => {
      this.editNewsForm = this.fb.group({
        id: [news.id],
        boardId: [news.boardId],
        author: [JSON.parse(localStorage.getItem('userDetails')).email],
        title: [news.title, Validators.required],
        description: [news.description, Validators.required],
        imageURL: [news.imageURL, [Validators.required, Validators.pattern(this.urlPattern)]]
      });

    })
  }

  save(news) {
    this.apiService.updateNews(news).subscribe( (res) => {
      this.router.navigate([`/boards/${this.boardId}`]);
    })
  }

  back() {
    this.router.navigate([`/boards/${this.boardId}`]);
  }

  ngOnDestroy() {
    // TODO: Unsubscribe the subscriptions
  }

}

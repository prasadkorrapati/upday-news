import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { News } from 'src/app/types';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit, OnDestroy {
  public editNewsForm: FormGroup;
  private urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  public boardId: string = null;
  public errorMsg: string = null;
  private getNewsSub: Subscription;
  private editNewsSub: Subscription;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userContext: UserContextService) { }

  ngOnInit(): void {
    this.boardId = this.activatedRoute.snapshot.paramMap.get('boardId');
    const newsId = this.activatedRoute.snapshot.paramMap.get('newsId');
    this.getNewsSub = this.apiService.getNews(newsId).subscribe( (news: News) => {
      this.editNewsForm = this.fb.group({
        id: [news.id],
        boardId: [news.boardId],
        author: [this.userContext.get().email],
        title: [news.title, Validators.required],
        description: [news.description, Validators.required],
        imageURL: [news.imageURL, [Validators.required, Validators.pattern(this.urlPattern)]]
      });
    });
  }

  save(news: News): void {
    this.editNewsSub = this.apiService.updateNews(news).subscribe( (res) => {
      this.router.navigate([`/boards/${this.boardId}`]);
    }, (errorResponse) => this.errorMsg = `Error while Saving news ${errorResponse.error ? errorResponse.error : '' }` );
  }

  back(): void {
    this.router.navigate([`/boards/${this.boardId}`]);
  }

  ngOnDestroy(): void {
    if (this.getNewsSub) {
      this.getNewsSub.unsubscribe();
    }
    if (this.editNewsSub) {
      this.editNewsSub.unsubscribe();
    }
  }
}

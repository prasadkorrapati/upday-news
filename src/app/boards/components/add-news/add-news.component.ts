import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { News } from 'src/app/types';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit, OnDestroy {
  public boardId: string;
  public addNewsForm: FormGroup;
  public errorMsg;
  private urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  private createNewsSub: Subscription;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private userContext: UserContextService) { }

  ngOnInit(): void {
    this.boardId = this.activatedRoute.snapshot.paramMap.get('boardId');
    this.addNewsForm = this.fb.group( {
      boardId: [this.boardId],
      author: [this.userContext.get().email],
      title: ['',Validators.required],
      description: ['', Validators.required],
      imageURL: ['', [Validators.required, Validators.pattern(this.urlPattern)]]
    });
  }

  save(news: News): void {
    news.createdAt = new Date().toISOString();
    this.createNewsSub = this.apiService.createNews(news).subscribe ( (response) => {
        this.router.navigate([`/boards/${this.boardId}`]);
      }, (errorResponse) => {
        this.errorMsg = `Error while Saving news ${errorResponse.error ? errorResponse.error : '' }` ;
      });
  }

  back(): void {
    this.router.navigate([`/boards/${this.boardId}`]);
  }

  ngOnDestroy(): void {
    if (this.createNewsSub) {
      this.createNewsSub.unsubscribe();
    }
  }
}

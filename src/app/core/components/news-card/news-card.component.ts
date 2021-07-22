import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { News } from '../../../types';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  @Input() news: News;
  @Output() refresh = new EventEmitter<string>();

  constructor(
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {}

  gotoEditForm(): void {
    this.router.navigateByUrl(`boards/${this.news.boardId}/edit/${this.news.id}`);
  }

  deleteNews(): void {
    this.apiService.deleteNews(this.news.id).subscribe( (res) => {
      this.refresh.emit();
    });
  }

  publishNews(): void {
    this.apiService.publishNews(this.news.id, this.news).subscribe( (res) => {
      this.refresh.emit();
    });
  }

  archiveNews(): void {
    this.apiService.archiveNews(this.news.id, this.news).subscribe( (res) => {
      this.refresh.emit();
    });
  }
}

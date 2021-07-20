import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { BoardNews } from 'src/app/core/types/types';

@Component({
  selector: 'app-board-news',
  templateUrl: './board-news.component.html',
  styleUrls: ['./board-news.component.scss']
})
export class BoardNewsComponent implements OnInit {
  public boardNews: BoardNews;
  public boardId: string;

  constructor(private activatedRoute: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit(): void {
    console.log('board news initialized', this.activatedRoute);
    this.boardId = this.activatedRoute.snapshot.paramMap.get('boardId');
    this.activatedRoute.params.subscribe( (params) => {
      this.boardId = params.boardId;
      this.apiService.getBoardNews(this.boardId).subscribe( (boardNews: BoardNews) => {
        this.boardNews = boardNews;
        console.log('board news   ', boardNews);
      }, (error) => {
        this.boardNews = null;
      })
    });
  }

  ngOnDestroy() {
    console.log('board news destroyed');
  }

  toggleAccordion($event) {
    console.log('element  ', $event);
  }

}

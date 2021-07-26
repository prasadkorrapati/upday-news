import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { BoardNews } from 'src/app/types';

@Component({
    selector: 'app-board-news',
    templateUrl: './board-news.component.html',
    styleUrls: ['./board-news.component.scss'],
})
export class BoardNewsComponent implements OnInit, OnDestroy {
    public boardNews: BoardNews;
    public boardId;
    private boardNewsSub: Subscription;
    public errorMsg;

    constructor(
        private activatedRoute: ActivatedRoute,
        private apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.boardId = this.activatedRoute.snapshot.paramMap.get('boardId');
        this.boardNewsSub = this.activatedRoute.params.subscribe((params) => {
            this.boardId = params.boardId;
            this.apiService.getBoardNews(this.boardId).subscribe(
                (boardNews: BoardNews) => {
                    this.boardNews = boardNews;
                },
                (errorResponse) => {
                    this.boardNews = null;
                    this.errorMsg = `Error while fetching news ${errorResponse.error ? errorResponse.error : ''}`;
                }
            );
        });
    }

    refresh(): void {
        this.boardNewsSub = this.apiService
            .getBoardNews(this.boardId)
            .subscribe(
                (boardNews: BoardNews) => {
                    this.boardNews = boardNews;
                },
                (errorResponse) => {
                    this.boardNews = null;
                    this.errorMsg = `Error while fetching news ${errorResponse.error ? errorResponse.error : ''}`;
                }
            );
    }

    ngOnDestroy(): void {
        if (this.boardNewsSub) {
            this.boardNewsSub.unsubscribe();
        }
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Board } from 'src/app/types';

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
    public boards: Board[] = [];
    public selectedBord: Board;
    public boardsSub: Subscription;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.boardsSub = this.apiService
            .getBoards()
            .subscribe((boards: Board[]) => {
                this.boards = boards;
                if (this.activatedRoute.snapshot.firstChild) {
                    const boardId =
                        this.activatedRoute.snapshot.firstChild.params.boardId;
                    this.selectedBord = boards.find(
                        (board) => board.id === boardId
                    );
                } else {
                    this.selectedBord = this.boards[0];
                }
                this.selectBoard(this.selectedBord);
            });
    }

    selectBoard(board: Board): void {
        this.selectedBord = board;
        this.router.navigate([`boards/${this.selectedBord.id}`]);
    }

    ngOnDestroy(): void {
        if (this.boardsSub) {
            this.boardsSub.unsubscribe();
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Board } from 'src/app/core/types/types';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  public boards: Board[];
  public selectedBord: Board;

  constructor(private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.apiService.getBoards().subscribe( (boards: Board[] ) => {
      this.boards = boards;
      if (this.activatedRoute.snapshot.firstChild) {
        const boardId = this.activatedRoute.snapshot.firstChild.params['boardId'];
        this.selectedBord = boards.find( (board) => board.id === boardId);
      } else {
        this.selectedBord = this.boards[0];
      }
      this.selectBoard(this.selectedBord);
    }, (error) => {
      // TODO: Need to show error Message, when no data
    })
  }

  selectBoard(board: Board) {
    this.selectedBord = board;
    this.router.navigate([`boards/${this.selectedBord.id}`]);
    
  }
  ngOnDestroy() {
    console.log('component destroyed');
    // TODO: to unisucribe all the subscriptions
  }

}

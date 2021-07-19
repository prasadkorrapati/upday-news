import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from '../components/boards/boards.component';
import { BoardNewsComponent } from '../components/board-news/board-news.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AddNewsComponent } from '../components/add-news/add-news.component';
import { EditNewsComponent } from '../edit-news/edit-news.component';


const routes: Routes = [
  { path: '', component: BoardsComponent,
    children: [
      {
        path: ':boardId',
        component: BoardNewsComponent
      },
      {
        path: ':boardId/add',
        component: AddNewsComponent
      },
      {
        path: ':boardId/edit/:newsId',
        component: EditNewsComponent
      }
    ]
  },


]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BoardsModule { }

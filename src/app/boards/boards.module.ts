import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { EditNewsComponent } from './components/edit-news/edit-news.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardNewsComponent } from './components/board-news/board-news.component';
import { CoreModule } from 'src/app/core/core.module';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: BoardsComponent,
    children: [
      {
        path: ':boardId',
        canActivate: [AuthGuard],
        component: BoardNewsComponent
      },
      {
        path: ':boardId/add',
        canActivate: [AuthGuard],
        component: AddNewsComponent
      },
      {
        path: ':boardId/edit/:newsId',
        canActivate: [AuthGuard],
        component: EditNewsComponent
      }
    ]
  }
];
@NgModule({
  declarations: [
    BoardsComponent,
    BoardNewsComponent,
    AddNewsComponent,
    EditNewsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ]
})
export class BoardsModule { }

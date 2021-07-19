import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { BoardsComponent } from './modules/components/boards/boards.component';
import { HttpClientModule } from '@angular/common/http';
import { BoardNewsComponent } from './modules/components/board-news/board-news.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { AddNewsComponent } from './modules/components/add-news/add-news.component';
import { EditNewsComponent } from './modules/edit-news/edit-news.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    BoardsComponent,
    BoardNewsComponent,
    AddNewsComponent,
    EditNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: CustomRouteReuseStrategy
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

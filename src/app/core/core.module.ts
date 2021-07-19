import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { ComposeNewsComponent } from './components/compose-news/compose-news.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    NewsCardComponent,
    ComposeNewsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NewsCardComponent,
    ComposeNewsComponent
  ]
})
export class CoreModule { }

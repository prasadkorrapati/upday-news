import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { ComposeNewsComponent } from './components/compose-news/compose-news.component';
import { RouterModule } from '@angular/router';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { DummyComponent } from './components/dummy/dummy.component';

@NgModule({
  declarations: [
    LoginComponent,
    NewsCardComponent,
    ComposeNewsComponent,
    ErrorMsgComponent,
    DummyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    NewsCardComponent,
    ComposeNewsComponent,
    ErrorMsgComponent
  ]
})
export class CoreModule { }

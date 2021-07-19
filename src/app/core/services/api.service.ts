import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, BoardNews, News } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:8080/v1';
  constructor(private http: HttpClient) { }

  getBoards():Observable<Board[]> {
    return this.http.get<Board[]>(`${this.baseUrl}/board`);
  }

  getBoardNews(boardId: string) : Observable<BoardNews> {
    return this.http.get<BoardNews>(`${this.baseUrl}/board/${boardId}/news`);
  }

  draftNews(newsId: string, news: News) {
    return this.http.post(`${this.baseUrl}/news/${newsId}/draft`, news);
  }

  archiveNews(newsId: string, news: News) {
    return this.http.post(`${this.baseUrl}/news/${newsId}/archive`, news);
    
  }

  publishNews(newsId: string, news: News) {
    return this.http.post(`${this.baseUrl}/news/${newsId}/published`, news);
  }

  deleteNews(newsId: string) {
    return this.http.delete(`${this.baseUrl}/news/${newsId}`);
  }

  updateNews(news: News) {
    return this.http.put(`${this.baseUrl}/news`, news);
  }

  createNews(news: News) {
    return this.http.post(`${this.baseUrl}/news`, news);
  }

  
  getNews(newsId: string) {
    return this.http.get(`${this.baseUrl}/news/${newsId}`);
  }

}

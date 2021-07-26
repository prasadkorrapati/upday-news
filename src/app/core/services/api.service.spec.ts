import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Board, News } from 'src/app/types';
import * as boards from './../../../assets/mocks/boards.json';
import * as boardNews from './../../../assets/mocks/boardNews.json';
describe('ApiService', () => {
  let service: ApiService;
  const mockedBoardsRes = boards.default;
  const mockedBoardNews = boardNews.default;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('verify getBoards', (done) => {
    service.getBoards().subscribe( (res) => {
      expect(res).toBe(mockedBoardsRes);
      done();
    })

    const req = httpMock.expectOne('http://localhost:8080/v1/board');
    expect(req.request.method).toBe('GET');
    req.flush(mockedBoardsRes);
    httpMock.verify();
  })

  it('verify getBoardNews', (done) => {
    service.getBoardNews('en').subscribe( (res) => {
      expect(res).toBe(mockedBoardNews);
      done();
    });
    const req = httpMock.expectOne('http://localhost:8080/v1/board/en/news');
    expect(req.request.method).toBe('GET');
    req.flush(mockedBoardNews);
    httpMock.verify();
  });

  it('verify draft News', (done) => {
    service.draftNews(mockedBoardNews.drafts[0].id, mockedBoardNews.drafts[0]).subscribe( (res) => {
      expect(res).toBe(mockedBoardNews.drafts[0]);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/v1/news/${mockedBoardNews.drafts[0].id}/draft`);
    expect(req.request.method).toBe('POST');
    req.flush(mockedBoardNews.drafts[0]);
    httpMock.verify();
  });

  it('verify archive News', (done) => {
    service.archiveNews(mockedBoardNews.drafts[0].id, mockedBoardNews.drafts[0]).subscribe( (res) => {
      expect(res).toBe(mockedBoardNews.drafts[0]);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/v1/news/${mockedBoardNews.drafts[0].id}/archive`);
    expect(req.request.method).toBe('POST');
    req.flush(mockedBoardNews.drafts[0]);
    httpMock.verify();
  });

  it('verify get News', (done) => {
    service.getNews(mockedBoardNews.drafts[0].id).subscribe( (res) => {
      expect(res).toBe(mockedBoardNews.drafts[0]);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/v1/news/${mockedBoardNews.drafts[0].id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockedBoardNews.drafts[0]);
    httpMock.verify();
  });
  
  it('verify archive News', (done) => {
    service.archiveNews(mockedBoardNews.drafts[0].id, mockedBoardNews.drafts[0]).subscribe( (res) => {
      expect(res).toBe(mockedBoardNews.drafts[0]);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/v1/news/${mockedBoardNews.drafts[0].id}/archive`);
    expect(req.request.method).toBe('POST');
    req.flush(mockedBoardNews.drafts[0]);
    httpMock.verify();
  });

  it('verify publish News', (done) => {
    service.publishNews(mockedBoardNews.drafts[0].id, mockedBoardNews.drafts[0]).subscribe( (res) => {
      expect(res).toBe(mockedBoardNews.drafts[0]);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/v1/news/${mockedBoardNews.drafts[0].id}/published`);
    expect(req.request.method).toBe('POST');
    req.flush(mockedBoardNews.drafts[0]);
    httpMock.verify();
  });
  it('verify create News', (done) => {
    const news: News = {
      id: null,
      author: 'korrapatiprasad9@gmail.com',
      boardId: 'en',
      createdAt: new Date().toISOString(),
      description: 'long description',
      title: 'news Title',
      imageURL: 'https://www.upday.com/wp-content/themes/upday/images/upday-logo-black.svg',
      status: null
    };
    service.createNews(news).subscribe( (res) => {
      expect(res).toBe(news);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/v1/news`);
    expect(req.request.method).toBe('POST');
    req.flush(news);
    httpMock.verify();
  });

  it('verify updateNews', (done) => {
    const news: News = {
      id: null,
      author: 'korrapatiprasad9@gmail.com',
      boardId: 'en',
      createdAt: new Date().toISOString(),
      description: 'long description',
      title: 'news Title',
      imageURL: 'https://www.upday.com/wp-content/themes/upday/images/upday-logo-black.svg',
      status: null
    };
    service.updateNews(news).subscribe( (res) => {
      expect(res).toBe(news);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/v1/news`);
    expect(req.request.method).toBe('PUT');
    req.flush(news);
    httpMock.verify();

  });
  it('verify delete', (done) => {
    const newsId= '442f7179-a7a4-7958-1d07-9a988c921d9c';
    service.deleteNews(newsId).subscribe( (res) => {
      expect(res).toBe(true);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/v1/news/${newsId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
    httpMock.verify();

  });


});

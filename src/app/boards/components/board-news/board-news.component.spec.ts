import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/core/services/api.service';
import { of, Subject, throwError } from 'rxjs';
import { BoardNewsComponent } from './board-news.component';
import * as boardNews from './../../../../assets/mocks/boardNews.json';
import { CoreModule } from 'src/app/core/core.module';
describe('BoardNewsComponent', () => {
    let component: BoardNewsComponent;
    let fixture: ComponentFixture<BoardNewsComponent>;
    let apiService: ApiService;
    let BoardNews = boardNews.default;
    let paramsSub = new Subject();
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule, CoreModule],
            declarations: [BoardNewsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: paramsSub,
                        snapshot: {
                            paramMap: {
                                get: () => 'en',
                            },
                        },
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardNewsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        apiService = TestBed.inject(ApiService);
    });

    afterEach(() => {
        component = null;
    });

    it('verify component board news when request success', () => {
        spyOn(apiService, 'getBoardNews').and.callFake(() => {
            return of(BoardNews);
        });
        paramsSub.next({ boardId: 'en' });
        component.ngOnInit();
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(component.boardNews).toEqual(BoardNews);
    });
    it('verify component board news when request error', () => {
        spyOn(apiService, 'getBoardNews').and.callFake(() => {
            return throwError(BoardNews);
        });
        paramsSub.next({ boardId: 'en' });
        component.ngOnInit();
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(component.boardNews).toEqual(null);
        expect(component.errorMsg).toEqual('Error while fetching news ');
    });

    it('verify refresh board news ', () => {
        spyOn(apiService, 'getBoardNews').and.callFake(() => {
            return of(BoardNews);
        });
        paramsSub.next({ boardId: 'en' });
        component.ngOnInit();
        fixture.detectChanges();
        component.refresh();
        expect(component).toBeTruthy();
        expect(component.boardNews).toEqual(BoardNews);
    });

    it('verify when refresh fails', () => {
        spyOn(apiService, 'getBoardNews').and.callFake(() => {
            return throwError(BoardNews);
        });
        paramsSub.next({ boardId: 'en' });
        component.ngOnInit();
        fixture.detectChanges();
        component.refresh();
        expect(component).toBeTruthy();
        expect(component.boardNews).toEqual(null);
        expect(component.errorMsg).toEqual('Error while fetching news ');
    });
});

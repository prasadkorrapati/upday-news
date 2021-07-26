import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { UserDetails } from 'src/app/types';
import * as boardNews from './../../../../assets/mocks/boardNews.json';
import { EditNewsComponent } from './edit-news.component';

describe('EditNewsComponent', () => {
    let component: EditNewsComponent;
    let fixture: ComponentFixture<EditNewsComponent>;
    let userContextService: UserContextService;
    let apiService: ApiService;
    let BoardNews = boardNews.default;
    let routerstub: Router ;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditNewsComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: (key) => {
                                    switch (key) {
                                        case 'boardId':
                                            return 'en';
                                        case 'newsId':
                                            return 'a8070ddf-0293-f6c9-5d87-0b29638769d1';
                                    }
                                },
                            },
                        },
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditNewsComponent);
        component = fixture.componentInstance;
        apiService = TestBed.inject(ApiService);
        userContextService = TestBed.inject(UserContextService);
        const userDetails: UserDetails = {
            userName: 'Prasad Korrapati',
            email: 'korrapatiprasad9@gmail.com',
        };
        userContextService.set(userDetails);
        spyOn(apiService, 'getNews').and.callFake(() => {
            return of(BoardNews.published[0]);
        });
        routerstub = TestBed.inject(Router);
        spyOn(routerstub, 'navigate');
        fixture.detectChanges();
    });



    it('verify edit form values are populated correctly', () => {
        expect(component).toBeTruthy();
        expect(component.editNewsForm.value.id).toEqual("da815c84-1522-e11c-b25d-b956a0436d96");
        expect(component.editNewsForm.value.author).toEqual("korrapatiprasad9@gmail.com");
        expect(component.editNewsForm.value.boardId).toEqual("en");
        expect(component.editNewsForm.value.description).toEqual("big description 1");
        expect(component.editNewsForm.value.imageURL).toEqual("https://www.upday.com/wp-content/themes/upday/images/upday-logo-black.svg");
        expect(component.editNewsForm.value.title).toEqual("new title 1");
    });

    it('verify after edit form save should redirect back to the boards page', () => {
        spyOn(apiService, 'updateNews').and.callFake(() => {
            return of(BoardNews.published[0]);
        });
        component.save(BoardNews.published[0]);
        expect(routerstub.navigate).toHaveBeenCalledOnceWith([`/boards/en`])
    });

    it('verify the error message shown when save fails', () => {
        spyOn(apiService, 'updateNews').and.callFake(() => {
            return throwError('author is invalid');
        });
        component.save(BoardNews.published[0]);
        expect(component.errorMsg).toEqual("Error while Saving news ");
    });

    it('verify getting redirected to the correct board or not', () => {
        component.back();
        expect(routerstub.navigate).toHaveBeenCalledOnceWith([`/boards/en`])
    })
});

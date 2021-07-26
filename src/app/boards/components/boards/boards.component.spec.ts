import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DummyComponent } from 'src/app/core/components/dummy/dummy.component';
import * as boards from './../../../../assets/mocks/boards.json';
import { CoreModule } from 'src/app/core/core.module';
import { ApiService } from 'src/app/core/services/api.service';
import { UserDetails } from 'src/app/types';

import { BoardsComponent } from './boards.component';
import { of } from 'rxjs';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;
  let apiService: ApiService;
  const mockedBoards = boards.default;
  class RouterStub {
    url = '';
    navigate(commands: any[], extras?: any) { }
}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'boards',
            component: DummyComponent,
            children: [
              {
                path: ':boardId',
                component: DummyComponent
              }
            ]
          },
        ]
        ),
        CoreModule,
        RouterModule,
        HttpClientModule
      ],
      declarations: [ BoardsComponent ],
      providers:[],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {

  });
  
  it('should create', () => {
    const userDetails: UserDetails = {
      userName: 'Prasad Korrapati',
      email: 'korrapatiprasad9@gmail.com'
    }
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const routerstub: Router = TestBed.inject(Router);
    apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getBoards').and.returnValue(of(mockedBoards));
    spyOn(routerstub, 'navigate');
    expect(component).toBeTruthy();
  });

  it('verify when user not logged in', () => {
    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');
    expect(component).toBeTruthy();
  });
});

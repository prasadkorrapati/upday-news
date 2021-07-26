import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { UserDetails } from 'src/app/types';

import { AddNewsComponent } from './add-news.component';

describe('AddNewsComponent', () => {
  let component: AddNewsComponent;
  let fixture: ComponentFixture<AddNewsComponent>;
  let userContextService: UserContextService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ AddNewsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsComponent);
    component = fixture.componentInstance;
    userContextService = TestBed.inject(UserContextService);
    const userDetails: UserDetails = {
      userName: 'Prasad Korrapati',
      email: 'korrapatiprasad9@gmail.com'
    }
    userContextService.set(userDetails);
    fixture.detectChanges();
  });

  afterEach( () => {
    localStorage.clear();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

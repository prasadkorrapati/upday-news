import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserContextService } from '../core/services/user-context.service';
import { UserDetails } from '../types';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let userContextService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [RouterTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        userContextService = TestBed.inject(UserContextService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create ', () => {
        expect(component).toBeTruthy();
    });

    it('verify logout functionality', () => {
        const userDetails: UserDetails = {
            userName: 'Prasad Korrapati',
            email: 'korrapatiprasad9@gmail.com',
        };
        userContextService.set(userDetails);
        fixture.detectChanges();
        component.logout();
        expect(userContextService.get()).toBe(null);
    });
});

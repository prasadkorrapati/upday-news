import {
    ComponentFixture,
    fakeAsync,
    flush,
    TestBed,
    tick,
    waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDetails } from 'src/app/types';
import { UserContextService } from '../../services/user-context.service';
import { DummyComponent } from '../dummy/dummy.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let routerstub: Router;
    let userService: UserContextService;
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule.withRoutes([
                        {
                            path: 'boards',
                            component: DummyComponent,
                            children: [
                                {
                                    path: ':boardId',
                                    component: DummyComponent,
                                },
                            ],
                        },
                    ]),
                    FormsModule,
                    ReactiveFormsModule,
                ],
                declarations: [LoginComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        localStorage.clear();
        userService = TestBed.inject(UserContextService);
        routerstub = TestBed.inject(Router);
        spyOn(routerstub, 'navigate');
    });

    afterEach(() => {
        localStorage.clear();
        fixture.destroy();
    });

    it('When user logged in should be redirected to boards ', fakeAsync(() => {
        const userDetails: UserDetails = {
            userName: 'Prasad Korrapati',
            email: 'korrapatiprasad9@gmail.com',
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        fixture.detectChanges();
        tick(1000);
        expect(routerstub.navigate).toHaveBeenCalled();
    }));

    it('login component should show two inputs should create', fakeAsync(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
        tick();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const formElement =
                fixture.debugElement.nativeElement.querySelector('#loginForm');
            const inputElements = formElement.querySelectorAll('input');
            const buttonElement = formElement.querySelectorAll('button');
            expect(inputElements.length).toBe(2);
            expect(buttonElement).not.toBe(undefined);
        });
    }));

    it('verify form values', fakeAsync(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
        const loginFormValues = {
            userName: '',
            email: '',
        };
        tick();
        fixture.whenStable().then(() => {
            expect(component.loginForm.value).toEqual(loginFormValues);
        });
    }));

    it('check username, email before enter value and validation', fakeAsync(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const formElement =
                fixture.debugElement.nativeElement.querySelector('#loginForm');
            const userNameInput = formElement.querySelectorAll('input')[0];
            const userNameValueFormGroup = component.loginForm.get('userName');
            tick();
            expect(userNameInput.value).toEqual(userNameValueFormGroup.value);
            expect(userNameValueFormGroup.errors).not.toBe(null);
        });
    }));

    it('check login form is valid when validation are fulfilled and redirected to boards page', fakeAsync(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        tick();
        fixture.whenStable().then(() => {
            const formElement =
                fixture.debugElement.nativeElement.querySelector('#loginForm');
            const userNameInput = formElement.querySelectorAll('input')[0];
            const emailInput = formElement.querySelectorAll('input')[1];
            userNameInput.value = 'Prasad K';
            emailInput.value = 'korrapatiprasad9@gmail.com';
            userNameInput.dispatchEvent(new Event('input'));
            emailInput.dispatchEvent(new Event('input'));
        });
        fixture.whenStable().then(() => {
            const isFormValid = component.loginForm.valid;
            expect(isFormValid).toBe(true);
            component.submit();
        });
    }));

    // TODO: Need to write more test cases around showing form control validation messages
});

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserContextService } from '../../services/user-context.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    submitted = false;
    constructor(
        private fb: FormBuilder,
        private userContextService: UserContextService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.userContextService.get()) {
            this.router.navigate(['/boards']);
        } else {
            this.loginForm = this.fb.group({
                userName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
            });
        }
    }

    public submit(): void {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.userContextService.set(this.loginForm.value);
        this.router.navigate(['/boards']);
    }
}

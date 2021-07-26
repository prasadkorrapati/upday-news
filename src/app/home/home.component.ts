import {
    Component,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserContextService } from '../core/services/user-context.service';
import { UserDetails } from '../types';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    public loggedInUserDetails: UserDetails;
    private subscription: Subscription;
    constructor(
        private userContextService: UserContextService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.loggedInUserDetails = this.userContextService.get();
        this.subscription = this.userContextService
            .onUserLoggedin()
            .subscribe((loggedInUserDetails) => {
                this.loggedInUserDetails = loggedInUserDetails;
            });
    }

    logout() {
        this.userContextService.set(null);
        this.loggedInUserDetails = this.userContextService.get();
        this.router.navigate(['/login']);
    }
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserContextService } from '../core/services/user-context.service';
import { UserDetails } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public loggedInUserDetails: UserDetails;
  private subscription: Subscription;
  constructor(private userContextService: UserContextService){}
  ngOnInit(): void {
    this.loggedInUserDetails = this.userContextService.get();
    this.subscription = this.userContextService.onUserLoggedin().subscribe( (loggedInUserDetails) => {
      this.loggedInUserDetails = loggedInUserDetails;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

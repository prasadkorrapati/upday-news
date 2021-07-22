import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserContextService } from '../core/services/user-context.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  public loggedInUserDetails;
  constructor(private userContextService: UserContextService){}
  private subscription: Subscription;
  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    this.subscription = this.userContextService.onUserLoggedin().subscribe( (loggedInUserDetails) => {
      this.loggedInUserDetails = loggedInUserDetails;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

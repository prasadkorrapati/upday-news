import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  private loggedInUser;
  constructor() { }
  set(loggedInUser) {
    this.loggedInUser = loggedInUser;
  }
  get() {
    return this.loggedInUser;
  }
}

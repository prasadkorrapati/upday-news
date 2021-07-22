import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  private loggedInUser;
  private  subject: Subject<any> = new Subject();;

  public onUserLoggedin(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor() { }
  set(loggedInUser) {
    this.loggedInUser = loggedInUser;
    this.subject.next(loggedInUser);
  }
  get() {
    return this.loggedInUser;
  }
}

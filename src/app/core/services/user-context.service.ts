import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserDetails } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  private  subject: Subject<any> = new Subject();
  constructor() { }

  public onUserLoggedin(): Observable<any> {
    return this.subject.asObservable();
  }

  set(loggedInUser): void {
    localStorage.setItem('userDetails', JSON.stringify(loggedInUser));
    this.subject.next(this.get());
  }

  get(): UserDetails {
    return JSON.parse(localStorage.getItem('userDetails'));
  }
}

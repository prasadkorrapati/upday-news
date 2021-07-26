import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDetails } from 'src/app/types';
import { UserContextService } from '../services/user-context.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let userContextService: UserContextService;
    let routerstub: Router;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        guard = TestBed.inject(AuthGuard);
        routerstub = TestBed.inject(Router);
        spyOn(routerstub, 'navigate');
    });

    it('verify the authguard when no user data in local storage', () => {
        localStorage.clear();
        expect(guard).toBeTruthy();

        guard.canActivate(null, null);
        expect(routerstub.navigate).toHaveBeenCalledOnceWith(['/login']);
    });
    it('verify the authguard when user data available in local storage', () => {
      const userDetails: UserDetails = {
        userName: 'Prasad Korrapati',
        email: 'korrapatiprasad9@gmail.com'
      }
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      expect(guard).toBeTruthy();

      expect(guard.canActivate(null, null)).toEqual(true);
      expect(routerstub.navigate).not.toHaveBeenCalled();
  });
});

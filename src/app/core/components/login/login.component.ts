import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserContextService } from '../../services/user-context.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder,
    private userContextService: UserContextService,
    private router: Router) { }
  
  ngOnInit(): void {
    if(localStorage.getItem('userDetails')) {
      this.router.navigate(['/boards']);
      this.userContextService.set(JSON.parse(localStorage.getItem('userDetails')));
    } else {
      this.loginForm = this.fb.group( {
       userName: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]]
     });
    }

  }

  public submit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return ;
    }
    console.log('invalid  ', this.loginForm.value)
    this.userContextService.set(this.loginForm.value);
    localStorage.setItem('userDetails', JSON.stringify(this.loginForm.value));
    this.router.navigate(['/boards']);
  }

}

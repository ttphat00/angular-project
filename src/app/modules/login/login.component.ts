import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/models/auth';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  get email() {
    return this.loginForm.get('email');
  }
 
  get password() {
    return this.loginForm.get('password');
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  getErrorEmail() {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }

    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPassword() {
    return 'Password is required';
  }

  onSubmit() {
    this.authService.login(this.email?.value as string, this.password?.value as string).subscribe((auth: Auth) => {
      if(auth.user.roleId.name === 'Employee'){
        localStorage.setItem('user_token', auth.accessToken);
      }else{
        localStorage.setItem('admin_token', auth.accessToken);
      }
      this.router.navigate([this.authService.redirectUrl]);
    });
  }
}

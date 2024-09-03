
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login.model';
import { Router } from '@angular/router';
import { AuthService } from '../Login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;
      this.loginService.login(loginData).subscribe(
        response => {
          console.log('Login successful!', response);
          this.authService.setUser(response); // Assuming response contains user details
          this.router.navigate(['/products']);
          // this.loginForm.reset();
          // this.errorMessage = null;
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      );

    // } else {
    //   this.errorMessage = 'Please fill in the required fields.';
    // }
  }
  }}

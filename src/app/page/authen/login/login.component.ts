import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { maxLengthValidator } from '../../../validator/login.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required, maxLengthValidator()],
      password: ['', Validators.required, maxLengthValidator()],
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigate(['/home']);
          } else {
            this.loginError = true;
          }
        },
        (error) => {
          console.error('Login error:', error);
          this.loginError = true;
        }
      );
    }
  }
}

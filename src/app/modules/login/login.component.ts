import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  isAuthorized$: Observable<boolean>;
  hide = true;
  signup = false;
  passwordMismatch = false;

  loginForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.signUpForm.valueChanges
      .pipe(
        map(() => {
          return (
            this.signUpForm.get('password').value !==
            this.signUpForm.get('confirmPassword').value
          );
        }),
      )
      .subscribe((passwordsMatch) => {
        this.passwordMismatch = passwordsMatch;
      });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.logIn(email, password);
    }
  }

  signUp(): void {
    if (this.signUpForm.valid && !this.passwordMismatch) {
      const { email, password } = this.signUpForm.value;
      this.authService.signUp(email, password);
    }
  }

  loginWithGoogle(): void {
    this.authService.googleSignIn();
  }
}

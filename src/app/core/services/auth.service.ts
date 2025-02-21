import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private provider: GoogleAuthProvider;
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.provider = new GoogleAuthProvider();
  }

  googleSignIn(): void {
    signInWithPopup(this.auth, this.provider)
      .then(() => {
        this.toastr.success(`You've been successfully signed in!`);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.toastr.error(this.showFirebaseError(error.code));
      });
  }

  logOut(): void {
    const user = this.auth.currentUser;

    signOut(this.auth)
      .then(() => {
        this.toastr.success('Logged out successfully!', user.email);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.toastr.error(
          `Error signing out: ${this.showFirebaseError(error.code)}`,
        );
      });
  }

  signUp(email: string, password: string): void {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.toastr.success('The account has been created!', user.email);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.toastr.error(this.showFirebaseError(error.code));
      });
  }

  logIn(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.toastr.success('Logged successfully!', user.email);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.toastr.error(this.showFirebaseError(error.code));
      });
  }

  isAuthorized(): Observable<boolean> {
    return this.authState$.pipe(map((user) => !!user));
  }

  showFirebaseError(error: string): string {
    switch (error) {
      case 'auth/invalid-credential':
        return 'Error. A non-existent email or password was provided';
      case 'auth/invalid-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-exists':
        return 'This email is already in use. Please use a different email.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }
}

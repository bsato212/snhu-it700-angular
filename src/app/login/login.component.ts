import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {
    this.loading = false;
  }

  ngOnInit() { }

  login(email: string, password: string): void {
    this.loading = true;

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(cred => {
        console.log(cred);
        this.router.navigate(['get-location']);
      })
      .catch(err => {
        this.loading = false;
        this.errorMessage = err.message;
        console.error(err);
      });
  }

  googleLogin(): void {
    this.loading = true;

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        console.log(user);
        this.router.navigate(['get-location']);
      })
      .catch(err => {
        this.loading = false;
        console.error(err);
      });
  }
}

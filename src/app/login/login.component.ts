import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
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
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    this.loading = false;
  }

  ngOnInit() { }

  login(email: string, password: string): void {
    this.loading = true;

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(cred => {
        const ref = this.db.collection('users').doc(cred.user.uid).ref;
        ref.get().then(user => {
          if (user && user.data && user.data()) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['get-location']);
          }
        });
      })
      .catch(err => {
        this.loading = false;
        this.errorMessage = err.message;
        console.error(err);
      });
  }

  onKey(event, email: string, password: string) {
    if (event.key === 'Enter') {
      this.login(email, password);
    }
  }

  googleLogin(): void {
    this.loading = true;

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(cred => {
        console.log(cred);
        const ref = this.db.collection('users').doc(cred.user.uid).ref;
        ref.get().then(user => {
          if (user && user.data && user.data()) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['get-location']);
          }
        });
      })
      .catch(err => {
        this.loading = false;
        console.error(err);
      });
  }
}

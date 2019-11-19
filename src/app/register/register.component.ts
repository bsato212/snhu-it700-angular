import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {
    this.loading = false;
  }

  ngOnInit() { }

  onRegister(email, password1, password2) {
    if (password1 !== password2) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    this.afAuth.auth.createUserWithEmailAndPassword(email, password1)
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
}

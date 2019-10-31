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
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() { }

  login(): void {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        console.log(user);
        this.router.navigate(['get-location']);
      });
  }
}

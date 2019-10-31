import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-location',
  templateUrl: './get-location.component.html',
  styleUrls: ['./get-location.component.scss']
})
export class GetLocationComponent implements OnInit {
  users: Observable<any[]>;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.users = this.db.collection('users').valueChanges();
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['home']);
  }
}

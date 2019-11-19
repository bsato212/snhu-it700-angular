import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.isCollapsed = true;
  }

  ngOnInit() {}

  logout(): void {
    this.isCollapsed = true;
    this.afAuth.auth.signOut();
    this.router.navigate(['home']);
  }
}

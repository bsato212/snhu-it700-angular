import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { take, tap, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.user.pipe(
      take(1),
      map(authUser => authUser.uid),
      switchMap(uid => this.db.collection('users').doc(uid).get()),
      map(user => {
        if (user && user.data && user.data()) {
          return user.data().admin;
        }
        return false;
      }),
      tap(admin => {
        if (!admin) {
          this.router.navigate(['get-location']);
        }
      })
    );
  }
}

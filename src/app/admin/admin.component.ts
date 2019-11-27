import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

interface Listing {
  address: string;
  city: string;
  description: string;
  name: string;
  online: boolean;
  phone: string;
  state: string;
  website: string;
}

interface CustomUser {
  admin: boolean;
  institution: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  id: string;
  listing: Listing;
  subscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.subscription = this.afAuth.user.pipe(
      take(1),
      switchMap(authUser => this.db.collection('users').doc<CustomUser>(authUser.uid).valueChanges()),
      take(1),
      switchMap(user => this.db.collection('institutions').doc<Listing>(user.institution).snapshotChanges()),
    ).subscribe(listing => {
      this.id = listing.payload.id;
      this.listing = listing.payload.data();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async onChange(checked) {
    this.listing.online = checked;
    await this.db.collection('institutions').doc(this.id).set(this.listing);
  }
}

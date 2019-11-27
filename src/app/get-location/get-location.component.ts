import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, take } from 'rxjs/operators';

interface CustomUser {
  admin: boolean;
  institution: string;
}

@Component({
  selector: 'app-get-location',
  templateUrl: './get-location.component.html',
  styleUrls: ['./get-location.component.scss']
})
export class GetLocationComponent implements OnInit {
  states: string[];

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) {
    this.states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ];
  }

  ngOnInit() {
    this.afAuth.user.pipe(
      take(1),
      switchMap(authUser => this.db.collection('users').doc<CustomUser>(authUser.uid).valueChanges()),
      take(1),
    ).subscribe(user => {
      if (user && user.admin) {
        this.router.navigate(['admin']);
      }
    });
  }

  onNext(selected: string) {
    this.router.navigate(['listings'], { queryParams: { state: selected } });
  }
}

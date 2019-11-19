import { Component, OnInit } from '@angular/core';
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
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.users = this.db.collection('users').valueChanges();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  state: string;
  listings: Observable<Listing[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.state = this.route.snapshot.queryParamMap.get('state');
    this.listings = this.db.collection<Listing>('institutions').valueChanges();
  }

  onChat(name: string) {
    this.router.navigate(['chat'], { queryParams: { name } });
  }
}

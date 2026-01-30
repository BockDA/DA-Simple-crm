import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';





@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatSidenavModule, RouterLinkWithHref, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore);

  items$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }
}

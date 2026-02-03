import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgFor, AsyncPipe, RouterLink, MatButtonModule, MatIconModule, MatDialogModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  private firestore = inject(Firestore);
  private destroy$ = new Subject<void>();
  allUsers: any[] = [];

  users$: Observable<any[]> = collectionData(
    collection(this.firestore, 'users'),
    { idField: 'id' }
  ) as Observable<any[]>;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        // console.log('users', users);
        this.allUsers = users;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialog() {
    console.log("Dialog geöffnet");
    this.dialog.open(DialogAddUserComponent, {
      enterAnimationDuration: '500ms',
    });
  }
}

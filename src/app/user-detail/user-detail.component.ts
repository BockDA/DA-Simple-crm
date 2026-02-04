import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subject, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs';
import { User } from '../../model/user.class';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';






@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatIcon, MatButtonModule, MatMenuModule, RouterLink, MatDialogModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog) { }

  userId = '';
  user: User = new User();
  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(paramMap => (paramMap.get('id') ?? '').trim()),
        distinctUntilChanged(),
        filter(id => id.length > 0),
        switchMap(id => {
          this.userId = id;
          return this.getUser(id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(user => {
        this.user = new User(user as any);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUser(userId: string) {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return docData(userDocRef, { idField: 'id' });
  }




  editAdressDialog() {
    console.log("Open Adress Dialög");
    this.dialog.open(DialogEditAdressComponent, {
      enterAnimationDuration: '500ms',
    });
  }



  editUserDialog() {
    console.log("Open Adress Dialög");
    this.dialog.open(DialogEditUserComponent, {
      enterAnimationDuration: '500ms',
    });
  }



  }

 

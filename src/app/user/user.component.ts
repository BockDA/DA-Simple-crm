import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../model/user.class';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {

  user = new User();
  


  constructor(private dialog: MatDialog) { }


  ngOnInit() {
    //console.log("Test-1");
  }


  openDialog() {
    console.log("Dialog geöffnet");
    this.dialog.open(DialogAddUserComponent, {
      //width: '1200px',
      //height: '850px',
      enterAnimationDuration: '500ms',

    });

  }

}


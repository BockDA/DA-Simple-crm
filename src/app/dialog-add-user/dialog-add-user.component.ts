import { Component, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../model/user.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';



@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {

  user = new User();
  birthDate: Date | null = null;


  constructor(
    private dialogRef: MatDialogRef<DialogAddUserComponent>,
    private firestore: Firestore,
    private injector: EnvironmentInjector,
  ) { }


  async saveUser() {
    if (!this.birthDate) {
      console.warn('Birth date is missing');
      return;
    }

    this.user.birthDate = this.birthDate.getTime();
    console.log('User to save:', this.user);

    const result = await runInInjectionContext(this.injector, () => {
      const usersCollection = collection(this.firestore, 'users');
      return addDoc(usersCollection, this.user.toJson());
    });
    console.log('User saved with ID:', result.id);

    this.dialogRef.close(true);
  }


  close(): void {
    this.dialogRef.close(false);
  }

}

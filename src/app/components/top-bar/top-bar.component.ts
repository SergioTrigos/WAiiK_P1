import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.sass',
  standalone: false,
})
export class TopBarComponent {
  isLoggedIn: boolean = false;

  constructor(private dialog: MatDialog) {}

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoggedIn = true; // Assume login success
      }
    });
  }
}

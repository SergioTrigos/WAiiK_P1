import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
  standalone: false
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Logged in:', response);
        // Handle user data (e.g., save token to local storage)
      },
      error: (err) => {
        console.error('Login failed:', err);
      },
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-auth-button',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './auth-button.html',
  styleUrl: './auth-button.scss'
})
export class AuthButton {
  user$: Observable<User | null>;
  constructor(
    private auth: Auth,
    private authService: AuthService
  ){
    this.user$ = user(this.auth);
    this.user$.subscribe((currentUser: any) => {
      if (currentUser) {
        console.log(currentUser);
      }else{
        console.log(null);
      }
    });
  }

  login(){
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }
}

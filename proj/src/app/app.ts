import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth, User, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  user$: Observable<User | null>;
  constructor(private auth: Auth){
    this.user$ = user(this.auth);
    this.user$.subscribe((currentUser: any) => {
      if (currentUser) {
        console.log(currentUser);
      }else{
        console.log(null);
      }
    });
  }
  protected title = 'proj';
}

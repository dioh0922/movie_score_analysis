import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth, User, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthButton } from './component/auth-button/auth-button';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../environments/environment';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    AuthButton,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  detail: SafeHtml | null = null;
  isLoading = false;
  isLogin = false;
  user$: Observable<User | null>;
  constructor(
    private auth: Auth,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ){
    this.user$ = user(this.auth);
    this.user$.subscribe((currentUser: any) => {
      if (currentUser) {
        this.isLogin = true;
      }
    });
  }
  protected title = 'proj';

  startAnalysis(){
    this.isLoading = true;
    this.http.get(environment.apiUrl + '/analysis').subscribe((res: any) => {
      this.isLoading = false;
      const html = marked(res?.msg).toString();
      this.detail = this.sanitizer.bypassSecurityTrustHtml(html);

      console.log(res);
    })
  }
}

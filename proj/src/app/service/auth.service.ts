import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User, user } from '@angular/fire/auth';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;
  private provider = new GoogleAuthProvider();
  constructor(
    private auth: Auth,
    //private router: Route
  ) {
    this.user$ = user(auth);
  }

  login(){
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //this.router.nav(['/', '/'])
      return credential;
    })
  }

  logout(){
    signOut(this.auth)
    .then(() => {
      console.log("signout");
    }).catch((err) => {
      console.log(err);
    });
  }
}

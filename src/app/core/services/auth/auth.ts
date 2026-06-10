import { Injectable } from '@angular/core';
import {getApp,getApps,initializeApp} from 'firebase/app';
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,onAuthStateChanged,signInWithPopup,GoogleAuthProvider,User} from 'firebase/auth';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private app = getApps().length
    ? getApp()
    : initializeApp(environment.firebaseConfig);

  private auth = getAuth(this.app);

  private user$ =
    new BehaviorSubject<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, user => {
      this.user$.next(user);
    });
  }

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(
      this.auth,
      email,
      pass
    );
  }

  register(email: string, pass: string) {
    return createUserWithEmailAndPassword(
      this.auth,
      email,
      pass
    );
  }

  loginConGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(
      this.auth,
      provider
    );
  }


  logout() {
    return signOut(this.auth);
  }

  get currentUser$(): Observable<User | null> {
    return this.user$.asObservable();
  }

  async getCurrentUser(): Promise<User | null> {
    await this.auth.authStateReady();
    return this.auth.currentUser;
  }
}
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inicializamos Firebase con nuestro environment
  private app = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.app);

  // Un BehaviorSubject nos permite saber en tiempo real y desde cualquier componente si el usuario está logueado o no
  private user$ = new BehaviorSubject<User | null>(null);

  constructor() {
    // Escuchar activamente los cambios en el estado de autenticación (si se loguea o desloguea)
    onAuthStateChanged(this.auth, (user) => {
      this.user$.next(user);
    });
  }

  // Función para registrar un nuevo usuario
  register(email: string, pass: string) {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  // Función para iniciar sesión
  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  // Función para cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  // Obtener el estado del usuario como un Observable (para suscribirnos desde los componentes)
  get currentUser$(): Observable<User | null> {
    return this.user$.asObservable();
  }
}
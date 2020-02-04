import {Injectable} from '@angular/core';
import {User} from "../../user/User";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import { auth } from 'firebase/app';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  currentlyAuthenticatedUser$: Observable<User>;
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(
    public angularFirestore: AngularFirestore,   // Inject Firestore service
    public angularFireAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {
    this.currentlyAuthenticatedUser$ = this.setCurrentlyAuthenticatedUser();
  }

  /**
   * Set currently authenticated user.
   */
  setCurrentlyAuthenticatedUser(): Observable<User> {
    return this.angularFireAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  /**
   * Get currently authenticated user.
   */
  getCurrentlyAuthenticatedUser(): Observable<User> {
    return this.currentlyAuthenticatedUser$;
  }

  /**
   * Log in with email and password.
   * @param email
   * @param password
   */
  login(email, password) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

  /**
   * Create user with email and password.
   * @param email
   * @param password
   */
  createUser(email, password) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        userCredential.user.updateProfile({
          displayName: email
        });

        this.insertUserData(userCredential.user)
          .then(() => {
            this.router.navigate(['/home']);
          });
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  /**
   * Setting up user data when login in with username/password,
   * creating user with username/password and login in with social auth
   * provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
   */
  private insertUserData(user: firebase.User): Promise<void> {
    const userReference: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: false
    };

    return userReference.set(userData, {
      merge: true
    })
  }

  /**
   * Send email verification when new profile is created.
   */
  sendVerificationMail() {
    return this.angularFireAuth.auth.currentUser.sendEmailVerification()
      .catch((error) => {
        window.alert(error.message)
      });
  }

  /**
   * Send the password reset email to the email provided.
   * @param passwordResetEmail
   */
  async forgotPassword(passwordResetEmail) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .catch((error) => {
        window.alert(error)
      })
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
  }

  /**
   * Google login.
   */
  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    this.angularFireAuth.auth.signInWithPopup(provider)
      .catch((error) => {
        window.alert(error);
      })
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

  /**
   * Logout.
   */
  async logout() {
    this.angularFireAuth.auth.signOut()
      .catch((error) => {
        window.alert(error);
      }).then(() => {
        this.router.navigate(['/home']);
    });
  }

}

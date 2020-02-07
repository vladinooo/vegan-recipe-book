import {Injectable} from '@angular/core';
import {User} from "../../user/User";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {auth} from 'firebase/app';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user = new BehaviorSubject<User>(null);
  user$ = this.user.asObservable();

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(
    public angularFirestore: AngularFirestore,   // Inject Firestore service
    public angularFireAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {
    this.setCurrentlyAuthenticatedUser();
  }

  /**
   * Set currently authenticated user's ID and persist it in  the local storage.
   */
  setCurrentlyAuthenticatedUser() {
    this.angularFireAuth.authState.subscribe(user => {
        // Logged in
        if (user) {
          this.user.next(<User> {uid: user.uid});
          localStorage.setItem('uid', JSON.stringify(user.uid));
        } else {
          localStorage.setItem('uid', null);
        }
      }
    );
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
   * Gets authenticated user's ID from the local storage and sets the user.
   */
  retrieveUserFromLocalStorage() {
    const userId = JSON.parse(localStorage.getItem('uid'));
    if (!userId) {
      return;
    } else {
      this.user.next(<User>{uid: userId});
    }
  }

  /**
   * Create user with email and password.
   * @param email
   * @param password
   */
  createUser(email, password) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
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
        this.user.next(null);
        localStorage.removeItem('uid');
        this.router.navigate(['/home']);
    });
  }

}

import {Injectable} from '@angular/core';
import {Profile} from "../../profile/profile.model";
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

  private authenticatedUserId = new BehaviorSubject<string>(null);
  authenticatedUserId$ = this.authenticatedUserId.asObservable();

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  private defaultPhotoURL = 'https://firebasestorage.googleapis.com' +
    '/v0/b/vegan-recipe-book.appspot.com/o/1581979955149_dummy-user.png' +
    '?alt=media&token=6b8e98d9-b1d4-49a7-a847-b733fcdadbfa';

  constructor(
    public angularFirestore: AngularFirestore,   // Inject Firestore service
    public angularFireAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {
    this.setCurrentlyAuthenticatedUserId();
  }

  /**
   * Set currently authenticated user ID and persist it in the local storage.
   */
  setCurrentlyAuthenticatedUserId() {
    this.angularFireAuth.authState.subscribe(firebaseUser => {
        if (firebaseUser) {
          this.authenticatedUserId.next(firebaseUser.uid);
          localStorage.setItem('firebaseUserUID', JSON.stringify(firebaseUser.uid));
        } else {
          localStorage.setItem('firebaseUserUID', null);
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
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  /**
   * Gets authenticated user's ID from the local storage.
   */
  retrieveAuthenticatedUserIdFromLocalStorage() {
    const authenticatedUserId = JSON.parse(localStorage.getItem('firebaseUserUID'));
    if (!authenticatedUserId) {
      return;
    } else {
      this.authenticatedUserId.next(authenticatedUserId);
    }
  }

  /**
   * Create user with email and password in Firebase and store the profile details in Cloud Firestore.
   * @param email
   * @param password
   */
  createUser(email, password) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // create new profile document with ID matching the user UID
        this.angularFirestore.collection("profiles").doc(userCredential.user.uid).set({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: '',
          photoURL: this.defaultPhotoURL,
          bio: '',
          emailVerified: userCredential.user.emailVerified
        })
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch(function(error) {
            console.error("Error creating the profile: ", error);
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
    const userReference: AngularFirestoreDocument<Profile> = this.angularFirestore.doc(`users/${user.uid}`);
    const userData = new Profile(user.uid, user.email, '','', '', false);

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
        this.authenticatedUserId.next(null);
        localStorage.removeItem('firebaseUserUID');
        this.router.navigate(['/home']);
    });
  }

  /**
   * Update details of the currently authenticated user.
   * @param userDetailsForm
   */
  updateUserDetails() {
    // const userDetails = Object.assign({}, userDetailsForm.value);
    // const user = this.angularFireAuth.auth.currentUser;

    this.angularFireAuth.auth.onAuthStateChanged(function(user) {
      if (user) {
        user.updateProfile({
          displayName: 'vladinooo',
          photoURL: 'http://test.com/photo'
        }).then(function() {
          console.log('User details updated');
        }).catch(function(error) {
          console.log('Failed to update user details: ' + error);
        });
      } else {
        // No user is signed in.
      }
    });


  }

  /**
   * Delete user.
   */
  deleteUser() {
    const user = this.angularFireAuth.auth.currentUser;
    user.delete().then(function() {
      console.log('User deleted successfully');
    }).catch(function(error) {
      console.log('User deletion failed: ' + error);
    });
  }

}

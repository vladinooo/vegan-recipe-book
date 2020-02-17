// import {Component, OnInit} from '@angular/core';
// import {AuthService} from "../../shared/services/auth.service";
// import {ProfileDataService} from "../../shared/services/profile-data.service";
// import {Profile} from "../profile.model";
// import {BehaviorSubject, Observable} from "rxjs";
// import {take} from "rxjs/operators";
// import {firestore} from "firebase";
// import {AngularFirestore} from "@angular/fire/firestore";
//
// @Component({
//   selector: 'app-view-profile',
//   templateUrl: './view-profile.component.html',
//   styleUrls: ['./view-profile.component.css']
// })
// export class ViewProfileComponent implements OnInit {
//
//   profile$: Observable<Profile>;
//   isLoading: boolean = true;
//
//   constructor(private authService: AuthService,
//               private profileDataService: ProfileDataService) { }
//
//   ngOnInit() {
//     this.authService.authenticatedUserId$.pipe(
//       take(1)).subscribe(uid => {
//         this.profile$ = this.getProfile(uid);
//         this.profile$.subscribe(() => this.isLoading = false);
//     });
//   }
//
//   private getProfile(profileId): Observable<Profile> {
//     return this.profileDataService.getProfile(profileId);
//   }
//
// }

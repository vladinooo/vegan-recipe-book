import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Profile} from "../../profile/profile.model";
import {AuthService} from "../../shared/services/auth.service";
import {ProfileDataService} from "../../shared/services/profile-data.service";
import {take} from "rxjs/operators";
import {UploadService} from "../../shared/upload/upload.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile$: Observable<Profile>;
  isLoading: boolean = true;
  profilePhotoUrl: string = 'assets/images/dummy-user.png';

  constructor(private authService: AuthService,
              private profileDataService: ProfileDataService,
              private uploadService: UploadService) {
  }

  ngOnInit() {
    this.authService.authenticatedUserId$.pipe(
      take(1)).subscribe(uid => {
      this.profile$ = this.getProfile(uid);
      this.profile$.subscribe(() => this.isLoading = false);
    });
  }

  private getProfile(profileId): Observable<Profile> {
    return this.profileDataService.getProfile(profileId);
  }

  private uploadProfilePhoto(event: FileList, profile: Profile) {
    this.profileDataService.uploadProfilePhoto(event, profile);
  }

}

import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Profile} from "../../profile/profile.model";
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import {UploadService} from "../upload/upload.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  private collectionPath = '/profiles';
  profilesCollectionReference: AngularFirestoreCollection<Profile> = null;

  constructor(private angularFirestore: AngularFirestore,
              private uploadService: UploadService) {
    this.profilesCollectionReference = angularFirestore.collection(this.collectionPath);
  }

  ngOnInit() {
  }

  updateProfile(key: string, value: any): Promise<void> {
    return this.profilesCollectionReference.doc(key).update(value);
  }

  getProfiles(): AngularFirestoreCollection<Profile> {
    return this.profilesCollectionReference;
  }

  /**
   * Get profile by ID.
   * @param profileId
   */
  getProfile(profileId: string): Observable<Profile> {
    return this.profilesCollectionReference.doc<Profile>(profileId).valueChanges();
  }

  uploadProfilePhoto(event: FileList, profile: Profile) {
    this.uploadService.startUpload(event, profile.uid);
    this.uploadService.downloadURL$.subscribe(downloadURL => {
      profile.photoURL = downloadURL;
      this.updateProfile(profile.uid, profile);
    });
  }

}

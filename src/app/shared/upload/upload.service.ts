import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {BehaviorSubject, Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Injectable({
  providedIn: 'root'
})
/**
 * Service handling file uploads.
 */
export class UploadService {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  private downloadURL = new BehaviorSubject<string>(null);
  downloadURL$ = this.downloadURL.asObservable();

  /**
   * Parameterized constructor.
   * @param storage the AngularFireStorage object
   * @param db the AngularFirestore object
   */
  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) {

  }

  /**
   * Starts the file upload to the FireStorage.
   * @param event the evnt fired when a file is selected by the user
   * @param profileUid the profile unique ID
   */
  startUpload(event: FileList, profileUid: string) {

    // get reference to the profile this file will be associated with
    const profileReference = this.db.doc('profiles/' + profileUid).ref;

    // get the file object
    const file = event.item(0);

    // client side validation
    if (file.type.split('/')[0] !== 'image') {
      console.error('Unsupported file type');
      return;
    }

    // The storage path
    const path = `${Date.now()}_${file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    const customMetadata = {app: 'Vegan Recipe Book'};
    this.task = this.storage.upload(path, file, {customMetadata});

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      finalize(async () => {
        ref.getDownloadURL().subscribe(url => {
          this.downloadURL.next(url);
          this.db.collection('files').add({
            path: path,
            url: url,
            profile: profileReference,
            createdAt: new Date()
          });
        });
      }),
    ).subscribe();
  }
}

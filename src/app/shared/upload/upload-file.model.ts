import {DocumentReference} from "@angular/fire/firestore";

/**
 * UploadFile class representing any file that is uploaded by the user.
 */
export class UploadFile {

  private _path: string;
  private _url: string;
  private _profile: DocumentReference;
  private _createdAt: Date;

  /**
   * Parameterized constructor.
   * @param path the path of the file
   * @param url the URL of the file
   * @param profile the reference of the Profile the file is associated with
   * @param createdAt the date the file has been created/uploaded
   */
  constructor(path: string, url: string, profile: DocumentReference, createdAt: Date) {
    this._path = path;
    this._url = url;
    this._profile = profile;
    this._createdAt = createdAt;
  }

  /**
   * Get the name of the file.
   */
  get path(): string {
    return this._path;
  }

  /**
   * Get the URL of the file.
   */
  get url(): string {
    return this._url;
  }

  /**
   * Get the reference of the Profile the file is associated with.
   */
  get profile(): DocumentReference {
    return this._profile;
  }

  /**
   * Get the date the file has been created/uploaded.
   */
  get createdAt(): Date {
    return this._createdAt;
  }

}

/**
 * Profile class representing the user profile details.
 */
export class Profile {

  private _uid: string;
  private _email: string;
  private _name: string;
  private _photoURL: string;
  private _bio: string;
  private _emailVerified: boolean;

  /**
   * Parameterized constructor.
   * @param uid the unique ID of the profile
   * @param email the email of the profile
   * @param name the name of the profile
   * @param photoURL the URL of the profile photo
   * @param bio the profile's bio
   * @param emailVerified true if the user's email is verified, false otherwise
   */
  constructor(uid: string, email: string, name: string, photoURL: string, bio: string, emailVerified: boolean) {
    this._uid = uid;
    this._email = email;
    this._name = name;
    this._photoURL = photoURL;
    this._bio = bio;
    this._emailVerified = emailVerified;
  }

  /**
   * The the unique ID of the profile.
   */
  get uid(): string {
    return this._uid;
  }

  /**
   * Get the email of the profile.
   */
  get email(): string {
    return this._email;
  }

  /**
   * Get the name of the profile.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Get the URL of the profile photo.
   */
  get photoURL(): string {
    return this._photoURL;
  }

  /**
   * Updates the photoURL with URL passed in param.
   * @param photoURL the photoURL
   */
  set photoURL(photoURL: string) {
    this._photoURL = photoURL;
  }

  /**
   * Get the profile's bio.
   */
  get bio(): string {
    return this._bio;
  }

  /**
   * Returns true if the user's email is verified, false otherwise.
   */
  get emailVerified(): boolean {
    return this._emailVerified;
  }

}

export class Profile {

  private _uid: string;
  private _email: string;
  private _name: string;
  private _photoURL: string;
  private _bio: string;
  private _emailVerified: boolean;


  constructor(uid: string, email: string, name: string, photoURL: string, bio: string, emailVerified: boolean) {
    this._uid = uid;
    this._email = email;
    this._name = name;
    this._photoURL = photoURL;
    this._bio = bio;
    this._emailVerified = emailVerified;
  }


  get uid(): string {
    return this._uid;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get photoURL(): string {
    return this._photoURL;
  }

  get bio(): string {
    return this._bio;
  }

  get emailVerified(): boolean {
    return this._emailVerified;
  }
}

import { UserJSON } from "./user.interface"

export class User implements UserJSON {
  uid: string = ''
  name: string | null = null
  photo: string | null = null
  isAdmin: boolean = false

  constructor(user: UserJSON) {
    Object.assign(this, user)
  }

  get model(): UserJSON {
    return {
      uid: this.uid,
      name: this.name,
      photo: this.photo,
      isAdmin: this.isAdmin
    }
  }
}
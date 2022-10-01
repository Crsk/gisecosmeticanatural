import { IUser } from "./user.interface"

export class User implements IUser {
  uid: string = ''
  name: string | null = null
  photo: string | null = null
  isAdmin: boolean = false

  constructor(iUser: IUser) {
    Object.assign(this, iUser)
  }

  get model(): IUser {
    return {
      uid: this.uid,
      name: this.name,
      photo: this.photo,
      isAdmin: this.isAdmin
    }
  }
}
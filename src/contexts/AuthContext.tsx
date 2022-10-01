import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, updateCurrentUser, UserCredential } from "firebase/auth"
import { createContext, useContext, useEffect } from "react"
import { auth } from "../utils/firebase"
import { User as FirebaseUser } from "@firebase/auth-types"
import { setActiveUser, setLogoutState } from "../features/user/userSlice"
import { useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
import { upsertUser } from '../data/users/services/userService'
import { IUser } from "../data/users/models/user.interface"
import { User } from "../data/users/models/user.class"

export const AuthContext = createContext<{ googleSignIn: () => void; logout: () => void; }>({ googleSignIn: () => { }, logout: () => { } })

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [_, setCookie, removeCookie] = useCookies(['user'])
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubsscribe = onAuthStateChanged(auth, currentUser => _registerUser(currentUser as FirebaseUser))
    return () => unsubsscribe()
  }, [])

  /**
   * Prompts a Google sign in popup
   */
  const googleSignIn = async (): Promise<UserCredential> => await signInWithPopup(auth, new GoogleAuthProvider())

  /**
   * Signs out the user, tells redux to clean the store and removes the cookie
   */
  const logout = async () => {
    await signOut(auth)
    dispatch(setLogoutState())
    removeCookie("user")
  }

  /**
   * Register the user in the redux store and the cookie
   * @param firebaseUser - The user that Google Auth returns after a successful login
   */
  const _registerUser = async (firebaseUser: FirebaseUser): Promise<void | null> => {
    if (!firebaseUser) return null

    const user = _convertUser(firebaseUser)
    _dispatchUser(user.model)
    _persistUser(user.model)
    _upsertUser(user)
  }

  /**
   * Converts the Firebase user to User class instance
   * @param firebaseUser - The user that Google Auth returns after a successful login
   * @returns An instance of {@link User}
   */
  const _convertUser = (firebaseUser: FirebaseUser): User => {
    const userModel: IUser = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      photo: firebaseUser.photoURL,
      isAdmin: false
    }
    return new User(userModel)
  }

  /**
   * Dispatches the user to the redux store so that it can be used in the app
   * next time the app is loaded, the user will be loaded from the cookie until the user logs out
   */
  const _dispatchUser = (userModel: IUser): void => {
    dispatch(setActiveUser(userModel))
  }

  /**
   * Stores the user in the cookie so that it can be retrieved on page refresh
   * @param user - The user to be stored on the cookie
   */
  const _persistUser = (userModel: IUser): void => {
    setCookie('user', userModel)
  }

  /**
   * Updates the database with the user's data
   * @param user - The user to store on database
   */
  const _upsertUser = (user: User): void => {
    upsertUser(user.model)
  }

  return (
    <AuthContext.Provider value={{ googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
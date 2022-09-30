import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { createContext, useContext, useEffect } from "react"
import { auth } from "../utils/firebase"
import { User } from "@firebase/auth-types"
import { setActiveUser, setLogoutState } from "../features/user/userSlice"
import { useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
export const AuthContext = createContext<{ googleSignIn: () => void; logout: () => void; }>({ googleSignIn: () => { }, logout: () => { } })

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [_, setCookie, removeCookie] = useCookies(['user'])
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubsscribe = onAuthStateChanged(auth, currentUser => _registerUser(currentUser as User))
    return () => unsubsscribe()
  }, [])

  const googleSignIn = async () => await signInWithPopup(auth, new GoogleAuthProvider())
  const logout = async () => {
    await signOut(auth)
    dispatch(setLogoutState())
    removeCookie("user")
  }

  /**
   * @description Register the user in the redux store and in the cookie
   */
  const _registerUser = (user: User) => {
    if (!user) return null

    dispatch(setActiveUser({
      displayName: user.displayName,
      photoURL: user.photoURL
    }))
    setCookie('user', user)
  }

  return (
    <AuthContext.Provider value={{ googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
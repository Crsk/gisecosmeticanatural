import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../utils/firebase"
import { User } from "@firebase/auth-types"
export const AuthContext = createContext<{ googleSignIn: () => void; logout: () => void; user: User | null; }>({ googleSignIn: () => { }, logout: () => { }, user: null })

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logout = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubsscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as any)
    })

    return () => unsubsscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ googleSignIn, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
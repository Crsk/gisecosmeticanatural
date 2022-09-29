import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { googleSignIn, logout, user } = useAuth()

  const handleSignOut = async () => {
    try { await logout() } catch (error) { console.log(error) }
  }

  const handleGoogleSignIn = async () => {
    try { await googleSignIn() } catch (error) { console.log(error) }
  }

  if (user?.displayName) {
    return (<>
      <div>User: {user?.displayName}</div>
      <button className="btn btn-secondary" onClick={handleSignOut}>Sign Out</button>
    </>)
  }
  else if (!user?.displayName) {
    return (<>
      <button className="btn btn-primary" onClick={handleGoogleSignIn}>Sign In</button>
    </>)
  }

  return <div>...</div>
}
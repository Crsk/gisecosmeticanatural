import { Button, Progress } from '@chakra-ui/react'
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
      <Button onClick={handleSignOut}>Sign Out</Button>
    </>)
  }
  else if (!user?.displayName) {
    return (<>
      <Button onClick={handleGoogleSignIn}>Sign In</Button>
    </>)
  }

  return <Progress />
}
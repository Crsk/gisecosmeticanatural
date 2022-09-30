import Headroom from 'react-headroom'
import { useSelector } from 'react-redux'
import { useAuth } from '../contexts/AuthContext'
import { selectUser } from '../features/user/userSlice'

export default function Header() {
  const user = useSelector(selectUser)
  const { googleSignIn, logout } = useAuth()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Headroom>
      <div className="navbar bg-black">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl text-slate-200">Gise Cosmética Natural</a>
        </div>
        {!!user?.displayName
          ? <>
            <div className="text-white pr-4">{user.displayName}</div>
            <div className="dropdown dropdown-end">

              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><a onClick={handleSignOut}>Cerrar Sesión</a></li>
              </ul>
            </div>
          </>
          : <>
            <button className="btn btn-primary" onClick={handleGoogleSignIn}>Iniciar Sesión</button>
          </>
        }
      </div>
    </Headroom>
  )
}
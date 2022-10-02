import Headroom from 'react-headroom'
import { useSelector } from 'react-redux'
import { useAuth } from '../contexts/AuthContext'
import { selectUser } from '../features/user/userSlice'
import { Link } from 'react-router-dom'

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
      <div className="navbar bg-[#bf7b5a]">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl text-slate-200" to='/'>Gise Cosmética Natural</Link>
        </div>
        {!!user?.name
          ? <>
            <div className="text-white pr-4 invisible sm:visible">{user.name}</div>
            <div className="dropdown dropdown-end">

              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photo} />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <Link to='/new-product'>Crear Producto</Link>
                </li>
                <li><a onClick={handleSignOut}>Cerrar Sesión</a></li>
              </ul>
            </div>
          </>
          : <button className="btn btn-primary" onClick={handleGoogleSignIn}>Iniciar Sesión</button>
        }
      </div>
    </Headroom>
  )
}
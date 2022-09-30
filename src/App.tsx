import './App.css'
import AuthContextProvider from './contexts/AuthContext'
import { themeChange } from 'theme-change'
import { useEffect } from 'react'
import Header from './components/Header'
import { useAppDispatch } from './app/hooks'
import { setActiveUser, setLogoutState } from './features/user/userSlice'
import { useCookies } from "react-cookie"

function App() {
  const dispatch = useAppDispatch()
  const [cookies] = useCookies(['user'])

  /**
   * @description If the user is logged in and saved in the cookie, then the user is set in the redux store
   */
  function _persistUser() {
    cookies.user
      ? dispatch(setActiveUser({
        displayName: cookies.user.displayName,
        photoURL: cookies.user.photoURL
      }))
      : dispatch(setLogoutState())
  }

  useEffect(() => {
    themeChange(false)
    _persistUser()
  }, [])

  return <AuthContextProvider>
    {/* <select className="select w-full max-w-xs" data-choose-theme>
      <option disabled selected>Pick a theme</option>
      <option value="">Default</option>
      <option value="light">Light</option>
      <option value="dark">dark</option>
      <option value="mytheme">mytheme</option>
    </select> */}
    <Header />
  </AuthContextProvider>
}

export default App
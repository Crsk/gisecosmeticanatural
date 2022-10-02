import './App.css'
import AuthContextProvider from './contexts/AuthContext'
import { themeChange } from 'theme-change'
import { useEffect } from 'react'
import Header from './components/Header'
import { useAppDispatch } from './app/hooks'
import { setActiveUser, setLogoutState } from './features/user/userSlice'
import { useCookies } from "react-cookie"
import { Routes, Route } from 'react-router-dom'
import Products from './pages/products/Products.page'
import NewProduct from './pages/new-product/NewProduct.page'
import { Toaster } from 'react-hot-toast'

function App() {
  useEffect(() => {
    themeChange(false)
    _persistUser()
  }, [])
  const dispatch = useAppDispatch()
  const [cookies] = useCookies(['user'])

  /**
   * Retreives the User and sets they on redux store in case the user is logged in and saved on the cookie
   */
  function _persistUser() {
    cookies.user
      ? dispatch(setActiveUser(cookies.user))
      : dispatch(setLogoutState())
  }

  return <AuthContextProvider>
    <Header />
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/new-product" element={<NewProduct />} />
    </Routes>
    <Toaster />
  </AuthContextProvider>
}

export default App
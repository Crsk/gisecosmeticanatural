import './App.css'
import AuthContextProvider from './contexts/AuthContext'
import Login from './pages/login'
import { themeChange } from 'theme-change'
import { useEffect } from 'react'


function App() {
  useEffect(() => {
    themeChange(false)
  }, [])

  return <AuthContextProvider>
    {/* <select className="select w-full max-w-xs" data-choose-theme>
      <option disabled selected>Pick a theme</option>
      <option value="">Default</option>
      <option value="light">Light</option>
      <option value="dark">dark</option>
      <option value="mytheme">mytheme</option>
    </select> */}
    <Login />
  </AuthContextProvider>
}

export default App
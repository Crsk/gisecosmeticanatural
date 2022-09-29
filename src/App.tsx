import './App.css'
import AuthContextProvider from './contexts/AuthContext'
import Login from './pages/login'

function App() {
  return <AuthContextProvider>
    <Login />
  </AuthContextProvider>
}

export default App
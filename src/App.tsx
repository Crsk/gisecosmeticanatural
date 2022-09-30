import './App.css'
import AuthContextProvider from './contexts/AuthContext'
import Login from './pages/login'
import { themeChange } from 'theme-change'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { increment, decrement } from './features/counter/counterSlice'

function App() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  function handleIncrement() {
    dispatch(increment())
  }

  function handleAddAmount() {
    dispatch(decrement())
  }

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
    <div className="btn btn-accent" onClick={handleAddAmount}>
      Decrement {count}
    </div>
    <div className="btn btn-primary" onClick={handleIncrement}>
      Increment {count}
    </div>

  </AuthContextProvider>
}

export default App
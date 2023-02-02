import React from 'react'
import { Route, Routes } from 'react-router-dom'

import MyHeader from './components/MyHeader'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Todo from './pages/Todo'

import './App.css'

export const AuthContext = React.createContext()

function App() {
  return (
    <div className="App">
      <MyHeader />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  )
}

export default App

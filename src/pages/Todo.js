import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TodoList from '../components/TodoList'

const Todo = () => {
  const navigate = useNavigate()
  const token = window.localStorage.getItem('userToken')

  useEffect(() => {
    if (!token) {
      navigate('/signin', { replace: true })
    }
  }, [token])

  return (
    <div>
      <TodoList />
    </div>
  )
}

export default Todo

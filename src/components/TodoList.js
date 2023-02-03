import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const TodoList = () => {
  const token = window.localStorage.getItem('userToken')

  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState([])

  // Todo 작성
  const createTodo = () => {
    axios({
      url: 'https://pre-onboarding-selection-task.shop/todos',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        todo: newTodo,
      },
    })
      .then((res) => {
        // 성공한다면 input은 비워둔다.
        setNewTodo('')
        getTodos()
      })
      .catch((err) => {
        alert('등록 실패')
      })
  }

  // Todo 가져오기
  const getTodos = () => {
    axios({
      url: 'https://pre-onboarding-selection-task.shop/todos',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        todo: newTodo,
      },
    })
      .then((res) => {
        setTodoList(res.data)
      })
      .catch((err) => {
        alert('가져오기 실패')
      })
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <TodoForm>
      <h2>To-do List</h2>
      <div>
        <input
          type="text"
          data-testid="new-todo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          type="button"
          data-testid="new-todo-add-button"
          onClick={createTodo}
        >
          추가
        </button>
      </div>

      <ul>
        {todoList.map((it) => (
          <li key={it.id}>
            <label>
              <input type="checkbox" value={it.id} />
              <span>{it.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button data-testid="delete-button">삭제</button>
          </li>
        ))}
      </ul>
    </TodoForm>
  )
}

const TodoForm = styled.div`
  h2 {
    padding: 30px 0;
    font-size: 20px;
    text-align: center;
  }

  input {
    height: 36px;
    border: 1px solid #e0e2e7;
    border-radius: 8px;
    background-color: #fff;
  }

  button {
    width: 60px;
    height: 36px;
    border-radius: 4px;
    font-size: 16px;
    background-color: #6c5ce7;
    color: #fff;
  }
`

export default TodoList

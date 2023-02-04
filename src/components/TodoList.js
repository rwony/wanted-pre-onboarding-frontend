import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const TodoList = () => {
  const token = window.localStorage.getItem('userToken')

  const [newTodo, setNewTodo] = useState('') // 새로운 Todo Input
  const [todoList, setTodoList] = useState([]) // Todo List
  const [isEdit, setIsEdit] = useState(false) // 수정 모드 여부
  const [editTodoItem, setEditTodoItem] = useState(0) // 현재 수정하는 Todo id 저장
  const [editTodo, setEditTodo] = useState('')

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
        console.console.log(err)
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
        console.console.log(err)
      })
  }

  // Todo 삭제
  const deleteTodo = (id) => {
    axios({
      url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        getTodos()
      })
      .catch((err) => {
        console.console.log(err)
      })
  }

  // Todo 수정
  const updateTodo = (checked, id, todo) => {
    axios({
      url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        todo: todo,
        isCompleted: checked,
      },
    })
      .then((res) => {
        setIsEdit(false)
        getTodos()
      })
      .catch((err) => {
        console.log(err)
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
              <input
                type="checkbox"
                checked={it.isCompleted}
                onChange={(e) => {
                  setEditTodo(it.todo)
                  updateTodo(e.target.checked, it.id, it.todo)
                }}
              />

              {isEdit && it.id === editTodoItem ? (
                <input
                  type="text"
                  data-testid="modify-input"
                  defaultValue={it.todo}
                  onChange={(e) => {
                    setEditTodo(e.target.value)
                  }}
                />
              ) : (
                <span>{it.todo}</span>
              )}
            </label>

            {isEdit && it.id === editTodoItem ? (
              <>
                <button
                  data-testid="submit-button"
                  onClick={(e) => {
                    setIsEdit(true)
                    setEditTodoItem(it.id)
                    updateTodo(it.isCompleted, it.id, editTodo)
                  }}
                >
                  제출
                </button>
                <button
                  data-testid="cancel-button"
                  onClick={() => {
                    setIsEdit(false)
                  }}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  data-testid="modify-button"
                  onClick={() => {
                    setIsEdit(true)
                    setEditTodoItem(it.id)
                    setEditTodo(it.todo)
                  }}
                >
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => deleteTodo(it.id)}
                >
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </TodoForm>
  )
}

const TodoForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    padding: 30px 0;
    font-size: 20px;
    text-align: center;
  }

  span {
    margin-right: 8px;
  }

  input {
    height: 36px;
    margin-right: 8px;
    border: 1px solid #e0e2e7;
    border-radius: 8px;
    background-color: #fff;
  }

  button {
    width: 48px;
    height: 32px;
    border-radius: 4px;
    font-size: 14px;
    background-color: #6c5ce7;
    color: #fff;

    :not(:last-child) {
      margin-right: 8px;
    }
  }
`

export default TodoList

import React from 'react'
import axios from 'axios'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Signin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [disabledBtn, setDisabledBtn] = useState(true)

  const token = window.localStorage.getItem('userToken')

  // 토큰이 있다면, 리다이렉트
  useEffect(() => {
    if (token) {
      navigate('/todo', { replace: true })
    }
  }, [token])

  // 회원가입 진행
  const onSubmitSignin = (e) => {
    e.preventDefault()

    axios({
      url: 'https://pre-onboarding-selection-task.shop/auth/signup',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: email,
        password: pwd,
      },
    })
      .then((res) => {
        navigate('/signin')
      })
      .catch((err) => {
        alert('회원가입 실패')
      })
  }

  // 유효성 검사
  useEffect(() => {
    if (email.includes('@') && pwd.length >= 8) {
      setDisabledBtn(false)
    } else {
      setDisabledBtn(true)
    }
  }, [email, pwd])

  return (
    <SignupForm>
      <h2>회원가입</h2>

      <form onSubmit={onSubmitSignin}>
        <div className="form_input">
          <div className="form_input_item">
            <label htmlFor="user-email">E-mail</label>
            <input
              type="text"
              id="user-email"
              data-testid="email-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="form_input_item">
              <label htmlFor="user-password">Password</label>
              <input
                type="password"
                id="user-password"
                data-testid="password-input"
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          data-testid="signup-button"
          disabled={disabledBtn}
        >
          회원가입
        </button>
      </form>
    </SignupForm>
  )
}

const SignupForm = styled.div`
  h2 {
    padding: 30px 0;
    font-size: 20px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .form_input {
      margin-bottom: 20px;
    }

    .form_input_item {
      margin-bottom: 20px;

      label,
      input {
        letter-spacing: -0.05em;
      }

      label {
        margin-right: 8px;
        font-size: 14px;
        font-weight: 500;
      }

      input {
        height: 36px;
        border: 1px solid #e0e2e7;
        border-radius: 8px;
        background-color: #fff;
      }
    }

    button {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 16px;
      background-color: #6c5ce7;
      color: #fff;

      &:disabled {
        background-color: #8c8d96;
        cursor: not-allowed;
      }
    }
  }
`

export default Signin

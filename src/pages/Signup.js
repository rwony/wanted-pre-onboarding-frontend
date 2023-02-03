import React from 'react'
import axios from 'axios'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div>
      <h2>회원가입</h2>

      <form onSubmit={onSubmitSignin}>
        <div>
          <label htmlFor="user-email">E-mail</label>
          <input
            type="text"
            id="user-email"
            data-testid="email-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="user-password">Password</label>
          <input
            type="password"
            id="user-password"
            data-testid="password-input"
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>

        <button
          type="submit"
          data-testid="signup-button"
          disabled={disabledBtn}
        >
          회원가입
        </button>
      </form>
    </div>
  )
}

export default Signin

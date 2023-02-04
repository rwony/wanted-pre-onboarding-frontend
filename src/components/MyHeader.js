import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styled from 'styled-components'

const MyHeader = () => {
  const token = window.localStorage.getItem('userToken')
  const navigate = useNavigate()

  const Logout = () => {
    window.localStorage.removeItem('userToken')
    navigate('/', { replace: true })
  }

  return (
    <Header>
      <h1>
        <Link to={'/'}>2023 원티드 프리온보딩 프론트엔드 - 선발 과제</Link>
      </h1>

      <nav>
        <ul>
          {!token ? (
            <>
              <li>
                <Link to={'signin'}>로그인</Link>
              </li>
              <li>
                <Link to={'signup'}>회원가입</Link>
              </li>
            </>
          ) : (
            <li>
              <button type="button" onClick={Logout}>
                로그아웃
              </button>
            </li>
          )}
        </ul>
      </nav>
    </Header>
  )
}

const Header = styled.header`
  display: flex;
  flex-direction: column-reverse;

  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);

  h1 {
    align-items: center;
    padding: 20px 0;
    font-size: 24px;
    text-align: center;
    letter-spacing: -0.02em;
  }

  nav {
    background-color: #f7f8fa;

    ul {
      display: flex;
      justify-content: end;

      li {
        padding: 6px 0;

        button,
        a {
          font-size: 14px;
          font-weight: 700;
        }

        &::after {
          content: '';
          margin-right: 16px;
        }
      }
    }
  }
`

export default MyHeader

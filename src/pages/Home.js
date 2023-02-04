import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Home = () => {
  return (
    <main>
      <header className="visually-hidden">메인 페이지</header>

      <MenuItem>
        <ul>
          <li>
            <Link to={'/todo'}>To-do List 이동</Link>
          </li>
        </ul>
      </MenuItem>
    </main>
  )
}

const MenuItem = styled.div`
  padding: 40px 0;
  font-size: 18px;
  text-align: center;
`

export default Home

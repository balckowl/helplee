import React from 'react'
import './Home.module.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to='/'>top</Link>
      <Link to='/boxshadow'>boxshadow</Link>
    </div>
  )
}

export default Home
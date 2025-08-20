import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <section className='topBarSection'>
        <div className="companyTitle">
            <Link to='/'className='link'><h1>Foddie</h1></Link>
        </div>
        <div className="searchBar">
            <input type="text" placeholder="Search..." />
        </div>
        <div className="userAuth">
            Login / SignUp
        </div>
    </section>
  )
}

export default TopBar
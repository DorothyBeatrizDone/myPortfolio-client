import React from 'react'

import img from "../../assets/images/graduate_icon.png"
import "./Header.scss"
const Header = () => {
  return (
    <div className="header">
        <div className='header__icon'>
            <img
                src={img}
                alt="graduate icon"
            />
        </div>
        <div className='header__title'>
            <h1 className = "header__text">MyPortfolio</h1>
        </div>
    </div>
  )
}

export default Header;
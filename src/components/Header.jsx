import React from 'react'
import searchIcon from "../assets/images/search_icon.png";
import profileImg from "../assets/images/profile_image.png";
import { FaBell } from "react-icons/fa";
export default function Header() {
  return (
    <header className='header'>
        <div className="global-search-fields">
            <input type="text" />
            <span>
                <img src={searchIcon} alt="" />
            </span>
        </div>
        <div className="profile-right-part">
            <FaBell className="bell-icon"/>
            <img src={profileImg} className='profile-image' alt="profile" />
        </div>
    </header>
  )
}

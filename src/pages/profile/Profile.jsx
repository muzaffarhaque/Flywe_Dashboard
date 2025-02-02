import React, { useState } from 'react';
import bgImage from '../../assets/images/dash-bg.png';
import menuBar from '../../assets/images/menue.png';
import profilePlaceholder from '../../assets/images/profile_image.png'; // Default profile image
import { SideNaveBar } from '../../components';

export default function Profile() {
  const [isShow, setIsShow] = useState(false);
  const [profileImage, setProfileImage] = useState(profilePlaceholder);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <section className='profile-main-section'>
      <img src={bgImage} alt="" className='bg-wave-image' />
      <div className={`profile-frame`}>
        <div className={`sidenav-bar ${isShow ? 'show' : ''}`}>
          <SideNaveBar />
        </div>
        <div className="profile-body">
          <div className="profile-header">
            <img src={menuBar} onClick={() => setIsShow(!isShow)} className='menu-icon' alt="" />
            <h3>Profile</h3>
          </div>
          <div className="profile-content">
            <div className="upload-profile-head">
              <img src={profileImage} alt="profile" className='upload-profile-img' />
              <input 
                type="file" 
                name="profileImage" 
                id="profileImage" 
                accept="image/*" 
                onChange={handleImageUpload} 
                style={{ display: "none" }} 
              />
              <button 
                className='upload-profile-btn' 
                onClick={() => document.getElementById('profileImage').click()}
              >
                Upload New Picture
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

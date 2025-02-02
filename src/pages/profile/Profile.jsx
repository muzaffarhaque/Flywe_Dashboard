import React, { useEffect, useState } from 'react';
import bgImage from '../../assets/images/dash-bg.png';
import menuBar from '../../assets/images/menue.png';
import profilePlaceholder from '../../assets/images/profile_image.png'; 
import { SideNaveBar } from '../../components';  
import { toast } from 'react-toastify';
import { commonAllApi, commonAllAuthApi, commonGetAuthApi } from '../../server/Api';
import { isOk } from '../../utils/reusablefunctions';
import { InputsBox } from '../../components/inputs';

export default function Profile() {
  const [isShow, setIsShow] = useState(false);
  const [profileImage, setProfileImage] = useState(profilePlaceholder);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    oldPassword: '',
    password: '',  
    confirmNewPassword: '',
  });

  const fetchProfileData = async () => {
    try {
      const res = await commonGetAuthApi('/v1/admin/getProfile');
      console.log("Profile data:", res);
      if (isOk(res?.status)) {
        setFormData({
          userName: res?.data?.data?.fullName || '',
          email: res?.data?.data?.email || '',
          phoneNumber: res?.data?.data?.phone || '',
        });
      } else {
        toast.error("Failed to fetch profile data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("An error occurred while fetching your profile data.");
    }
  };
  useEffect(()=>{
   
    fetchProfileData();
  },[])
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };


  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (formData.password !== formData.confirmNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }
  
    const requestData = {
      fullName: formData.userName,
      firstName: formData.userName.split(" ")[0] || "",
      lastName: formData.userName.split(" ")[1] || "",
      phone: formData.phoneNumber,
      email: formData.email,
      oldPassword: formData.oldPassword,
      newPassword: formData.password,
    };
  
    try {
      const res = await commonAllAuthApi('/v1/admin/update', requestData, 'put');
      console.log("Profile update response:", res, requestData);
      
      if (isOk(res?.status)) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile.");
    }finally{
        setFormData({ ...formData,oldPassword:'',password:'',confirmNewPassword:''});
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
          <form onSubmit={handleSubmit}>
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
                  type="button"
                >
                  Upload New Picture
                </button>
              </div>

            
              <div className="personal-information-frame">
                <h2>Personal Information:</h2>
                <div className="form-group">
                  <label htmlFor="userName">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    required
                    value={formData.userName}
                    onChange={(e) => handleChange("userName", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  />
                </div>
              </div>

           
              <div className="personal-information-frame pass-Management">
                <h2>Password Management:</h2>
                
                <InputsBox
                  classes="password-class"
                  label="Old Password"
                  value={formData.oldPassword}
                  onChange={(value) => handleChange("oldPassword", value)}
                />

                <InputsBox
                  classes="password-class"
                  label="New Password"
                  value={formData.password}
                  onChange={(value) => handleChange("password", value)}
                />

                <InputsBox
                  classes="password-class"
                  label="Confirm New Password"
                  value={formData.confirmNewPassword}
                  onChange={(value) => handleChange("confirmNewPassword", value)}
                />
              </div>

              <button type="submit" className="primary-btn mx-auto save-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

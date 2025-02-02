import React from 'react'
import filterIon from '../assets/images/filter-icon.png';
import searchIcon from '../assets/images/search_icon.png';
export default function Table() {
  return (
    <div className='main-table-section'>
        <div className="table-header">
            <div className="text-heading-frame">
            <h4 className='title-head' >User Management</h4>
            <p className='text-para'>View historical data of actions taken within the app.</p>
            </div>
            <div className="right-search-filter">
                <div className="global-search-fields">
                            <input type="text" />
                            <span>
                                <img src={searchIcon} alt="" />
                            </span>
                </div>
                 <img src={filterIon} alt="" className='filter-icon' />
            </div>
        </div>
    </div>
  )
}

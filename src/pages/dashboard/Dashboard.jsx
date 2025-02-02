import React from 'react'
import Table from '../../components/Table'
import LineChartCard from '../../components/LineChartCard'
import BarChart from '../../components/BarChat'

export default function Dashboard() {
  return (
    <div className='dashboard-root-wrapper'>
      <h6 className='fs-20-16 dash-title'>Analytics</h6>
      <div className="dash-graph-wrapper">
        <div className="graph-box-wrapper">
          <div className="graph-box">
            <p className='title'>Active Users</p>
            <h1>5556</h1>
            <div className="graph">
              <LineChartCard color='#199FB1'/>
            </div>
            <a className='view-all'>View All Users</a>
          </div>
          <div className="graph-box">
            <p className='title'>Active Users</p>
            <h1>5556</h1>
            <div className="graph">
              <LineChartCard color='#0FD43E' info={[10, 250, 50, 280, 380, 250]}/>
            </div>
            <a className='view-all'>View All Users</a>
          </div>
          <div className="graph-box">
            <p className='title'>Active Users</p>
            <h1>5556</h1>
            <div className="graph">
              <LineChartCard color='' info={[250, 140, 430, 300, 280, 140]}/>
            </div>
            <a className='view-all'>View All Users</a>
          </div>
          <div className="graph-box">
            <p className='title'>Active Users</p>
            <h1>5556</h1>
            <div className="graph">
              <LineChartCard color='#FF0838' info={[460, 350, 500, 300, 480, 220]}/>
            </div>
            <a className='view-all'>View All Users</a>
          </div>
          <div className="graph-box earning-graph-box">
            <p className='title'>Total Earning</p>
            <h1>5556</h1>
            <div className="graph">
              <LineChartCard color='#cbbd84'/>
            </div>
          </div>
        </div>
        <div className="graph-bar-chat-wrapper">
          <h1>Company Growth</h1>
          <div className="graph-bar-box">
            <BarChart/>
          </div>
          <div className="footer-month-frame">
            <button className='secondary-btn active'>Month</button>
            <button className='secondary-btn'>Year</button>
            <button className='secondary-btn'>2 Year</button>
            <button className='secondary-btn'>3 year</button>
          </div>

        </div>
      </div>
      <div className="">
          <Table isSearch={true}  isFilter={true} title="" subTitle=""/>
      </div>
    </div>
  )
}

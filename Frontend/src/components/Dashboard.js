import './../styles/Dashboard.css';

import React from 'react';
import Header from './Header';
import DashboardNav from './DashboardNav';
import JobListings from './JobListings';
import Footer from './Footer';
import Filters from './Filters.js';

const Dashboard = ({ user }) => {
    const [filterObj, setFilterObj] = React.useState([]);

    return (
    <div>
        <div className='dashboard'>
            <Header />
            <DashboardNav />
            <div className='filters'>
              <Filters setFilterObj={setFilterObj} filterObj={filterObj}/>
            </div>
            <div className='jobListings'>
                <JobListings user={user} filterObj={filterObj}/>
            </div>
            <Footer />
        </div>
    </div>
    )
}

export default Dashboard;

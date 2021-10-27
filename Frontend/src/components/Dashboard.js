import './../styles/Dashboard.css';

import Header from './Header';
import DashboardNav from './DashboardNav';
import JobListings from './JobListings';
import Footer from './Footer';
import Filters from './Filters.js';

const Dashboard = ({ user }) => {
    return (
    <div>
        <div className='dashboard'>
            <Header />
            <DashboardNav />
            <div className='filters'>
              <Filters/>
            </div>
            <div className='jobListings'>
                <JobListings user={user}/>
            </div>
            <Footer />
        </div>
    </div>
    )
}

export default Dashboard;

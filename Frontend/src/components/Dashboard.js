import Header from './Header';
import DashboardNav from './DashboardNav';
import JobListings from './JobListings';

const Dashboard = ( user ) => {
    return (
        <div>
            <Header />
            <DashboardNav />
            <JobListings />
            <p>{
                // Temp
                JSON.stringify(user)
            }</p>
        </div>
    )
}

export default Dashboard;

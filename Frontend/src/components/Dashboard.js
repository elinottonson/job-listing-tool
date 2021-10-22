import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './../styles/Dashboard.css';

import Header from './Header';
import DashboardNav from './DashboardNav';
import JobListings from './JobListings';
import Footer from './Footer';
import ListingCard from './ListingCard';

const Dashboard = ({ user }) => {

  

  return (
    <Router basename='/dashboard'>
      <div className='dashboard'>
        <Switch>
          
          <Route path='job/:id' children={<ListingCard/>} />
        </Switch>
        <Header />
        <DashboardNav />
        <JobListings user={user}/>
        <Footer />
      </div>
    </Router>
  );
};

export default Dashboard;

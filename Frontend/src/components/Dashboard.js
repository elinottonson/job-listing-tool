import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './../styles/Dashboard.css';

import { isValidUser } from '../lib/Validation';

import Header from './Header';
import DashboardNav from './DashboardNav';
import JobListings from './JobListings';
import Footer from './Footer';
import ListingCard from './ListingCard';

const Dashboard = ({ user, setUser }) => {

  /* 
    ====== DOESNT WORK ======== DOESNT WORK ======= DOESNT WORK ===============
    Checks once when the component is first rendered to see if there is currently
    a user logged into the backend. This will make it (hopefully...?) so when you
    refresh on the dashboard, you stay logged in.
  */
  React.useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    };
    
    console.log('Checking for logged in user...');

    fetch('/auth', options)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('Received Response:');
        console.log(data);
        if(Object.keys(data).includes('Error')) {
          console.log(data.Error);
        }
        else {
          if(isValidUser(data.user)) {
            setUser(data.user);
          }
        }
      })
      .catch(e => { throw e; });
  }, []);

  return (
    <Router basename='/dashboard'>
      <div className='dashboard'> 
        <Header />
        <DashboardNav />
        <JobListings user={user}/>
        <Footer />
        <Switch>
          <Route 
            path='/job/:id' 
            children={<ListingCard/>}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Dashboard;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import './../styles/Dashboard.css';

import { isValidUser } from '../lib/Validation';

import Header from './Header';
import DashboardNav from './DashboardNav';
import JobListings from './JobListings';
import Footer from './Footer';
import ListingCard from './ListingCard';

const Dashboard = ({ user, setUser }) => {

  const [popupOpen, setPopupOpen] = React.useState(false);

  //searchInput takes on value false or string 
  const [searchInput, setSearchInput] = React.useState('');

  const scrollLockTarget = document.querySelector('.dashboard');

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
        if (Object.keys(data).includes('Error')) {
          console.log(data.Error);
        }
        else {
          if (isValidUser(data)) {
            setUser(data);
          }
        }
      })
      .catch(e => { throw e; });
  }, []);

  // Scroll-lock when the job listing pop-up is open
  React.useEffect(() => {
    if (popupOpen) {
      disableBodyScroll(scrollLockTarget);
    }
    else {
      clearAllBodyScrollLocks();
    }
  }, [popupOpen]);

  return (
    <Router basename='/dashboard'>
      <div className='dashboard'>
        <Header />
        <DashboardNav setSearchInput={setSearchInput} />
        <JobListings user={user} setPopupOpen={setPopupOpen} searchInput={searchInput} />
        <Footer />
        <Switch>
          <Route
            path='/job/:id'
            children={<ListingCard setPopupOpen={setPopupOpen} listingObj={popupOpen} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Dashboard;

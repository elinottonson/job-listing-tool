import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import './../styles/Dashboard.css';

import { isValidUser } from '../lib/Validation';

import Header from './Header';
import DashboardNav from './DashboardNav';
import JobListings from './JobListings';
import Footer from './Footer';
import Filters from './Filters.js';
import ListingCard from './ListingCard';
import PopupCard from './PopupCard';
import CreateListingWizard from './CreateListingWizard';
import dmImage from './../images/darkmode_login_background3.jpg';


const dmImageStyle = {
  backgroundImage: `url(${dmImage})`,
  backgroundAttachment: 'fixed',
  minWidth: '100%',
  minHeight: '100%',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  transform: 'scale(1.03)',
  zIndex: '-5',
  position: 'fixed'
};

const Dashboard = ({ user, setUser, darkTheme, setDarkTheme }) => {

  const [popupOpen, setPopupOpen] = React.useState(false);
  const [ refreshListings, setRefreshListings ] = React.useState(true);
  const [searchInput, setSearchInput] = React.useState('');
  const [filterObj, setFilterObj] = React.useState({});
  const [tags, setTags] = React.useState(['Loading...']);
  
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
        <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <DashboardNav setSearchInput={setSearchInput} />
        <div className='dashboard-content'>
          <Filters className='filters' setFilterObj={setFilterObj} filterObj={filterObj} tags={tags}/>
          <JobListings 
            user={user} 
            tags={tags}
            setPopupOpen={setPopupOpen} 
            listingObj={popupOpen}
            searchInput={searchInput} 
            filterObj={filterObj} 
            setFilterObj={setFilterObj}
            setTags={setTags}
            popupOpen={popupOpen}
            refreshListings={refreshListings}
            setRefreshListings={setRefreshListings}
             
          />
        </div>
        <Footer />
        <Switch>
          <Route
            path='/job/:id'
            children={
              <ListingCard 
                user={user} 
                setPopupOpen={setPopupOpen} 
                listingObj={popupOpen} 
                setRefreshListings={setRefreshListings}
              />
            }
          />
          <Route 
            path='/create-listing'
            children={
              <PopupCard 
                setPopupOpen={setPopupOpen} 
                title='Create New Job Listing'
                content={
                  <CreateListingWizard
                    user={user}
                    tags={tags}
                    setTags={setTags}
                    setPopupOpen={setPopupOpen}
                    setRefreshListings={setRefreshListings}
                  />
                } 
              />
            }
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Dashboard;

import React from 'react';
import { FaFilter } from 'react-icons/fa';
import './../styles/Listings.css';

import JobListing from './JobListing';

const JobListings = ({ user, setPopupOpen, searchInput = '' }) => {
  const [listings, setListings] = React.useState([]);

  React.useEffect(() => {
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ company: user.companyName })
    };

    console.log('Sending job listings request...');

    fetch('/api/listings', options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('Received response:');
        console.log(data);
        setListings(data);
      })
      .catch(e => { throw e; });
  }, []);

  return (
    <div className='job-listings-container'>
      <div className='listings-filter'>
        <FaFilter id='filter-icon' />
        Filter
      </div>
      <ul className='job-listings'>
        {!searchInput ?
          listings.map(listing => <JobListing listingObj={listing} setPopupOpen={setPopupOpen} />) :
          listings.filter(
            listing =>
              listing.title.toLowerCase().includes(searchInput)
              || listing.description.toLowerCase().includes(searchInput)
          )
            .map(listing => <JobListing listingObj={listing} setPopupOpen={setPopupOpen} />)
        }
      </ul>
    </div>
  );
};

export default JobListings;

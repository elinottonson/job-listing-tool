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

  /**
   * 
   * Takes the search input prop and returns an array of <JobListing>s 
   * filtered based on the title and description of each listing
   * 
   * @param {string} searchInput input string
   * @returns {[<JobListing>]} array of filtered job listings
   * 
   */
  const getFilteredListings = (searchInput) => {
    return (
      listings.filter(listing => 
        listing.title.toLowerCase().includes(searchInput.toLowerCase())
          || listing.description.toLowerCase().includes(searchInput.toLowerCase())
      )
        .map(listing => <JobListing listingObj={listing} setPopupOpen={setPopupOpen} />)
    );
  };

  return (
    <div className='job-listings-container'>
      <p id='num-listings'>
        {
          `Showing ${
            searchInput ? `${getFilteredListings(searchInput).length}` :
              listings.length
          } 
            results${searchInput.length ? ` for "${searchInput}"` : ''}.`
        }
      </p>
      <ul className='job-listings'>
        {searchInput ? 
          getFilteredListings(searchInput) :
          listings.map(listing => <JobListing listingObj={listing} setPopupOpen={setPopupOpen} />)
        }
      </ul>
    </div>
  );
};

export default JobListings;

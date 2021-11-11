import React from "react";
import './../styles/Listings.css';

import JobListing from "./JobListing";

const JobListings = ({ user,filterObj }) => {

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
        console.log('Received response:')
        console.log(data);
        setListings(data);
      })
      .catch(e => { throw e; });
  }, []);

  console.log(filterObj);

  return (
    <div className='job-listings-container'>
      <ul className='job-listings'>
        {listings.filter(item => filter(filterObj, item)).map(listing => <JobListing listingObj={listing} />)}
      </ul>
    </div>
  );
};

/**
 * Determines if a given listing item passes the filter criteria
 * 
 * @param {filterObject} filterObj the object containing the filter requirements
 * @param {listingObject} item the item to determine if it meets the filter requirements
 * @returns {boolean} true if the item fits the filter, false otherwise
 * 
 * @typedef {object} filterObject
 * @property {number} minExpreience
 * @property {number} maxExpreience
 * @property {number} minSalery
 * @property {number} maxSalery
 * @property {string[]} tags
 * 
 * @typedef {object} listingObject
 * @property {number} id
 * @property {string} title
 * @property {string} companyName
 * @property {string} description
 * @property {number} minYearsExperience
 * @property {number} salary
 * @property {string[]} tags
 * @property {string} createdAt
 * @property {string} updatedAt
 */
function filter(filterObj, item) {
  if (!filterObj) return true
  if (filterObj.minExpreience && item.minYearsExperience < filterObj.minExpreience) return false;
  if (filterObj.maxExpreience && item.minYearsExperience > filterObj.maxExpreience) return false;
  if (filterObj.minSalery && item.salary < filterObj.minSalery) return false;
  if (filterObj.maxSalery && item.salary > filterObj.maxSalery) return false;
  if (filterObj.tags && !filterObj.tags.every(val => item.tags.includes(val))) return false;
  return true;
}

export default JobListings;

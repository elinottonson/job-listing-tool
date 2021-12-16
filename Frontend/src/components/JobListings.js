import React from 'react';
import { useHistory } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import './../styles/Listings.css';

import JobListing from './JobListing';

const JobListings = (
  { user, setPopupOpen, searchInput = '', filterObj, setFilterObj, setTags, popupOpen, refreshListings, setRefreshListings }
) => {
  
  const [listings, setListings] = React.useState([]);
  const [ managerListings, setManagerListings ] = React.useState(false);
  const [ createListingOpen, setCreateListingOpen ] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    if(refreshListings) {
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
          const tags = new Set(); // So No duplicates
          data.forEach(listing=>listing.tags.forEach(tag=>tags.add(tag)));
          setTags(Array.from(tags));
          setRefreshListings(false);
        })
        .catch(e => { throw e; });
    }
  }, [refreshListings]);

  /**
   * 
   * Takes the search input prop and returns an array of ListingObjects 
   * filtered based on the title and description of each listing
   * 
   * @param {string} searchInput input string
   * @returns {[ListingObject]} array of filtered listing objects
   * 
   */
  const getSearchedListings = (searchInput) => {
    return (
      listings.filter(listing => 
        listing.title.toLowerCase().includes(searchInput.toLowerCase())
          || listing.description.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  /**
   * 
   * Take an array of ListingObjects and filters them based on the selected options
   * and returns an array of <JobListing> components
   * 
   * @param {ListingObject} l input array of ListingObjects
   * @param {Boolean} managerView whether or not the manager has chosen to view
   *                              only their own listings
   * @returns {[<JobListing>]} array of filtered job listing components
   */
  const getFilteredListings = (l) => {
    return l.filter(listing => filterFromOptions(filterObj, listing, managerListings))
      .map(listing => <JobListing 
        listingObj={listing} 
        setPopupOpen={setPopupOpen} 
        popupOpen={popupOpen} 
        filterObj={filterObj} 
        setFilterObj={setFilterObj} />);
  };  

  /**
  * Determines if a given listing item passes the filter criteria
  * 
  * @param {filterObject} filterObj the object containing the filter requirements
  * @param {listingObject} item the item to determine if it meets the filter requirements
  * @returns {boolean} true if the item fits the filter, false otherwise
  * 
  * @typedef {object} filterObject
  * @property {number} minExperience
  * @property {number} maxExperience
  * @property {number} minSalary
  * @property {number} maxSalary
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
  function filterFromOptions(filterObj, item, managerView) {
    if(managerView && item.managerId !== user.employeeId) return false;
    if (!filterObj) return true;
    if (filterObj.minExperience && item.minYearsExperience < filterObj.minExperience) return false;
    if (filterObj.maxExperience && item.minYearsExperience > filterObj.maxExperience) return false;
    if (filterObj.minSalary && item.salary < filterObj.minSalary) return false;
    if (filterObj.maxSalary && item.salary > filterObj.maxSalary) return false;
    if (filterObj.tags && !filterObj.tags.every(val => item.tags.includes(val))) return false;
    return true;
  }

  return (
    <div className='job-listings-container'>
      <div className='listings-container-header'>
        <p id='num-listings'>
          {
            `Showing ${
              searchInput ? `${getFilteredListings(getSearchedListings(searchInput)).length}` :
                getFilteredListings(listings).length
            } 
              results${searchInput.length ? ` for "${searchInput}"` : ''}.`
          }
        </p>
        {user.isManager ? 
          <div>
            <button
              onClick={() => setManagerListings(!managerListings)}
              id={managerListings ? 'manager-listings-on' : 'manager-listings-off'}
            >Show Only Own Listings</button>
            <FaPlus
              onClick={() => {
                history.push('/create-listing');
                setPopupOpen(true);
              }}
              id='add-listing-btn'
            />
          </div>
          : <></>}
      </div>
      <ul className='job-listings'>
        {searchInput ? 
          getFilteredListings(getSearchedListings(searchInput)) :
          getFilteredListings(listings)
        }
      </ul>
    </div>
  );
};

export default JobListings;

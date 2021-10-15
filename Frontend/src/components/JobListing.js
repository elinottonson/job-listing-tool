import React from 'react';

/*
  Sample Job Listing Object
  {
    "id": 51,
    "title": "Software Engineer I",
    "companyName": "Techgenix",
    "description": "Entry level Software Engineering role on an Agile team",
    "minYearsExperience": 0,
    "salary": 67848,
    "tags": [
      "Kotlin", 
      "React",
      "MySQL",
      "Git"
    ],
    "createdAt": "2021-10-08T02:23:26.911Z",
    "updatedAt": "2021-10-08T02:23:26.911Z"
  }
*/

const JobListing = ({ listingObj }) => {
  return (
      <li className='job-listing'>
        <div className='listing-header'>
          <div className='title-sal'>
            <h2 id='title'>{listingObj.title}</h2>
            <p id='salary'>
              {`$${Math.floor(listingObj.salary/1000)},${listingObj.salary % 1000}`}
            </p>
          </div>
          <div className='manager-dep'>
            <p id='manager-name'>MANAGER_NAME</p>
            <p id='department'>DEPARTMENT</p>
          </div>
        </div>
        <p className='listing-desc'>{listingObj.description}</p>
        <div className='listing-footer'>
            <ul className='tags'>
              {listingObj.tags.map(tag => <li>{tag}</li>)}
            </ul>
            <p id='date'>{listingObj.createdAt}</p>
        </div>
      </li>
  );
};

export default JobListing;

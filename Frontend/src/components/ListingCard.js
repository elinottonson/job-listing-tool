import React, {Fragment, updateState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import './../styles/ListingCard.css';
import './../styles/Listings.css';
import ReferralWizard from './ReferralWizard.js';

import { parseDate } from '../lib/ParseDate';

const ListingCard = ({ setPopupOpen, listingObj}) => {
  
  const [ hover, setHover ] = React.useState(false);
  const [ openReferral, setOpenReferral ] = React.useState(false);
  const { id } = useParams();
  const history = useHistory();

  const handleClick = () => {
    if(!hover) {
      setPopupOpen(false);
      history.goBack();
    }
  };
  const handleClose = () => {
    setPopupOpen(false);
    history.goBack();
  };

  const openReferralCard = (event) => {
    event.preventDefault();
    setOpenReferral(true);
  };

  if(!listingObj){
    // TODO
    // add logic for getting data from backend with listing id, and use SetPopupOpen to add that data,
    // This should make the react-router links work when they are directly accessed
    // A hook maybe?

    return <></>;
  }
  else{
    const date = parseDate(listingObj.createdAt);
    return (
      <div 
        className='listing-card-container'
        onClick={handleClick}
      >
        <div 
          className='listing-card'
          onMouseEnter={()=> setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className='listing-header'>
            <div className='title-sal' id='popup-title-sal'>
              <h2 id='title'>{listingObj.title}</h2>
              <div id='subtitle'>
                <p id='salary'>{'$' + listingObj.salary}</p>
                <p id='st-break'>•</p>
                <p id='popup-exp-level'>
                  {
                    listingObj.minYearsExperience === 0 ? 
                      'Entry Level' : 
                      `${listingObj.minYearsExperience} Years Experience`
                  }
                </p>
              </div>
            </div>
            <div className='popup-header-right'>
              <div className='popup-mng-pos'>
                <p id='manager-name'>            
                  {listingObj.manager.firstName + ' ' + listingObj.manager.lastName}
                </p>
                <p id='manager-pos'>
                  {listingObj.manager.positionTitle}
                </p>
              </div>
              <FaTimes
                id='close-btn'
                onClick={handleClose}
              />
            </div>
          </div>
          <p className='popup-desc'>{listingObj.description}</p>
          <div className='listing-footer'>
            <ul className='tags'>
              {listingObj.tags.map(tag => <li>{tag}</li>)}
            </ul>
            <p id='popup-date'>
              {
                `${date.month}.${date.day}.${date.year} 
                at ${date.hour}:${date.minute} ${date.pm ? 'PM' : 'AM'}`
              }
            </p>
          </div>
          <div className='referral-button-container'>
          {openReferral ? <ReferralWizard />
          : <button className='referralButton' onClick={openReferralCard}>Leave a Referral</button> }
          </div>
        </div>
      </div>
    );
  }
};

export default ListingCard;

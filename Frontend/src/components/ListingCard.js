import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaRegFilePdf, FaTimes, FaTrash } from 'react-icons/fa';
import './../styles/ListingCard.css';
import './../styles/Listings.css';

import Referral from './../components/Referral.js';

const ListingCard = ({ user, setPopupOpen, listingObj }) => {

  const [hover, setHover] = React.useState(false);
  const [ referrals, setReferrals ] = React.useState([]);
  const { id } = useParams();
  const history = useHistory();

  const handleClick = () => {
    if (!hover) {
      handleClose();
    }
  };
  const handleClose = () => {
    setPopupOpen(false);
    history.goBack();
  };

  React.useEffect(() => {
    if(!referrals.length) {
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      console.log(`Sending referral request for listing ${listingObj.id}`);

      fetch(`/api/referrals/${listingObj.id}`, options)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setReferrals(data);
        })
        .catch(e => { throw e; });
    }
  }, []);

  if (!listingObj) {
    // TODO:
    // add logic for getting data from backend with listing id, and use SetPopupOpen to add that data,
    // This should make the react-router links work when they are directly accessed
    // A hook maybe?
    return <></>;
  }
  else {
    const date = new Date(listingObj.createdAt);
    return (
      <div
        className='listing-card-container'
        onClick={handleClick}
      >
        <div
          className='listing-card'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className='listing-header'>
            <div className='title-sal' id='popup-title-sal'>
              <h2 id='title'>{listingObj.title}</h2>
              <div id='subtitle'>
                <p id='salary'>{'$' + listingObj.salary.toLocaleString()}</p>
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
                onKeyPress={(e) => { if (e.code == 'Enter') handleClose(); }}
                tabIndex="0"
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
                date.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              }
            </p>
          </div>
          <div className='listing-btn-container'>
            <button type='button' id='ref-btn' tabIndex='0'>Leave Referral</button>
            {/* TODO: delete listing */}
            {listingObj.managerId === user.employeeId ? 
              <FaTrash id='delete-btn'/> :
              <></>
            }
          </div>
          {user.employeeId === listingObj.managerId ? 
            <div className='referrals-container'>
              <hr />
              {referrals.length ? 
                (referrals.map(referral => <Referral referralObj={referral} />))
                : <p>No referrals on this listing.</p>
              }
            </div> 
            : <></>
          }
        </div>
      </div>
    );
  }
};

export default ListingCard;

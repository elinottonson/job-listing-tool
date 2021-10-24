import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';
import './../styles/ListingCard.css';
import './../styles/Listings.css';

const ListingCard = ({ setPopupOpen }) => {

  const [ hover, setHover ] = React.useState(false);
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
          <div className='title-sal'>
            <h2 id='title'>TITLE</h2>
            <div id='subtitle'>
              <p id='salary'>$SALARY</p>
              <p id='st-break'>•</p>
              <p id='popup-exp-level'>REQUIRED_EXPERIENCE</p>
            </div>
          </div>
          <div className='popup-mng-dep'>
            <p id='popup-mng-name'>MANAGER_NAME</p>
            <p id='popup-mng-pos'>MANAGER_POS</p>
          </div>
          <FaTimesCircle 
            id='close-btn'
            onClick={handleClose}
          />
        </div>
        <p className='popup-desc'>LISTING_DESCRIPTION</p>
        <div className='listing-footer'>
          <button type='button' id='ref-btn'>Leave Referral</button>
          <ul className='popup-tags'>TAGS</ul>
          <p id='popup-date'>DATE_CREATED</p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

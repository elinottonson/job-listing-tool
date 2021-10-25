import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
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
          <div className='popup-header-right'>
            <div className='popup-mng-dep'>
              <p id=' manager-name'>MANAGER_NAME</p>
              <p id='manager-pos'>MANAGER_POS</p>
            </div>
            <FaTimes
              id='close-btn'
              onClick={handleClose}
            />
          </div>
        </div>
        <p className='popup-desc'>LISTING_DESCRIPTION</p>
        <div className='listing-footer'>
          <ul className='tags'>
            <li>TAG 1</li>
            <li>TAG 2</li>
            <li>TAG 3</li>
          </ul>
          <p id='popup-date'>DATE_CREATED</p>
        </div>
        <button type='button' id='ref-btn'>Leave Referral</button>
      </div>
    </div>
  );
};

export default ListingCard;

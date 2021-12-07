import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import './../styles/PopupCard.css';

const PopupCard = ({ setPopupOpen, title, content}) => {

  const [hover, setHover] = React.useState(false);
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

  return (
    <div
      className='popup-card-container'
      onClick={handleClick}
    >
      <div
        className='popup-card'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className='popup-header'>
          <h1 id='popup-title'>{title}</h1>
          <FaTimes
            id='close-btn-alt'
            onClick={handleClose}
          />
        </div>
        {content}
      </div>
    </div>
  );
};

export default PopupCard;

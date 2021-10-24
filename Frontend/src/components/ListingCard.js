import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './../styles/ListingCard.css';

const ListingCard = () => {

  const [ hover, setHover ] = React.useState(false);
  const { id } = useParams();
  const history = useHistory();

  const handleClick = () => {
    if(!hover) {
      history.goBack();
    }
  }

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
        <p>LISTING CARD</p>
        <p>ID: {id}</p>
        <p>Hovering: {hover.toString()}</p>
      </div>
    </div>
  );
};

export default ListingCard;

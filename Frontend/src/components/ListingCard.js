import React from 'react';
import { useParams } from 'react-router';
import './../styles/ListingCard.css';

const ListingCard = () => {

    const { id } = useParams();

    return (
        <div className='listing-card'>
            <p>LISTING CARD</p>
        </div>
    );
};

export default ListingCard;

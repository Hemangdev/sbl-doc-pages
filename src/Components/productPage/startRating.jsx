import React from 'react';
import Staricon from '../../image/star-icon.svg'
import Startdark from '../../image/start-dark.svg'

const StarRating = ({ onRatingSelect, setError, setRating, rating }) => {
  const handleRating = (rate) => {
    setRating(rate);
    onRatingSelect(rate);
    setError('')
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          src={star <= rating ? Staricon : Startdark}
          alt="Star"
          className="img-fluid me-1"
          style={{ cursor: 'pointer', height: '20px', width: '20px' }} // Adjust size as needed
          onClick={() => handleRating(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;

import { FaStar } from 'react-icons/fa';

const StarRating = ({ starCount = 1 }) => {
    const stars = Array.from({ length: starCount }, (_, index) => (
        <FaStar key={index} className="star-icon" style={{ color: '#ff9948' }} />
    ));
    return (
        <div>
            {stars}
        </div>
    );
};

export default StarRating;
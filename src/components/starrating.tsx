import React, {useState} from "react";

interface StarRatingProps {
    totalstars?: number
    onrate?: (rating: number) => void;
    initialrating?: number;  //check ลูกค้าเก่าหรือใหม่  ใหม่set ดาว0
}

const StarRating: React.FC<StarRatingProps> = ({ totalstars = 5, onrate, initialrating = 0 }) => {
    const [rating, setRating] = useState(initialrating)

    const handleClick = (star: number) => {
        setRating(star);
        if (onrate) {
            onrate(star); {/* ส่งค่าดาว*/} 
        }
    };

    return(
        <div>
            {Array.from({ length: totalstars },(_,i) => (
                <span
                key = {i} 
                onClick = {() => handleClick(i+1)}
                className={i < rating? "text-yellow-400" : "text-gray-300"}
                >   ★
                </span>
            ))}
        </div>
    )

}
export default StarRating
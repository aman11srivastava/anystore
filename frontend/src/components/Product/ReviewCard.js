import React from "react";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import Profile from '../../images/Profile.png';

export const ReviewCard = ({review}) => {
    const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <>
            <div className={"reviewCard"}>
                <img src={Profile} alt={"User"}/>
                <p>{review.name}</p>
                <ReactStars {...options}/>
                <span>{review.comment}</span>
            </div>
        </>
    )
}

export default ReviewCard

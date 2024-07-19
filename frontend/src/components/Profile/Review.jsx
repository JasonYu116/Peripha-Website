import React, { useState, useEffect } from 'react';
const Review = (props) => {

    useEffect(()=>{
    });

    return (
    <div className="py-2" >
        <a className="hover:underline" href = {"http://localhost:5173/user/" + props.props.username}>
            <h3 className="text-xl" >{props.props.username}</h3>
            </a>
        <p className="text-sm">Rating: {props.props.rating}</p>
        <p>{props.props.reviewContent}</p>
    </div>
);}

export default Review;
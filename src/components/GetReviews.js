import React, { useState, useEffect } from 'react'
import { getDocs, query, where } from 'firebase/firestore';
import { reviewsCollectionRef } from '../firebase/firebase';
import { data } from 'autoprefixer';


const GetReviews = ({ id }) => {

    // Show reviews in movie detail page
    const [review, setReview] = useState([]);

    useEffect(() => {
        async function getReviews() {
            let quer = query(reviewsCollectionRef, where("movieid", "==", id))
            let querySnapshot = await getDocs(quer)
            querySnapshot.forEach((doc) => {
                setReview((prev) => [...prev, doc.data()])
            });
        }
        getReviews()

    }, [])

    return (
        <div className=' bg-slate-500'>
            {
                review.map((e, i) => {
                    return (
                        <div key={i}>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GetReviews
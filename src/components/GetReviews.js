import React, { useState, useEffect } from 'react'
import { getDocs, query, where } from 'firebase/firestore';
import { reviewsCollectionRef } from '../firebase/firebase';
import { ThreeDots } from 'react-loader-spinner';
import ReactStars from "react-rating-stars-component";

const GetReviews = ({ id }) => {
    const [loading, setLoading] = useState(false)
    // Show reviews in movie detail page
    const [review, setReview] = useState([]);

    useEffect(() => {
        async function getReviews() {
            setLoading(true)
            let quer = query(reviewsCollectionRef, where("movieid", "==", id))
            let querySnapshot = await getDocs(quer)
            querySnapshot.forEach((doc) => {
                setReview((prev) => [...prev, doc.data()])
            });
            setLoading(false)
        }
        getReviews()

    }, [])

    return (
        loading ? <div className='flex justify-center mb-16'><ThreeDots color='#fff' height={15} /> </div> :
            <div className='mb-16'>
                {
                    review.map((e, i) => {
                        return (
                            <div className='review-bg border-b border-gray-600 mt-3 p-2' key={i}>
                                <div className='flex items-center gap-5'>
                                    <p className=' text-blue-500'>{e.username}</p>
                                    <p className=' text-xs'>( {new Date(e.timestemp).toLocaleString()} )</p>
                                </div>
                                <ReactStars
                                    size={16}
                                    isHalf={true}
                                    value={e.rating}
                                    edit = {false}
                                />
                                <p>{e.thought}</p>
                            </div>
                        )
                    })
                }
            </div>
    )
}

export default GetReviews
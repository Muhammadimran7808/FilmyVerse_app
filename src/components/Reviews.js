import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { reviewsCollectionRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert';
import { useContext } from 'react';
import { appstate } from '../App';
import { useNavigate } from 'react-router-dom';
import GetReviews from './GetReviews';


const Reviews = ({ id, prevRating, userRated }) => {
    const useAppstate = useContext(appstate)
    const navigate = useNavigate()

    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false)
    const [thought, setThought] = useState("")
    const [updateReview, setUpdateReview] = useState(0)   // this useState is just used as dependency (means when a review is added its value changed and it rerender the review component to update reviews)

    // sending reviews on database
    const sendReview = async () => {
        try {
            if (useAppstate.login) {
                setLoading(true)
                await addDoc(reviewsCollectionRef, {
                    movieid: id,
                    username: useAppstate.userName,
                    rating: rating,
                    thought: thought,
                    timestemp: new Date().getTime()
                })
                const docRef = doc(db, "movies", id);
                updateDoc(docRef, {
                    rating: prevRating + rating,
                    rated: userRated + 1
                })

                setLoading(false)
                setRating(0)
                setThought("")
                swal({
                    text: "Review Sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                })
                setUpdateReview(updateReview + 1)
            }
            else {
                navigate('/login')
            }
        }
        catch (error) {
            swal({
                title: error,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
    }

    return (
        <div className='mt-3 pt-6 mb-10 w-full border-t-2 border-gray-700'>
            <ReactStars
                size={30}
                isHalf={true}
                value={rating}
                onChange={(rate) => setRating(rate)}
            />
            <textarea
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                cols="30"
                rows="3"
                className='w-full p-2 outline-none resize-none review-input'
                placeholder='Share Your Thoughts......'
            >
            </textarea>
            <button onClick={sendReview} className=' bg-green-400 hover:bg-green-500 w-full p-3 mt-2 flex justify-center'>
                {loading ? <TailSpin height={25} color='#fff' /> : <span className=' font-bold text-lg text-black'>Share</span>}
            </button>
            {/* Get reviews component */}
            <GetReviews id={id} updateRev={updateReview} />

        </div>
    )
}

export default Reviews
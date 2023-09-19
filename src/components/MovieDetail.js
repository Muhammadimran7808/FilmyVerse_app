import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { ThreeDots } from 'react-loader-spinner';
import Reviews from './Reviews';

const MovieDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true)

    const [data, setData] = useState({
        title: "",
        year: "",
        image: "",
        description: "",
        rating: 0,
        rated: 0
    });

    useEffect(() => {
        async function getData() {
            const docRef = doc(db, "movies", id)
            const response = await getDoc(docRef)

            setData(response.data());
            setLoading(false)
        }
        getData()
    }, [])

    return (
        <div className='w-full px-6 pt-10 md:px-20 flex flex-col md:flex-row gap-7 md:gap-11 justify-center max-md:items-center'>
            {
                loading ? <div className='mt-60'><ThreeDots color='#fff' /></div> :
                    <>
                        <img className=' md:sticky top-32 w-full h-80 md:w-72 md:h-96 select-none' src={data.image} alt="" />
                        <div className='w-full md:w-3/5'>
                            <h1 className='text-2xl md:text-3xl font-bold text-gray-400'>{data.title}<span className=' text-2xl'> ({data.year})</span></h1>
                            <ReactStars
                                size={20}
                                isHalf={true}
                                edit={false}
                                value={data.rating/data.rated}
                            />
                            <p className='mt-2 md:mt-4 text-lg md:text-xl'>{data.description}</p>

                            {/* Reviews Component */}
                            <Reviews id={id} prevRating={data.rating} userRated = {data.rated}/>
                        </div>
                    </>
            }
        </div>
    )
}

export default MovieDetail
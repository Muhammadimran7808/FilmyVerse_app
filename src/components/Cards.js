import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import ReactStars from "react-rating-stars-component";
import { doc, getDocs } from 'firebase/firestore';
import { moviesCollectionRef } from './firebase/firebase';

const Cards = () => {

    const [movie, setMovie] = useState([]);

    // useState for loading spinner
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const response = await getDocs(moviesCollectionRef)
            response.forEach((doc)=>{
                setMovie((prv)=> [...prv, doc.data()])
            })
                        
            setLoading(false)
        }
        getData()
    }, [])

    return (
        <div className='flex flex-wrap justify-center gap-3'>
            {loading ? <div className='grid place-items-center w-full h-96 mt-36'><ThreeCircles height={60} color='white' /></div> :
                movie.map((e, i) => {
                    return (
                        <div key={i} className='card mr-4 ml-4 mt-6 md:w-64 w-72 rounded-t-lg cursor-pointer hover:-translate-y-3 transition-all duration-300'>
                            <img className='w-full h-72 rounded-t-lg' src={e.image} alt="" />
                            <div className='px-2 py-2'>
                                <h1>Title: {e.title}</h1>
                                <h1 className='flex items-center'>Rating :
                                    <ReactStars
                                        size={20}
                                        isHalf={true}
                                        edit={false}
                                        value={5}
                                    />
                                </h1>
                                <h2>Year : {e.year}</h2>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Cards
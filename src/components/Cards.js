import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";

const Cards = () => {

    const [movie, setMovie] = useState([
        {
            title: "Black Panther",
            year: "2013",
            rating: 4.5,
            img: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg'
        },
        {
            title: "Black Panther",
            year: "2013",
            rating: 2,
            img: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg'
        },
        {
            title: "Black Panther",
            year: "2013",
            rating: 5,
            img: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg'
        },
        {
            title: "Black Panther",
            year: "2013",
            rating: 1.5,
            img: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg'
        },
        {
            title: "Black Panther",
            year: "2013",
            rating: 1.5,
            img: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg'
        },
        {
            title: "Black Panther",
            year: "2013",
            rating: 4.5,
            img: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg'
        }
    ]);

    return (
        <div className='flex flex-wrap justify-center gap-3'>
            {
                movie.map((e, i) => {
                    return (
                        <div key={i} className='card mr-4 ml-4 mt-6 md:w-64 w-72 rounded-t-lg cursor-pointer hover:-translate-y-3 transition-all duration-300'>
                            <img className='w-full h-72 rounded-t-lg' src={e.img} alt="" />
                            <div className='pl-2'>
                                <h1>Title: {e.title}</h1>
                                <h1 className='flex items-center'>Rating :
                                    <ReactStars
                                        size={20}
                                        isHalf={true}
                                        edit={false}
                                        value={e.rating}
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
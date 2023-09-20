import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { appstate } from '../App';


const Header = () => {
    const useAppstate = useContext(appstate)

    return (
        <div className='header sticky top-0 z-10 p-3 flex justify-between items-center border-b-2 border-gray-500'>
            <Link to={'/'}>
                <p className='text-3xl'>
                    <span className='text-red-500 font-bold'>Filmy</span>Verse
                </p>
            </Link>
            {useAppstate.login ?
                <Link to={'/addmovie'}>
                    <Button><h1 className='text-xl text-white'><AddIcon /> Add New</h1></Button>
                </Link>
                :
                <Link to={'/login'}>
                    <h1 className='text-xl  bg-green-500'>
                        <Button><span className='text-white px-3 capitalize font-semibold'>Login</span></Button>
                    </h1>
                </Link>
            }
        </div>
    )
}

export default Header
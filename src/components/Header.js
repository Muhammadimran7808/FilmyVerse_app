import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

const Header = () => {
    return (
        <div className='p-3 flex justify-between items-center border-b-2 border-gray-500'>
            <p className='text-3xl'>
                <span className='text-red-500 font-bold'>Filmy</span>Verse
            </p>
            <Button><h1 className='text-xl text-white'><AddIcon /> Add New</h1></Button>
        </div>
    )
}

export default Header
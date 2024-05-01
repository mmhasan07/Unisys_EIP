import React from 'react';
import { useNavigate } from 'react-router-dom';

const Features = () => {

    const navigate= useNavigate()

    const handleClick = (path) => {
        navigate(path)
    }

    return (
        <div className='flex flex-wrap justify-center mt-8'>
            <div onClick={() => handleClick("/allChannels")} className='m-4 w-[30%] cursor-pointer p-4 bg-[#F2F2F2] border rounded-lg text-center'>
                <h2 className='text-lg font-semibold'>All Channels</h2>
            </div>
            <div onClick={() => handleClick("/createChannel")} className='m-4 w-[30%] cursor-pointer p-4 bg-[#F2F2F2] border rounded-lg text-center'>
                <h2 className='text-lg font-semibold'>Create Channel</h2>
            </div>
            <div onClick={() => handleClick("/subscribe")} className='m-4 w-[30%] cursor-pointer p-4 bg-[#F2F2F2] border rounded-lg text-center'>
                <h2 className='text-lg font-semibold'>Subscribe to Channels</h2>
            </div>
            <div onClick={() => handleClick("/publish")} className='m-4 w-[30%] cursor-pointer p-4 bg-[#F2F2F2] border rounded-lg text-center'>
                <h2 className='text-lg font-semibold'>Publish to Channel</h2>
            </div>
            <div onClick={() => handleClick("/")} className='m-4 w-[30%] cursor-pointer p-4 bg-[#F2F2F2] border rounded-lg text-center'>
                <h2 className='text-lg font-semibold'>View Data</h2>
            </div>
        </div>
    );
};

export default Features;

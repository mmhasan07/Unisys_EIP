import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import mysqlImg from '../assets/mysql.png';
import mongoImg from '../assets/mongo.png';

function Home() {
  const navigate = useNavigate()

  const handleOnCLick = (e) => {
      navigate(e.target.name)
  }
  return (
    <>
    <div className='flex flex-col justify-center items-center h-screen m-auto'>
    <div className='t text-6xl ml-auto mr-auto'> Databases</div>
      <div className='flex justify-center items-center w-[50%] h-[60%]'>
        <div className='mx-8 cursor-pointer p-4 bg-[#F2F2F2] border rounded-lg'>
          <img onClick={handleOnCLick} src={mongoImg} alt='' name='mongo'/>
        </div>
        <div className='mx-8 cursor-pointer p-4 bg-[#F2F2F2] border rounded-lg'>
          <img onClick={handleOnCLick} src={mysqlImg}  alt='' name='mysql' />
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;

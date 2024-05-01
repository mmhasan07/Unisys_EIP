import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

const MySQL = () => {
    const [tables, setTables] = useState([]);
    const navigate = useNavigate();

    const fetchTables = async () => {
        try {
            const resp = await axios.get(`${host}/api/sql/tables/get`);
            setTables(resp.data.tables);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    const handleOnClick = (tableName) => {
        navigate(`/mysql/viewTable/${tableName}`);
    };

    useEffect(() => {
        fetchTables();
    }, []);

    return (
        <div className='flex flex-col'>
            <div className='m-auto mt-6'>
                <h1 className='text text-3xl'>Tables in MySQL Database</h1>
            </div>
            <div className='flex flex-wrap justify-center items-center h-full mt-9'>
                {tables.map((tableName) => (
                    <div
                        key={tableName}
                        onClick={() => handleOnClick(tableName)}
                        className='m-4 w-[20%] h-[10vh] cursor-pointer p-4 bg-[#F2F2F2] border rounded-lg text-center'
                    >
                        <h2 className='text-lg font-semibold'>{tableName}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MySQL;

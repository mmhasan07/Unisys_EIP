import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { host } from '../utils/APIRoutes';
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const ViewTable = () => {
    const { documentName } = useParams();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`${host}/api/mongo/documents/data/get/${documentName}`);
                setTableData(resp.data.documentData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [documentName]);

    return (
        <div className="flex flex-col mt-5">
            <div className='t text-3xl m-auto'>{(documentName.toUpperCase())} Document</div>
            <div className="py-2 align-middle inline-block w-[100%] sm:px-6 lg:px-8">
                {tableData.map((row, index) => (
                    <div key={index} className="shadow mb-4 p-4 bg-gray-100 sm:rounded-lg">
                        <pre>
                        <JsonView data={row} shouldExpandNode={allExpanded} style={defaultStyles} />
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewTable;

import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { pgsqlCreateRowRoute } from '../../utils/APIRoutes';
import axios from 'axios'


const Modal = ({ fromDbName, setIsModalOpen, fetchData, fromTableName, fromTableData }) => {

    const [selectedDatabase, setSelectedDatabase] = useState('mongo');
    const [selectedTable, setSelectedTable] = useState('');
    const [tables, setTables] = useState([]);


    useEffect(() => {
        // Fetch tables/documents when selectedDatabase changes
        console.log(selectedDatabase)
        if (selectedDatabase === "mongo") {
            axios.get(`http://localhost:8080/api/mongo/documents/get`)
                .then(response => {
                    setTables(response?.data?.tables);
                    setSelectedTable(response?.data?.tables[0]??"")
                })
                .catch(error => {
                    console.error('Error fetching tables:', error);
                });
        }
        if (selectedDatabase === "mysql") {
            axios.get(`http://localhost:8080/api/sql/tables/get`)
                .then(response => {
                    setTables(response.data.tables);
                    setSelectedTable(response?.data?.tables[0]??"")
                })
                .catch(error => {
                    console.error('Error fetching tables:', error);
                });
        }
        if (selectedDatabase === "pgsql") {
            axios.get(`http://localhost:8080/api/pgsql/pgtables/getTables`)
                .then(response => {
                    setTables(response?.data?.tables);
                    setSelectedTable(response?.data?.tables[0]??"")
                })
                .catch(error => {
                    console.error('Error fetching tables:', error);
                });
        }
    }, [selectedDatabase]);

    const handleDatabaseChange = (event) => {
        setSelectedDatabase(event.target.value);
    };

    const handleTableChange = (event) => {
        setSelectedTable(event.target.value);
    };


    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }


    const handleOnShare = () => {
        if (selectedDatabase === "mongo") {
            axios.post(`http://localhost:8080/api/mongo/documents/get`)
                .then(response => {
                    toast.success("data transferred successfully", toastOptions)
                })
                .catch(error => {
                    console.error('Error fetching tables:', error);
                    toast.error("InCompatible Tables/Documents", toastOptions)
                }).finally(() => setIsModalOpen(false))
        }
        if (selectedDatabase === "mysql") {
            console.log(selectedTable)
            axios.post(`http://localhost:8080/api/sql/tables/data/create/multiple`, {
                tableName: selectedTable,
                data: fromTableData
            })
                .then(response => {
                    toast.success("data transferred successfully", toastOptions)
                })
                .catch(error => {
                    console.error('Error fetching tables:', error);
                    toast.error("InCompatible Tables/Documents", toastOptions)
                })
                .finally(() => {
                    setIsModalOpen(false)
                })
        }
        if (selectedDatabase === "pgsql") {
            axios.post(`http://localhost:8080/api/pgsql/pgtables/data/create/multiple`, {
                tableName: selectedTable,
                data: fromTableData
            })
                .then((resp) => {
                    toast.success("data transferred successfully", toastOptions)
                })
                .catch(error => {
                    console.error('Error fetching tables:', error);
                    toast.error("InCompatible Tables/Documents", toastOptions)
                }).finally(() => setIsModalOpen(false))
        }

    }



    return (
        <div>
            <ToastContainer/>
            <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 " id="modal">
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-900 opacity-75" />
                    </div>
                    <span className=" sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <label htmlFor="database" className="block text-sm font-medium text-gray-700 mb-1">Select DB</label>
                                <select id="database" name="database" onChange={handleDatabaseChange} className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring focus:border-blue-300">
                                    <option value="mongo">MongoDB</option>
                                    <option value="mysql">MySQL</option>
                                    <option value="pgsql">PgSql</option>
                                </select>
                            </div>

                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <label htmlFor="tablename" className="block text-sm font-medium text-gray-700 mb-1">Select table/Document</label>
                                <select id="tablename" name="tablename" onChange={handleTableChange} className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring focus:border-blue-300">
                                    {tables.map(table => (
                                        <option key={table} value={table}>{table}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <div className="bg-gray-200 px-4 py-3 text-right">
                            <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={() => setIsModalOpen(false)}><i className="fas fa-times"></i> Cancel</button>
                            <button type="button" className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500" onClick={handleOnShare} ><i className="fas fa-plus"></i> Share </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
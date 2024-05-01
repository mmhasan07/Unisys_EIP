import React, { useState } from 'react'
import { toast } from "react-toastify";
import { sqlEditRowRoute } from '../../utils/APIRoutes';
import axios from 'axios'


const Modal = ({ row, setIsModalOpen, fetchData, tableName }) => {

    const [localRow, setLocalRow] = useState(row);

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const handleChange = (e) => {
        setLocalRow({ ...localRow, [e.target.name]: e.target.value })
    }

    const handleEdit = async () => {
        try {
            Object.keys(localRow).forEach((key) => {
                if (!isNaN(localRow[key])) {
                    localRow[key] = Number(localRow[key]);
                }
            });

            const resp = await axios.put(sqlEditRowRoute, {
                tableName,
                row: localRow
            }, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)}`
                }
            });
            console.log(resp.data)
            await fetchData();
            toast.success("Row Edited Successfully", toastOptions);
        } catch (err) {
            toast.error("Some error occurred", toastOptions);
            await fetchData();
        } finally {
            setIsModalOpen(false)
        }
    };



    return (
        <div>
            <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 " id="modal">
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-900 opacity-75" />
                    </div>
                    <span className=" sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline" style={{ maxHeight: "85vh", overflowY: "auto" }}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                            {
                                Object.keys(row).map((key) => {
                                    return (
                                        <>
                                            <label className="font-medium text-gray-800">{key}</label>
                                            <input type="text" className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" name={key} onChange={handleChange} value={localRow[key]} />
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className="bg-gray-200 px-4 py-3 text-right">
                            <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={() => setIsModalOpen(false)}><i className="fas fa-times"></i> Cancel</button>
                            <button type="button" className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500" onClick={handleEdit}><i className="fas fa-plus"></i> Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
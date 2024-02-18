import React, { useState } from 'react'
import { toast } from "react-toastify";
import { mongoEditDocumentRoute } from '../../utils/APIRoutes';
import axios from 'axios'


const Modal = ({ document, setIsModalOpen, fetchData, documentName }) => {

    const [localDoc, setLocalDoc] = useState(document);

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const handleChange = (e) => {
        setLocalDoc({ ...localDoc, [e.target.name]: e.target.value })
    }

    const handleEdit = async () => {
        try {
            Object.keys(localDoc).forEach((key) => {
                if (!isNaN(localDoc[key])) {
                    localDoc[key] = Number(localDoc[key]);
                }
            });

            const resp = await axios.put(mongoEditDocumentRoute, {
                documentName,
                document: localDoc
            });
            console.log(resp.data)
            await fetchData();
            toast.success("Document Edited Successfully", toastOptions);
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
                    <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                            {
                                Object.keys(document).map((key) => {
                                    return (
                                        <>
                                            <label className="font-medium text-gray-800">{key}</label>
                                            <input type="text" className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" name={key} onChange={handleChange} value={localDoc[key]} />
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
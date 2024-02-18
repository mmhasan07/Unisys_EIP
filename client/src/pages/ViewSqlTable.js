import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { host } from '../utils/APIRoutes'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditModal from '../components/SQL_components/EditModal';
import CreateModal from '../components/SQL_components/CreateModal';
import { toast } from "react-toastify";
import { sqlDeleteRowRoute } from '../utils/APIRoutes'




const ViewTable = () => {
    const { tableName } = useParams()
    const [tableData, setTableData] = useState([])
    const [tableRow, setTableRow] = useState([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editableRow, setEditableRow] = useState({})

    const fetchData = async () => {
        const resp = await axios.get(`${host}/api/sql/tables/data/get/${tableName}`)
        setTableData(resp.data.tableData)
    }

    const fetchColumns = async() =>{
        const resp = await axios.get(`${host}/api/sql/tables/data/getcol/${tableName}`)
        setTableRow(resp.data.columnNames)
    }

    useEffect(() => {
        fetchData()
        fetchColumns()
    }, [])

    const deleteRow = async (row) => {
        try {
            const resp = await axios.delete(sqlDeleteRowRoute, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)}`
                },
                data: {
                    tableName,
                    row
                }
            });
            await fetchData()
            toast.success("Row Deleted Successfully", toastOptions)

        } catch (err) {
            toast.error("Some error occoured", toastOptions);
            await fetchData()
        }


    }


    const editRow = (row) => {
        setEditableRow(row)
        setIsEditModalOpen(true)
    }


    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    return (
        <div className="flex flex-col mt-5 w-[]">
            <div className=' text-3xl m-auto'>{(tableName.toUpperCase())} Table  </div>
            <div className='ml-[85%]'> <button type="button" className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500" onClick={() => setIsCreateModalOpen(true)}><i className="fas fa-plus"></i> Create Row </button>  </div>

            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 w-[100%]">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Edit/delete</th>
                                    {Object.keys(tableRow).map((key) => (
                                        <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {key}
                                        </th>
                                    ))}
                                </tr>

                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tableData.map((row) => (
                                    <tr key={row.id}>
                                        <td className="px-6 py-4 whitespace-nowrap flex gap-7">
                                            <FaEdit className='cursor-pointer' onClick={() => editRow(row)} />
                                            <MdDelete className='cursor-pointer' onClick={() => deleteRow(row)} />
                                        </td>
                                        {Object.keys(tableRow).map((key) => (
                                            <td className="px-6 py-4 whitespace-nowrap">{row[key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {
                            isEditModalOpen && <EditModal row={editableRow} setIsModalOpen={setIsEditModalOpen} fetchData={fetchData} tableName={tableName} />
                        }
                        {
                            isCreateModalOpen && <CreateModal row={tableRow} setIsModalOpen={setIsCreateModalOpen} fetchData={fetchData} tableName={tableName} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTable
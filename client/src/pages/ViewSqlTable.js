import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { host } from '../utils/APIRoutes'

const ViewTable = () => {
    const { tableName } = useParams()
    const [tableData, setTableData] = useState([])
    const [tableRow, setTableRow] = useState([])

    const fetchData = async () => {
        const resp = await axios.get(`${host}/api/sql/tables/data/get/${tableName}`)
        setTableData(resp.data.tableData)
        setTableRow(resp.data.tableData?.length > 0 ? resp.data.tableData[0] : [])
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="flex flex-col mt-5">
            <div className='t text-3xl m-auto'>{(tableName.toUpperCase())} Table</div>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 w-[100%]">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
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
                                        {Object.keys(tableRow).map((key) => (
                                            <td className="px-6 py-4 whitespace-nowrap">{row[key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTable
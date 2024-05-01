import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { host } from "../utils/APIRoutes";
import {
    JsonView,
    allExpanded,
    defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { mongoDeleteDocumentRoute } from "../utils/APIRoutes";

const Data = ({selectedFilterChannel}) => {
    const { documentName } = useParams();
    const [tableData, setTableData] = useState([]);
    const sharableData = getSharableData(tableData);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editableDocument, setEditableDocument] = useState({});

    function getSharableData(data) {
        return data.map((obj) => {
            const { _id, _v, ...rest } = obj;
            return rest;
        });
    }

    const fetchData = async () => {
        try {
            const resp = await axios.get(
                `${host}/api/data/subscriber/get`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)}`
                    }
                }
            );
            setTableData(resp.data.subscribedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [documentName]);

    const deleteDocument = async (document) => {
        try {
            const resp = await axios.delete(mongoDeleteDocumentRoute, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        process.env.REACT_APP_CLIENT_KEY
                    )}`,
                },
                data: {
                    documentName,
                    _id: document._id,
                },
            });
            await fetchData();
            toast.success("Document Deleted Successfully", toastOptions);
        } catch (err) {
            toast.error("Some error occoured", toastOptions);
            await fetchData();
        }
    };

    const editDocument = (document) => {
        setEditableDocument(document);
        setIsEditModalOpen(true);
    };

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const filteredTableData = selectedFilterChannel === "" ? tableData : tableData.filter(document => document.channelName === selectedFilterChannel);


    return (
        <div className="flex flex-col mt-5">
            <div className="py-2 align-middle inline-block w-[100%] sm:px-6 lg:px-8">
                {filteredTableData.map((document, index) => (
                    <div
                        key={index}
                        className="shadow mb-4 p-4 bg-gray-100 sm:rounded-lg"
                    >
                        <pre>
                            <JsonView
                                data={document.data}
                                shouldExpandNode={allExpanded}
                                style={defaultStyles}
                            />
                            <div className="flex justify-end gap-7">
                                <FaEdit
                                    className="cursor-pointer"
                                    onClick={() => editDocument(document)}
                                />
                                <MdDelete
                                    className="cursor-pointer"
                                    onClick={() => deleteDocument(document)}
                                />
                            </div>
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Data;

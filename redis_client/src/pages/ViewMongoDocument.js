import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { host } from "../utils/APIRoutes";
import {
  JsonView,
  allExpanded,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import EditModal from "../components/Mongo_components/EditModal";
import CreateModal from "../components/Mongo_components/CreateModal";
import "react-json-view-lite/dist/index.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { mongoDeleteDocumentRoute } from "../utils/APIRoutes";
import ShareModal from "../components/ShareModal/ShareModal";

const ViewTable = () => {
  const { documentName } = useParams();
  const [tableData, setTableData] = useState([]);
  const sharableData = getSharableData(tableData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editableDocument, setEditableDocument] = useState({});
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  function getSharableData(data) {
    return data.map((obj) => {
      const { _id, _v, ...rest } = obj;
      return rest;
    });
  }

  const fetchData = async () => {
    try {
      const resp = await axios.get(
        `${host}/api/mongo/documents/data/get/${documentName}`
      );
      setTableData(resp.data.documentData);
      if (resp.data?.documentData?.length > 0)
        setEditableDocument(resp.data?.documentData[0]);
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

  return (
    <div className="flex flex-col mt-5">
      <div className="t text-3xl m-auto">
        {documentName.toUpperCase()} Document
      </div>
      <div className="flex flex-row">
        <div className="">
          {" "}
          <button
            type="button"
            className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <i className="fas fa-plus"></i> Create Document{" "}
          </button>{" "}
        </div>
        <div className="ml-[85%]">
          {" "}
          <button
            type="button"
            className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
            onClick={() => setIsShareModalOpen(true)}
          >
            <i className="fas fa-plus"></i> Share Data{" "}
          </button>{" "}
        </div>
      </div>
      <div className="py-2 align-middle inline-block w-[100%] sm:px-6 lg:px-8">
        {tableData.map((document, index) => (
          <div
            key={index}
            className="shadow mb-4 p-4 bg-gray-100 sm:rounded-lg"
          >
            <pre>
              <JsonView
                data={document}
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
      {isEditModalOpen && (
        <EditModal
          document={editableDocument}
          setIsModalOpen={setIsEditModalOpen}
          fetchData={fetchData}
          documentName={documentName}
        />
      )}
      {isCreateModalOpen && (
        <CreateModal
          document={editableDocument}
          setIsModalOpen={setIsCreateModalOpen}
          fetchData={fetchData}
          documentName={documentName}
        />
      )}
      {isShareModalOpen && (
        <ShareModal
          fromDbName={"mongo"}
          setIsModalOpen={setIsShareModalOpen}
          fromTableName={documentName}
          fromTableData={sharableData}
        />
      )}
    </div>
  );
};

export default ViewTable;

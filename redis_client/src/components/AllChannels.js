import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../utils/APIRoutes';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const AllChannels = () => {
    const [channels, setChannels] = useState([]);
    const [showAuthorizedOnly, setShowAuthorizedOnly] = useState(false);

    const fetchChannels = async () => {
        try {
            const authToken = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY);
            const response = await axios.get(`${host}/api/channels/get/all`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setChannels(response.data.channels);
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    useEffect(() => {
        fetchChannels();
    }, []);

    const handleDelete = async (channelName) => {
        console.log(channelName)
        try {
            const authToken = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY);
            console.log(authToken)
            const resp = await axios.delete(`${host}/api/channels/delete`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                data: { channelName } // Pass the channelName as part of the data object
            });
            // After deletion, fetch updated channels
            if (resp.data.status) {
                await fetchChannels();
                setTimeout(() => {
                    toast.success("Deleted successfully", toastOptions)
                }, 1000)
            } else {
                toast.error(resp.data.msg, toastOptions)
            }
        } catch (error) {
            toast.error("Some error", toastOptions)
        }
    };

    const filteredChannels = showAuthorizedOnly && sessionStorage.getItem("username") != "admin"
        ? channels.filter(channel =>
            channel.authorizedOrganizations.includes(sessionStorage.getItem("organization"))
        )
        : channels;

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-4 text-center">All Channels on Unisys EIP</h1>
            <div className="flex justify-center mb-4">
                <label className="mr-2">Show Only My Authorized Channels:</label>
                <input
                    type="checkbox"
                    checked={showAuthorizedOnly}
                    onChange={() => setShowAuthorizedOnly(!showAuthorizedOnly)}
                />
            </div>
            <div className="flex flex-wrap justify-center mt-8">
                {filteredChannels.map(channel => (
                    <div key={channel._id} className="m-4 p-4 bg-gray-200 border rounded-lg">
                        <h2 className="text-lg font-semibold">Channel: {channel.channelName}</h2>

                        <div className="mt-2">
                            <p className="text-sm font-semibold">Authorized Organizations:</p>
                            <ul>
                                {channel.authorizedOrganizations.map((organization, index) => (
                                    <li key={index} className="ml-2"> - {organization}</li>
                                ))}
                            </ul>

                        </div>
                        {
                            showAuthorizedOnly && (
                                <MdDelete
                                    className="cursor-pointer text-red-600 mt-2"
                                    onClick={() => handleDelete(channel.channelName)}
                                />
                            )
                        }
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AllChannels;

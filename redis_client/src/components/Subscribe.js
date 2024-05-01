import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../utils/APIRoutes';
import { MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';

const Subscribe = () => {
    const [channels, setChannels] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
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

    const fetchSubscriptions = async () => {
        try {
            const authToken = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY);
            const response = await axios.get(`${host}/api/channels/get`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setSubscriptions(response.data.subscribedChannels);
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
        fetchSubscriptions()
    }, []);

    const handleSubscribe = async (channelName) => {

        const url = subscriptions.includes(channelName) ? `${host}/api/redis/unsubscribe` : `${host}/api/redis/subscribe`
        
        try {
            const authToken = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY);
            const response = await axios.post(url, { channelName }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (response.data.status) {
                await fetchSubscriptions()
                toast.success(response.data.msg, toastOptions);
            } else {
                toast.error(response.data.msg, toastOptions);
            }
        } catch (error) {
            console.error("Error subscribing:", error);
            toast.error("Some error occurred", toastOptions);
        }
    

    };

    const filteredChannels = showAuthorizedOnly
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
                            subscriptions.includes(channel.channelName) ? (
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
                                    onClick={() => handleSubscribe(channel.channelName)}
                                >
                                    Subscribed
                                    <MdCheck className="ml-2" />
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                    onClick={() => handleSubscribe(channel.channelName)}
                                >
                                    Subscribe
                                </button>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscribe;

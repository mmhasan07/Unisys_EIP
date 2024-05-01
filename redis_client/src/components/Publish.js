import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../utils/APIRoutes';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import TextViewer from './TextViewer'; // Import the TextViewer component

const Publish = () => {
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(''); // State to store the selected channel

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

    const handleChannelChange = (event) => {
        setSelectedChannel(event.target.value); // Update the selected channel when dropdown value changes
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-4 text-center">Publish to Authorized Channels</h1>
            <div className="flex justify-center mb-4">
                <label className="mr-2">Select Channel:</label>
                <select value={selectedChannel} onChange={handleChannelChange}>
                    <option value="">Select a channel</option>
                    {channels.map(channel => (
                        <option key={channel._id} value={channel.channelName}>{channel.channelName}</option>
                    ))}
                </select>
            </div>
            {selectedChannel && <TextViewer selectedChannel={selectedChannel} />} {/* Render TextViewer only if a channel is selected */}
        </div>
    );
};

export default Publish;

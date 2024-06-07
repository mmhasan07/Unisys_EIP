import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../utils/APIRoutes';
import { toast } from 'react-toastify';

const MultiOrganizations = () => {
    const [allChannels, setAllChannels] = useState([]);
    const [allOrgs, setAllOrgs] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('');

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

    const fetchChannels = async () => {
        try {
            const authToken = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY);
            const response = await axios.get(`${host}/api/channels/get/all`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setAllChannels(response.data.channels);
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };

    const fetchAllOrgs = async (selectedChannel) => {
        try {
            const authToken = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY);
            const response = await axios.get(`${host}/api/channels/getallorgs`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            const authorizedOrgs = allChannels.find(channel => channel.channelName === selectedChannel)?.authorizedOrganizations || [];
            const filteredOrgs = response.data.allOrganizations.filter(org => !authorizedOrgs.includes(org));
            setAllOrgs(filteredOrgs);
        } catch (error) {
            console.error('Error fetching orgs:', error);
        }
    };

    const handleChannelChange = (e) => {
        const channelName = e.target.value;
        setSelectedChannel(channelName);
        fetchAllOrgs(channelName);
    };

    const handleOrgChange = (e) => {
        setSelectedOrg(e.target.value);
    };

    const addMultiOrgs = async () => {
        try {
            const authToken = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY);
            const response = await axios.put(`${host}/api/channels/addmultiorgs`, {
                channelName: selectedChannel,
                organization: selectedOrg
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log('Response:', response.data)
            setSelectedOrg('')
            setSelectedChannel('')
            fetchChannels()
            if(response.data.status===true) toast.success("added organization", toastOptions)
        } catch (error) {
            console.error('Error adding multi organizations:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Select Channel and Organization</h2>
            <div className="flex mb-4">
                <label htmlFor="channel" className="mr-2">Select Channel:</label>
                <select id="channel" onChange={handleChannelChange} value={selectedChannel} className="border rounded-md px-2 py-1">
                    <option value="">Select Channel</option>
                    {allChannels.map(channel => (
                        <option key={channel._id} value={channel.channelName}>{channel.channelName}</option>
                    ))}
                </select>
            </div>
            <div className="flex">
                <label htmlFor="organization" className="mr-2">Select Organization:</label>
                <select id="organization" onChange={handleOrgChange} value={selectedOrg} className="border rounded-md px-2 py-1">
                    <option value="">Select Organization</option>
                    {allOrgs.map(org => (
                        <option key={org} value={org}>{org}</option>
                    ))}
                </select>
            </div>
            <button onClick={addMultiOrgs} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Organizations</button>
        </div>
    );
};

export default MultiOrganizations;

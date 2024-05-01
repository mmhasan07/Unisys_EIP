import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { host } from '../utils/APIRoutes';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreateChannel = () => {
    const [channelName, setChannelName] = useState('');
    const navigate = useNavigate()

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(channelName)
        if (channelName.trim() === '') {
            toast.error('Channel name cannot be empty');
            return;
        }
        const authToken = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY); // Retrieve the auth token
        const response = await axios.post(`${host}/api/channels/create`, { channelName: channelName, authorizedOrganizations:[] }, {
            headers: {
                Authorization: `Bearer ${authToken}` 
            }
        });

        if(response.data.status){
            toast.success(`Channel "${channelName}" created successfully`, toastOptions);
            setTimeout(() => {
                navigate("/allChannels")
            }, [2000])
        }
        else toast.error(`${response.data.msg}`, toastOptions);
    };

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="channelName">
                        Channel Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="channelName"
                        type="text"
                        placeholder="Enter channel name"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Create Channel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateChannel;

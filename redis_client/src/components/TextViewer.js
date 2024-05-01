import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TextViewer = ({ selectedChannel }) => {
    const [jsonData, setJsonData] = useState('');

    const handleInputChange = (event) => {
        setJsonData(event.target.value);
    };

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const handleSubmit = async () => {
        try {
            // Retrieve the authorization token from sessionStorage
            const authToken = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY);

            // Make the HTTP POST request to the specified URL
            const response = await axios.post(
                'http://localhost:8080/api/redis/publish',
                {
                    channel: selectedChannel,
                    message: JSON.parse(jsonData)
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );

            if (response.data.status) {
                toast.success(`Successfully published Data to channel - ${selectedChannel}`, toastOptions)

            } else {
                toast.error(response.data.msg, toastOptions)
            }
        } catch (error) {
            console.error('Error publishing data:', error);
        } finally {
            setJsonData('')
        }
    };

    return (
        <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold mb-4">Publish Data</h2>
            <textarea
                value={jsonData}
                onChange={handleInputChange}
                placeholder="Paste JSON data here"
                rows={15}
                cols={50}
                style={{ resize: 'vertical', fontSize: '1.2rem' }}
                className="block mx-auto mb-4 border rounded-lg"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Publish
            </button>
        </div>
    );
};

export default TextViewer;

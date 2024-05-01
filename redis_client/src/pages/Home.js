import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Data from '../components/Data';
import { host } from '../utils/APIRoutes';

function Home() {
  const navigate = useNavigate();
  const [filterChannels, setFilterChannels] = useState([]);
  const [selectedFilterChannel, setSelectedFilterChannel] = useState('');

  useEffect(() => {
    async function getSubsChannels() {
      try {
        const resp = await axios.get(`${host}/api/channels/get`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)}`,
          },
        });
        setFilterChannels(resp.data.subscribedChannels);
      } catch (error) {
        console.error('Error fetching subscribed channels:', error);
      }
    }
    getSubsChannels();
  }, []);

  const handleFilterChange = (event) => {
    setSelectedFilterChannel(event.target.value);
  };

  return (
    <>
      <div className="">
        <div className="text-4xl w-[100vw] ml-auto mr-auto align-middle">Your Data</div>
        <div className="text-2xl w-[100vw] ml-auto mr-auto align-middle">Your Data</div>
        {/* Dropdown menu for selecting filter channel */}
        <select value={selectedFilterChannel} onChange={handleFilterChange} className="mt-4 mb-8 p-2 rounded-lg border border-gray-300">
          <option value="">Select a channel</option>
          {filterChannels.map((channel, index) => (
            <option key={index} value={channel}>{channel}</option>
          ))}
        </select>
        <Data selectedFilterChannel={selectedFilterChannel} />
      </div>
    </>
  );
}

export default Home;

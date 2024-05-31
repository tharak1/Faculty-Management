import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios';
import serverString from '../../models/ServerString';

const DevOptions:React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    console.log(error);
    
    const mark = async () => {
        setLoading(true);
        const url = `${serverString}/api/faculty/resetAttendance`;
        const token = localStorage.getItem('token');
    
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setError('');
          } else {
            setError('Something went wrong');
          }
        } catch (error) {
          setError('Error retrieving data');
        } finally {
          setLoading(false);
        }
      };

  return (
    <div className="grid grid-cols-3">
      <div className="sm:hidden max-sm:col-span-3 sm:col-span-2 ">
        <Navbar/>
      </div>


      <div className="max-sm:col-span-3 col-span-1 m-4 h-40 bg-slate-200 dark:bg-slate-700 dark:text-white rounded-md p-4">
        <h1>Reset Faculty Attendance:</h1>
        <div className="flex justify-center items-center h-full" id="mark_atten">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={mark}
            disabled={loading}
          >
            {loading ? 'Reseting...' : 'Reset'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DevOptions

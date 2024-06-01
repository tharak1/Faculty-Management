import React, { useState } from 'react';
import logo from '../assets/cmr-logo.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import serverString from '../models/ServerString';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const getData = async () => {
    const url = `${serverString}/api/faculty/getFacultyDetails`;
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        const isAdmin = response.data.IsAdmin;
        localStorage.setItem('admin', isAdmin ? 'true' : 'false');
        navigate("/app/home");
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.log('Error retrieving data');
    }
  };

  const login = async () => {
    setLoading(true);
    setLoginError("");  // Clear previous errors before starting the new login attempt

    const url = `${serverString}/api/faculty/login`;
    const postData = {
      UserName: username,
      Password: password
    };

    try {
      const response = await axios.post(url, postData);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log('Login successful');
        await getData();
      } else if (response.status === 215) {
        console.log(response.data.error);
        setLoginError(response.data.error);
      } else {
        setLoginError("Error logging in");
      }
    } catch (error) {
      setLoginError("Error logging in");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row h-screen justify-center items-center w-full max-sm:p-4">
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/4 border-2 border-gray-300 rounded-lg">
        
        <div className='flex flex-row justify-center items-center'>
          <img src={logo} alt="" className='h-32 w-32 object-fill' />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="LoggingEmailAddress">Faculty ID / Username</label>
          <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="loggingPassword">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type={visible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
              onClick={toggleVisibility}
            >
              {visible ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </button>
          </div>
        </div>
        <div className='w-full flex justify-center items-center mt-2'><p className='text-red-400'>{loginError}</p></div>
        <div className="mt-6">
          <button
            className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg ${loading ? 'cursor-not-allowed' : 'hover:bg-gray-700'} focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50`}
            onClick={login}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white inline mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l-3.5-3.5A8 8 0 004 12h4zm2 5.29L7.29 16H4a8 8 0 008 8v-4l-3.5-3.5c-.14.31-.31.61-.5.89z"
                ></path>
              </svg>
            ) : (
              <span>Login</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

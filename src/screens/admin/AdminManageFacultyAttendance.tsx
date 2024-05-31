import React, { useEffect, useState } from 'react';
import { formatDate } from '../../hooks/DateFormater';
import Faculty from '../../models/FacultyModel';
import axios from 'axios';
import SubstituteModel from '../../models/SubstitueModel';
import Navbar from '../../components/Navbar';
import serverString from '../../models/ServerString';

const AdminManageFacultyAttendance: React.FC = () => {
  const [allFaculty, setAllFaculty] = useState<Faculty[]>([]);
  const [filteredFaculty, setFilteredFaculty] = useState<Faculty[]>([]);
  const [substitutesData, setSubstitutesData] = useState<SubstituteModel[]>([]);
  const [filteredSubstitutesData, setFilteredSubstitutesData] = useState<SubstituteModel[]>([]);

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInput1, setSearchInput1] = useState<string>('');

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loading1, setLoading1] = useState<boolean>(true);


  console.log(loading,error);


  const syncData = async () => {
    const url = `${serverString}/api/faculty/getAllFaculty`;
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setAllFaculty(response.data.reverse());
        setFilteredFaculty(response.data.reverse());
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Error retrieving data');
    } finally {
      setLoading(false);
    }
  };


  const getAcceptedSubstituteData = async() =>{
    const url = `${serverString}/api/faculty/getSubstituteConfirm`;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSubstitutesData(response.data);
        setFilteredSubstitutesData(response.data);
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Error retrieving data');
    } finally {
      setLoading1(false);
    }
  }

  useEffect(() => {
    syncData();
    getAcceptedSubstituteData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (allFaculty) {
      const filtered = allFaculty.filter(ftt =>
        ftt.FacultyName.toLowerCase().includes(value.toLowerCase()) ||
        ftt.FacultyId.toLowerCase().includes(value.toLowerCase())
      );
    setFilteredFaculty(filtered);
    }
  };

  const handleSubstiuteSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput1(value);
    if (substitutesData) {
      const filtered = substitutesData.filter(ftt =>
        ftt.AcceptedLecturer!.toLowerCase().includes(value.toLowerCase()) ||
        ftt.OriginalLecturer.toLowerCase().includes(value.toLowerCase()) ||
        ftt.Subject.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSubstitutesData(filtered);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full sm:h-screen bg-slate-200 sm:p-5">
      <div className='sm:hidden max-sm:col-span-2'>
          <Navbar/>
      </div>

      <div className="max-sm:col-span-2 max-sm:mx-3 sm:col-span-1 h-full bg-white rounded-lg overflow-auto flex flex-col justify-center ">
        <form className="w-full p-5">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-3 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full ps-10 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Faculty Name, Faculty Id..."
              value={searchInput}
              onChange={handleSearch}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-0.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <h1 className="p-4">{formatDate(new Date())}</h1>
        <div className="h-full bg-white w-full overflow-auto p-4">
          {

            loading?(
              <div className='h-full w-full flex justify-center items-center'>
                Loading...
              </div>
            ):
          filteredFaculty.length===0?(
            <div className='h-full w-full flex justify-center items-center'>
            No Faculty found
          </div>
          ):
          filteredFaculty.map((faculty, index) => (
            <div
              className="flex w-full p-4 justify-between items-center rounded-md bg-slate-200 my-2"
              key={index}
            >
              <div className="flex flex-col">
                <p>Name : {faculty.FacultyName}</p>
                <p>Id : {faculty.FacultyId}</p>
              </div>
              <div className="flex items-center justify-between">
                {faculty.TodaysAttendance !== 0 ? (
                  <span className="bg-green-600 opacity-75 text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">Present</span>
                ) : (
                  <span className="bg-red-600 opacity-75 text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">Absent</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-sm:col-span-2 max-sm:mx-3 col-span-1 h-full bg-white rounded-lg p-5">
                    <form className="w-full">   
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full ps-10 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Faculty Name, Faculty Id, Subject..." 
                            value={searchInput1}
                            onChange={handleSubstiuteSearch}
                            required />
                            <button type="submit" className="text-white absolute end-0.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>

                    <div className="h-full w-full overflow-auto">
                      {
                        loading1?(
                          <div className='h-full w-full flex justify-center items-center'>
                          Loading...
                        </div>
                        ):filteredSubstitutesData.length === 0?(
                          <div className='h-full w-full flex justify-center items-center'>
                          No Substitutes Data
                        </div>
                        ):
                        filteredSubstitutesData.map((obj,index)=>(
                          <div className='flex flex-row w-full max-sm:flex-col justify-between bg-slate-200 rounded-md my-2 p-3' key={index}>
                            <div>
                              <p>from : {obj.OriginalLecturer}</p>
                              <p>subject : {obj.Subject}</p>
                              <p>contact no : {obj.ContactNo}</p>
                              <p>sent On : {obj.SentOn}</p>
                            </div>

                            <div>
                              <p>class : {obj.Department}-{obj.Section}</p>
                              <p>Year : {obj.Year}</p>
                              <p>Time : {obj.StartTime} - {obj.EndTime}</p>
                              <p>On : {obj.Date}</p>
                            </div>
                        </div>
                        ))
}
                    </div>
          </div>

    </div>
  );
};

export default AdminManageFacultyAttendance;

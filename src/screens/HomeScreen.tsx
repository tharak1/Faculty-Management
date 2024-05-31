import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Faculty from '../models/FacultyModel';
import { formatWeekday } from '../hooks/DateFormater';
import { DaySchedule, FacultyTimeTable } from '../models/FaclutyTimeTableModel';
import Navbar from '../components/Navbar';
import serverString from '../models/ServerString';

const HomeScreen: React.FC = () => {
  const [facultyData, setFacultyData] = useState<Faculty | null>(null);
  const [facultyTimeTable, setFacultyTimeTable] = useState<FacultyTimeTable | null>(null);
  const [dayTimeTable, setDayTimeTable] = useState<DaySchedule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading1, setLoading1] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const setTodaysTimeTable = (timeTable: FacultyTimeTable | null) => {
    const todaysPeriods: DaySchedule | undefined = timeTable?.TimeTable.find(
      (daySchedule) => daySchedule.Day === formatWeekday(new Date())
    );
    setDayTimeTable(todaysPeriods || null);
  };



  useEffect(() => {
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
          setFacultyData(response.data);
        } else {
          setError('Something went wrong');
        }
      } catch (error) {
        setError('Error retrieving data');
      } finally {
        setLoading(false);
      }
    };

    const getTimeTable = async () => {
      const url = `${serverString}/api/faculty/getFacultyTimeTable`;
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setFacultyTimeTable(response.data);
          setTodaysTimeTable(response.data);
        } else {
          setError('Something went wrong');
        }
      } catch (error) {
        setError('Error retrieving data');
      } finally {
        setLoading1(false);
      }
    };

    getData();
    getTimeTable();
  }, []);

  useEffect(() => {
    if (facultyTimeTable) {
      setTodaysTimeTable(facultyTimeTable);
    }
  }, [facultyTimeTable]);


  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 sm:grid-rows-8  gap-2 h-screen w-full ">
      <div className="sm:row-span-1 col-span-1 sm:col-span-2 ">
        <Navbar/>
      </div>

      {loading ? (
        <div className="col-span-1 sm:col-span-2 row-span-4 p-2 sm:p-4 flex justify-center items-center rounded-md bg-slate-100">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="col-span-1 sm:col-span-2 row-span-4 p-2 sm:p-4 flex justify-center items-center rounded-md bg-slate-100">
          <p>{error}</p>
        </div>
      ) : (
        <div className="col-span-1 sm:col-span-2 sm:row-span-4  p-2 sm:p-4">
          <div className="w-full h-full rounded-md bg-slate-100 dark:bg-slate-700 dark:text-white p-4 flex flex-col sm:flex-row">
            <div className="w-full max-sm:flex max-sm:flex-row flex flex-col sm:flex-row justify-start items-center sm:items-start border-b-2 sm:border-b-0 sm:border-r-2 border-slate-300 dark:border-slate-900 p-2 sm:p-4">
              <div className="flex-shrink-0  ">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  alt="Profile"
                  className="w-24 h-24 sm:w-40 sm:h-40 rounded-md object-cover"
                />
              </div>
              <div className="h-full flex flex-col justify-around items-start ml-4 mt-4 sm:mt-0">
                <p className="text-md sm:text-lg font-semibold">Name: {facultyData!.FacultyName}</p>
                <p className="text-md sm:text-lg">Id: {facultyData!.FacultyId}</p>
                <p className="text-md sm:text-lg">Designation: {facultyData!.FacultyDesignation}</p>
                <p className="text-md sm:text-lg">Classes : {facultyData?.Classes.map((obj)=>(
                  <span>{obj.Department}-{obj.Section}</span>
                ))}</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col items-start justify-around p-2 sm:p-5 ">
              <p className="text-md sm:text-lg">Email : {facultyData!.FacultyEmail}</p>
              <p className="text-md sm:text-lg">Contact No : {facultyData!.FacultyPhnNo}</p>
              <p className="text-md sm:text-lg">DOB : {facultyData!.FacultyDOB}</p>
              <div>
                <p className="text-md sm:text-lg">Address:</p>
                <p className="text-md sm:text-lg">{facultyData!.FacultyAddress}</p>
              </div>
            </div>
          </div>
        </div>
      )}
        <div className="col-span-1 row-span-3 p-2 sm:p-5 dark:text-white overflow-clip">
        <div className="rounded-md bg-slate-200 dark:bg-slate-700 dark:text-white shadow-md overflow-auto h-full p-3">

      {loading1 ? (
        <div className="col-span-1 row-span-3 p-2 sm:p-5 dark:text-white overflow-clip flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="col-span-1 row-span-3 p-2 sm:p-5 dark:text-white overflow-clip flex justify-center items-center">
          <p>{error}</p>
        </div>
      ) : (
<>
            <h1 className="text-md sm:text-lg mb-2">Today's Classes:</h1>
            {dayTimeTable ? (
              dayTimeTable.Periods.map((periods, index) => (
                <div
                  className="rounded-md bg-slate-50 w-full p-4 flex justify-between my-1 dark:bg-slate-500 dark:text-white"
                  key={index}
                >
                  <p className="text-sm sm:text-base">{periods.SubjectName}</p>
                  <p className="text-sm sm:text-base">{periods.Department}-{periods.Section}</p>
                  <p className="text-sm sm:text-base">Year : {periods.Year}</p>
                  <p className="text-sm sm:text-base">{periods.StartTime} - {periods.EndTime}</p>
                </div>
              ))
            ) : (
              <p>No periods scheduled for today.</p>
            )}

</>
          
        
      )}
      </div>
      </div>

      <div className="col-span-1 row-span-3 p-2 sm:p-5">
        <div className="rounded-md bg-slate-100 dark:bg-slate-700 dark:text-white shadow-md overflow-auto h-full p-3 flex flex-col">
          <h1 className="text-md sm:text-lg mb-4">Today's Attendance:</h1>
          <div className="flex flex-grow justify-center items-center">
            {
              loading?(
                <div className='w-full h-full flex justify-center items-center'>Loading...</div>
              ):
              facultyData?.TodaysAttendance === 1 ? (            <div
                id="toast-success"
                className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                  <span className="sr-only">Check icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">Attendance Marked successfully.</div>
              </div>):(
                <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                    </svg>
                    <span className="sr-only">Error icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">Attendance Not Marked</div>
            </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

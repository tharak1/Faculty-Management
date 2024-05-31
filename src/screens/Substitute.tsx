import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Faculty from '../models/FacultyModel';
import { DaySchedule, FacultyTimeTable } from '../models/FaclutyTimeTableModel';
import NotifiModal from '../components/NotificationModal';
import Navbar from '../components/Navbar';
import serverString from '../models/ServerString';

const Substitute:React.FC = () => {
  const [facultyData, setFacultyData] = useState<Faculty | null>(null);
  const [substitutes, setSubstitutes] = useState<KaliModel[]>([]);
  const [facultyTimeTable, setFacultyTimeTable] = useState<FacultyTimeTable | null>(null);
  const [dayTimeTable, setDayTimeTable] = useState<DaySchedule | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loading1, setLoading1] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  console.log(loading,error);


  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');

  const search = () =>{
    setTodaysTimeTable(facultyTimeTable);
  }

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

  useEffect(() => {


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
          setTodaysTimeTable(response.data); // Call setTodaysTimeTable after fetching faculty timetable
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



  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const dateObj = new Date(selectedDate);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDay = days[dateObj.getDay()];
    setSelectedDate(selectedDate);
    setSelectedDay(selectedDay); // Update dayTimeTable when date changes
  };

  const setTodaysTimeTable = (timeTable: FacultyTimeTable | null) => {
    const todaysPeriods: DaySchedule | undefined = timeTable?.TimeTable.find(
      (daySchedule) => daySchedule.Day === selectedDay
    );
    setDayTimeTable(todaysPeriods || null);
  };

  const searchSubstitutes = async () => {
    console.log(selectedValue);
    
    setLoading1(true); // Set loading state to true when searching for substitutes
    const url = `${serverString}/api/faculty/searchSubstitutes?facultyDepartment=${facultyData?.FacultyDepartment}&day=${selectedDay}`;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        url,
        {
          StartTime: selectedValue.split("-")[0],
          EndTime: selectedValue.split("-")[1]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSubstitutes(response.data);
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Error retrieving data');
    } finally {
      setLoading1(false); // Set loading state to false after fetching substitutes
    }
  };


  const sendRequest = async(fid:string,fname:string) =>{
    console.log(selectedValue.split("-")[0]);
    
    const subPeriod = dayTimeTable?.Periods.find(obj=>obj.StartTime === selectedValue.split("-")[0] && obj.EndTime === selectedValue.split("-")[1]);
    console.log(subPeriod);
    
    const url = `${serverString}/api/faculty/sendingSubstituteRequest`;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        url,
        {
          startTime:subPeriod?.StartTime,
          endTime:subPeriod?.EndTime,
          date:selectedDate,
          day:selectedDay,
          department:subPeriod?.Department,
          section:subPeriod?.Section,
          regulation:subPeriod?.Regulation,
          year:subPeriod?.Year,
          subjectName:subPeriod?.SubjectName,
          facultyName:facultyData?.FacultyName,
          facultyphno:facultyData?.FacultyPhnNo,
          selectefacultyId:fid,
          selectedfacultyName:fname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // setSubstitutes(response.data);
        open();
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Error retrieving data');
    } finally {
      setLoading1(false); // Set loading state to false after fetching substitutes
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    console.log(newValue);
    
    setSelectedValue(newValue);
  };

  let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }


  const acceptRequest = async(index:number) =>{
    const url = `${serverString}/api/faculty/acceptOrRejectRequest?accepted=true`;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        url,
        {
          facultyId:facultyData?.FacultyId,
          facultyName:facultyData?.FacultyName,
          index:index
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        getData();
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Error retrieving data');
    } finally {
      setLoading1(false);
    }
  }

  const rejectRequest = async(index:number) =>{
    const url = `${serverString}/api/faculty/acceptOrRejectRequest?accepted=false`;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        url,
        {
          facultyId:facultyData?.FacultyId,
          facultyName:facultyData?.FacultyName,
          index:index
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        getData();
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Error retrieving data');
    } finally {
      setLoading1(false);
    }
  }



  
  return (
    <div className="grid grid-cols-2 sm:grid-rows-12 gap-3 sm:h-screen w-full sm:p-5 bg-slate-200 max-sm:overflow-auto">
      <div className="sm:hidden sm:row-span-1 max-sm:col-span-2 sm:col-span-2 ">
        <Navbar/>
      </div>


      <div className='max-sm:col-span-2 max-sm:m-3 col-span-1 bg-white row-span-12 p-4 rounded-lg flex flex-col justify-between' >
        <h1 className="font-semibold text-lg">
          Department : {facultyData?.FacultyDepartment}
        </h1>
        <div className="flex flex-row items-center mt-4">
          <span className='text-lg'>Select the date : </span>
          <input onChange={handleDateChange} type="date" className=" ml-2 block w-full md:w-auto p-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>

        <div className=''>
          <p>Date: {selectedDate}</p>
          <p>Day: {selectedDay}</p>
        </div>

        <div className='w-full flex'>
        <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mt-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={search}>
            get Your Periods
          </button>
        </div>

        <div className='flex flex-col mt-4'>
          <p className='text-lg'>Select the period time from the dropdown : </p>

          <div className="flex justify-start items-start mb-4">
                
                <select id="questionType" onChange={handleSelectChange} value={selectedValue} className="mt-2 max-w-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                <option value="">-- Select time --</option>
                {
                  dayTimeTable?.Periods.map((obj,index)=>(
                    <option value={`${obj.StartTime}-${obj.EndTime}`} key={index}>{obj.StartTime}-{obj.EndTime}</option>
                  ))
                }
                </select>
          </div>
        </div>

        <div className='w-full flex'>
        <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={searchSubstitutes}>
            Search
          </button>
        </div>

        <div className="h-1/2 bg-gray-200 rounded-md flex flex-col  overflow-auto p-4">
          {substitutes.length == 0?(
          <h2>Search To Get Results</h2>
          ):(
            loading1?(
              <h2 className='w-full h-full flex justify-center items-center'>Loading...</h2>
            ):(
              substitutes.map((obj,index)=>(
                <div className='flex flex-row w-full justify-between bg-slate-100 rounded-md my-1 p-3' key={index}>
                  <div>
                    <p>Name : {obj.FacultyName}</p>
                    <p>Faculty Id : {obj.FacultyId}</p>
                    <p>subject : {obj.Subject}</p>
                    <p>contact no : {obj.ContactNo}</p>
                  </div>
                  <div className='flex flex-col justify-around items-center' onClick={()=>{sendRequest(obj.FacultyId,obj.FacultyName)}}>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Request</button>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>

      <div className="max-sm:col-span-2 max-sm:m-3  max-sm:h-fit sm:col-span-1 sm:row-span-6 bg-white rounded-lg overflow-auto p-4 ">
          <p className="text-lg">Pending Requests : </p>

          {
          loading?(
            <div className='w-full h-full flex justify-center items-center'>Loading...</div>
          ):
          facultyData?.InQueueSubstituteInfo.length === 0?(<h2 className='w-full h-full flex justify-center items-center'>No Requests</h2>):
          facultyData?.InQueueSubstituteInfo.map((obj,index)=>(
                      <div className='flex flex-row max-sm:flex-col w-full justify-between bg-slate-100 rounded-md my-1 p-3 ' key={index}>
                          <div className='border-r-2 border-gray-400 p-2'>
                            <p>from : {obj.OriginalLecturer}</p>
                            <p>subject : {obj.Subject}</p>
                            <p>contact no : {obj.ContactNo}</p>
                            <p>sent On : {obj.SentOn}</p>
            
                          </div>
            
                          <div className=' p-2'>
                            <p>class : {obj.Department}-{obj.Section}</p>
                            <p>Year : {obj.Year}</p>
                            <p>Timings : {obj.StartTime}-{obj.EndTime}</p>
                            <p>On : {obj.Date} {obj.Day}</p>
            
                          </div>
            
                          <div className='flex flex-col max-sm:flex-row justify-around items-center'>
                          <button onClick={()=>{acceptRequest(index)}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Accept</button>
                          <button onClick={()=>{rejectRequest(index)}} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-1.5 text-center  dark:bg-red-300 dark:hover:bg-red-500 dark:focus:ring-red-900">Reject</button>
                          </div>
                      </div>
          ))
          
          }
      </div>



      <div className="max-sm:col-span-2 max-sm:h-fit max-sm:m-3 sm:col-span-1 sm:row-span-6 bg-white rounded-lg overflow-auto p-4">
          <p className="text-lg">Accepted Requests : </p>


            {
                        loading?(
                          <div className='w-full h-full flex justify-center items-center'>Loading...</div>
                        ):
              facultyData?.AcceptedSubstitueInfo.length === 0 ?(
                <h2>No Accepted info</h2>
              ):

                facultyData?.AcceptedSubstitueInfo.map((obj,index)=>(
                <div className='flex flex-row max-sm:flex-col w-full justify-between bg-slate-200 rounded-md my-1 p-3' key={index}>
                <div>
                  <p>from : {obj.OriginalLecturer}</p>
                  <p>subject : {obj.Subject}</p>
                  <p>contact no : {obj.ContactNo}</p>
                  <p>sent On : {obj.SentOn}</p>
                </div>
    
                <div>
                  <p>class : {obj.Department}-{obj.Section}</p>
                  <p>Year : {obj.Year}</p>
                  <p>Timings : {obj.StartTime}-{obj.EndTime}</p>
                  <p>On : {obj.Date} {obj.Day}</p>
                </div>
              </div>
              ))
            }

      </div>

            <NotifiModal isOpen={isOpen} close={close} Title='Substitute Request' Desc='Substitute request sent successfully'/>
    </div>
  )
}

export default Substitute

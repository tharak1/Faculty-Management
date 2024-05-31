import React, { useEffect, useState } from 'react'
import { formatDate, formatWeekday } from '../hooks/DateFormater'
import { DaySchedule, FacultyTimeTable } from '../models/FaclutyTimeTableModel';
import axios from 'axios';
import Faculty from '../models/FacultyModel';
import SubstituteModel from '../models/SubstitueModel';
import Navbar from '../components/Navbar';
import serverString from '../models/ServerString';



const TimeTable:React.FC = () => {


    const [facultyData, setFacultyData] = useState<Faculty | null>(null);
    const [facultyTimeTable, setFacultyTimeTable] = useState<FacultyTimeTable | null>(null);
    const [dayTimeTable, setDayTimeTable] = useState<DaySchedule | null>(null);
    const [substituteModels, setSubstituteModels] = useState<SubstituteModel[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loading1, setLoading1] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

  console.log(loading,error,loading1);


    const findSub = () =>{
        const todayDate = new Date().toISOString().split('T')[0];

        const temp: SubstituteModel[] = facultyData?.AcceptedSubstitueInfo.filter(
            (obj) => obj.Date === todayDate
          ) ?? [];
          
        setSubstituteModels(temp);
    }

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
          findSub();
        }
      }, [facultyTimeTable]);


  return (
    <div className='grid grid-cols-3 sm:grid-rows-2 gap-3 sm:p-4 h-screen w-full bg-slate-200'>
      <div className='sm:hidden sm:row-span-1 max-sm:col-span-3 sm:col-span-2'>
      <Navbar/>
      </div>


      <div className="max-sm:col-span-3 max-sm:h-fit max-sm:m-3  sm:col-span-1 sm:row-span-1 h-full rounded-lg bg-white  dark:bg-slate-700 dark:text-white p-5 overflow-auto">
          <div>
            <h2>Today's Schedule : </h2>
            <h2>{formatDate(new Date())}</h2>
          </div>


            {
              dayTimeTable?.Periods.length===0?(
                <div className='w-full h-full flex justify-center items-center'>No classes Today</div>
              ):
                dayTimeTable?.Periods.map((periods,index)=>(
                    <div className='w-full flex flex-row justify-between rounded-md bg-slate-300 p-3 my-1' key={index}>
                        <div className='flex flex-col justify-center items-center'>
                            <p>{periods.StartTime}-{periods.EndTime}</p>
                            <p>{periods.ClassType}</p>
                        </div>
                        <div className='flex flex-col '> 
                            <p>{periods.SubjectName}</p>
                            <p>{periods.Department}-{periods.Section} Year:{periods.Year}</p>
                        </div>
                    </div>
                ))
            }
      </div>



      <div className="max-sm:col-span-3 max-sm:h-fit max-sm:m-3 col-span-1 row-span-1 col-start-1 row-start-2 h-full rounded-lg bg-white  dark:bg-slate-700 dark:text-white p-5 overflow-auto">
          <div>
            <h2>Today's Substitute Schedule : </h2>
            <h2>{formatDate(new Date())}</h2>
          </div>
          {
            loading?(
              <div className='h-full w-full flex justify-center items-center'>
                  Loading....
              </div>
            ):
            substituteModels?.length === 0 ? (
                <div className='w-full h-full flex justify-center items-center'>No substitutes Today</div>
            ):(
                substituteModels?.map((obj,index)=>(
                <div className='w-full flex flex-row justify-between rounded-md bg-slate-300 p-3 my-1' key={index}>
                    <div className='flex flex-col justify-center items-center'>
                        <p>{obj.StartTime} - {obj.EndTime}</p>
                        <p>{obj.OriginalLecturer}</p>
                    </div>
                    <div className='flex flex-col '> 
                        <p>Subject</p>
                        <p>{obj.Department}-{obj.Section} Year : {obj.Year}</p>
                    </div>
                </div>
                ))
            )
          }

      </div>


      <div className='max-sm:col-span-3 max-sm:h-fit max-sm:m-3 col-span-2 row-span-2 h-full rounded-lg bg-white  dark:bg-slate-700 dark:text-white p-5 overflow-auto'>
          <h1>Overal TimeTable: </h1>
          <div className= "mt-5 p-4 bg-slate-200 rounded-md">
            {
              loading1?(
                <div className='h-full w-full flex justify-center items-center'>Loading...</div>
              ):
                facultyTimeTable?.TimeTable.map((obj,index)=>(
                    <div key={index}>
                    <h2 className="my-2">{obj.Day}</h2>
                    {
                        obj.Periods.map((periods,index)=>(
                            <div
                            className="rounded-md bg-slate-50 w-full p-4 flex justify-between my-2 dark:bg-slate-500 dark:text-white"
                            key={index}
                        >
                            <p className="text-sm sm:text-base">{periods.SubjectName}</p>
                            <p className="text-sm sm:text-base">{periods.Department}-{periods.Section}</p>
                            <p className="text-sm sm:text-base">Year : {periods.Year}</p>
                            <p className="text-sm sm:text-base">{periods.StartTime} - {periods.EndTime}</p>
                        </div>
                        ))
                    }
                    </div>
                ))
            }
        </div>




          
      </div>


    </div>
  )
}

export default TimeTable

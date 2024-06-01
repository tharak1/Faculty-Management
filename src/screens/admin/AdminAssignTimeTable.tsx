import axios from 'axios';
import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FacultyTimeTable, Period } from '../../models/FaclutyTimeTableModel';
import NotifiModal from '../../components/NotificationModal';
import Navbar from '../../components/Navbar';
import serverString from '../../models/ServerString';

const AdminAssignTimeTable: React.FC = () => {
  const [facultyTimeTable, setFacultyTimeTable] = useState<FacultyTimeTable[] | null>([]);
  const [filteredFacultyTimeTable, setFilteredFacultyTimeTable] = useState<FacultyTimeTable[] | null>([]);
  const [periodData, setPeriodData] = useState<Period>({
    StartTime: "",
    EndTime: "",
    ClassType: "",
    Section: "",
    Department: "",
    Year: "",
    Regulation: "",
    SubjectName: "",
    SubjectCode: "",
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [addPeriodDayIndex,setAddPeriodIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isOpen1, setIsOpen1] = useState<boolean>(false);

  console.log(error);
  

  const closeModal1 = () => {
    setIsOpen1(false);
  };

  const getTimeTable = async () => {
    const url = `${serverString}/api/faculty/getAllFacultyTimeTable`;
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setFacultyTimeTable(response.data);
        setFilteredFacultyTimeTable(response.data); 
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
    getTimeTable();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    if (facultyTimeTable) {
      const filtered = facultyTimeTable.filter(ftt =>
        ftt.FacultyName.toLowerCase().includes(value.toLowerCase()) ||
        ftt.FacultyId.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFacultyTimeTable(filtered);
    }
  };

  const addPeriod = () => {
    const updatedTimeTable = [...filteredFacultyTimeTable!];
    updatedTimeTable[selectedIndex!].TimeTable[addPeriodDayIndex].Periods.push(periodData);

    setFilteredFacultyTimeTable(updatedTimeTable);

    setPeriodData({
      StartTime: "",
      EndTime: "",
      ClassType: "",
      Section: "",
      Department: "",
      Year: "",
      Regulation: "",
      SubjectName: "",
      SubjectCode: "",
    });

    closeModal1();
  };

  const deletePeriod = (dayIndex: number, periodIndex: number) => {
    const updatedTimeTable = [...filteredFacultyTimeTable!];
    updatedTimeTable[selectedIndex!].TimeTable[dayIndex].Periods = updatedTimeTable[selectedIndex!].TimeTable[dayIndex].Periods.filter((_, i) => i !== periodIndex);
    
    setFilteredFacultyTimeTable(updatedTimeTable);
  };

  useEffect(() => {
    const isValid = Object.values(periodData).every(value => value !== '');
    setIsFormValid(isValid);
  }, [periodData]);


  const updateFaculty = async() =>{
    const url = `${serverString}/api/faculty/updateFacultyTimeTable`;
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(url,
        filteredFacultyTimeTable![selectedIndex!]
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        getTimeTable();
        open();
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Error retrieving data');
    } finally {
      setLoading(false);
    }
  }

  let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-rows-8 sm:h-screen w-full bg-slate-200 sm:p-5">
      <div className='sm:hidden max-sm:col-span-2'>
          <Navbar/>
      </div>

      <div className="max-sm:col-span-2 max-sm:mx-3 max-sm:h-fit sm:col-span-1 sm:row-span-8 h-full bg-white rounded-lg shadow-md ">
        <div className="col-span-1 h-full bg-white rounded-lg overflow-auto flex flex-col justify-center">
          <form className="w-full p-5">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search" value={searchInput} onChange={handleSearch} className="block w-full ps-10 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Faculty Name, Faculty Id..." required />
              <button type="submit" className="text-white absolute end-0.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>

          <div className='h-full bg-white w-full overflow-auto p-4'>
            {
              loading?(
                <div className='h-full w-full flex justify-center items-center'>
                Loading...
              </div>
              ):
              filteredFacultyTimeTable !== null ? filteredFacultyTimeTable.map((obj, index) => (
                <div className="flex w-full p-4 justify-between items-center rounded-md bg-slate-200 my-2" key={index}>
                  <div className='flex flex-col '>
                    <p>Name : {obj.FacultyName}</p>
                    <p>Id : {obj.FacultyId}</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <button onClick={() => { setSelectedIndex(index) }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                  </div>
                </div>
              )) : (<h2> NO data </h2>)
            }

          </div>
        </div>
      </div>

      <div className="max-sm:col-span-2 max-sm:mx-3 max-sm:h-fit relative col-span-1 sm:row-span-8 h-full bg-white rounded-lg shadow-md ">

        <div className='h-full overflow-auto px-5 pt-5 pb-16 '>
        {
          selectedIndex === null ? (<h2 className='h-full flex justify-center items-center'> select to show data </h2>) : (
            filteredFacultyTimeTable![selectedIndex]?.TimeTable.map((obj, index) => (
              <div key={index}>
                <h2 className="my-2">{obj.Day}</h2>
                {
                  <>
                    {obj.Periods.map((periods, index1) => (
                      <div
                        className="rounded-md bg-slate-50 w-full p-4 flex justify-between my-2 dark:bg-slate-500 dark:text-white"
                        key={index1}
                      >
                        <span className="text-sm sm:text-base">{periods.SubjectName}</span>
                        <span className="text-sm sm:text-base">{periods.Department}-{periods.Section}</span>
                        <span className="text-sm sm:text-base">Year : {periods.Year}</span>
                        <span className="text-sm sm:text-base">{periods.StartTime} - {periods.EndTime}</span>
                        <button type="button" onClick={() => { deletePeriod(index, index1) }} className="h-8 w-18 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-1 py-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"><DeleteForeverIcon /></button>
                      </div>
                    ))}
                    <div className='w-full flex flex-row items-end'>
                      <button onClick={() => {setIsOpen1(true),setAddPeriodIndex(index) }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                    </div>
                  </>
                }
              </div>
            ))
          )
        }
        </div>
            <div className='absolute w-full bottom-0 bg-slate-100 flex justify-center items-center mt-2 p-2 rounded-b-lg '  >
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center"
            onClick={updateFaculty}>
              Update
            </button>
        </div>





      </div>



      <NotifiModal isOpen={isOpen} close={close} Title='Time Table Update' Desc='Time Table Updated successfully'/>

      {/* addPeriod(index), */}

      {/* Modal for adding a period */}
      <Transition appear show={isOpen1} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal1}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-gray-50">
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold mb-4">Add Class</h2>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">Department</label>
                      <input
                        type="text"
                        value={periodData.Department}
                        onChange={(e) => setPeriodData({...periodData, Department: e.target.value})}
                        className="border border-gray-300 rounded-lg p-2.5 w-full"
                        required
                      />
                      <label className="block text-sm font-medium text-gray-900">Section</label>
                      <input
                        type="text"
                        value={periodData.Section}
                        onChange={(e) => setPeriodData({...periodData, Section: e.target.value})}
                        className="border border-gray-300 rounded-lg p-2.5 w-full"
                        required
                      />
                      <label className="block text-sm font-medium text-gray-900">Regulation</label>
                      <input
                        type="text"
                        value={periodData.Regulation}
                        onChange={(e) => setPeriodData({...periodData, Regulation: e.target.value})}
                        className="border border-gray-300 rounded-lg p-2.5 w-full"
                        required
                      />
                      <label className="block text-sm font-medium text-gray-900">Year</label>
                      <input
                        type="text"
                        value={periodData.Year}
                        onChange={(e) => setPeriodData({...periodData, Year: e.target.value})}
                        className="border border-gray-300 rounded-lg p-2.5 w-full"
                        required
                      />
                      <label className="block text-sm font-medium text-gray-900">ClassType</label>
                      <input
                        type="text"
                        value={periodData.ClassType}
                        onChange={(e) => setPeriodData({...periodData,ClassType : e.target.value})}
                        className="border border-gray-300 rounded-lg p-2.5 w-full"
                        required
                      />
                      <label className="block text-sm font-medium text-gray-900">SubjectName</label>
                      <input
                        type="text"
                        value={periodData.SubjectName}
                        onChange={(e) => setPeriodData({...periodData, SubjectName: e.target.value})}
                        className="border border-gray-300 rounded-lg p-2.5 w-full"
                        required
                      />
                      <label className="block text-sm font-medium text-gray-900">SubjectCode</label>
                      <input
                        type="text"
                        value={periodData.SubjectCode}
                        onChange={(e) => setPeriodData({...periodData, SubjectCode: e.target.value})}
                        className="border border-gray-300 rounded-lg p-2.5 w-full"
                        required
                      />      
                      <label className="block text-sm font-medium text-gray-900">StartTime in HH-MM</label>
                      <input
                        type="text"
                        value={periodData.StartTime}
                        onChange={(e) => setPeriodData({...periodData, StartTime: e.target.value})}
                        className="border border-gray-300 rounded-lg p-2.5 w-full"
                        required
                      /> 
                      <label className="block text-sm font-medium text-gray-900">EndTime in HH-MM</label>
                      <input
                        type="text"
                        value={periodData.EndTime}
                        onChange={(e) => setPeriodData({...periodData, EndTime: e.target.value})}
                        className="border border-gray-300 rounded-lg p-2.5 w-full"
                        required
                      />                                       
                    </div>
                    <button
                      type="button"
                      className={`w-full py-2 text-center rounded-lg text-white font-bold focus:outline-none ${
                        isFormValid ? 'bg-violet-600 hover:bg-violet-800' : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      onClick={addPeriod}
                      disabled={!isFormValid}
                    >
                      Add Class
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

    </div>
  );
};

export default AdminAssignTimeTable;




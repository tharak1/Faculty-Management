import React, { useEffect, useState,Fragment } from 'react';
import AddFacultyModal from '../../components/AddFacultyModal';
import axios from 'axios';
import Faculty from '../../models/FacultyModel';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../../components/Navbar';
import serverString from '../../models/ServerString';
import NotifiModal from '../../components/NotificationModal';

const AdminManageFaculty: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allFaculty, setAllFaculty] = useState<Faculty[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [classesData, setClassesData] = useState<Classes>({
    Department: '',
    Section: '',
    Regulation: '',
    Year: ''
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const isValid = Object.values(classesData).every(value => value !== '');
    setIsFormValid(isValid);
  }, [classesData]);


  const closeModal = () => {
    setIsOpen(false);
    syncData();
  };

  const openModal = () => {
    setIsOpen(true);
  };


  const closeModal2 = () => {
    setIsOpen2(false);
    syncData();
  };

  const openModal2 = () => {
    setIsOpen2(true);
  };


  const closeModal1 = () => {
    if (selectedIndex !== null && isFormValid) {
      const a = [...filteredFaculty];
      const temp = a[selectedIndex];
      temp.Classes.push(classesData);
      
      setAllFaculty(a);
      setClassesData({
        Department: '',
        Section: '',
        Regulation: '',
        Year: ''
      });
    }
    setIsOpen1(false);
  };

  const openModal1 = () => {
    setIsOpen1(true);
  };

  const deleteFaculty = async(Id:string) =>{
    const url = `${serverString}/api/faculty/deleteFaculty`;
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(url,
      {
        FacultyId:Id
      }
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        syncData();
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Error retrieving data');
    } finally {
      setLoading(false);
    }
  }

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
    syncData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredFaculty = allFaculty.filter((faculty) => {
    return (
      faculty.FacultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.FacultyId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }); 


  const deleteClassAtIndex = (index:number)=>{
    const a = [...filteredFaculty];
    const temp = a[selectedIndex!];
    temp.Classes.splice(index, 1);
    setAllFaculty(a);
  }


  const updateIndividualFacultyData = async() =>{
    const url = `${serverString}/api/faculty/updateFaculty`;
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(url,
        filteredFaculty[selectedIndex!]
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {

        syncData();
        openModal2();
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError('Error retrieving data');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-rows-8 gap-3 bg-slate-200 sm:p-5 sm:h-screen overflow-auto">
        <div className='sm:hidden max-sm:col-span-2'>
          <Navbar/>
        </div>

        <div className="col-span-2 row-span-1 max-sm:mx-3">
          <div className="text-center rounded-lg text-white font-bold">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center"
              onClick={openModal}
            >
              <AddIcon/>
              Add Faculty
            </button>
          </div>
        </div>


        <div className="max-sm:mx-3 max-sm:col-span-2 max-sm:h-fit sm:col-span-1 sm:row-span-7 sm:h-full bg-white rounded-lg overflow-auto flex flex-col justify-center ">
          <form className="w-full p-3">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
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
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full ps-10 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Faculty Name, Faculty Id..."
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

          <div className="h-full bg-white w-full overflow-auto p-4">
            {loading && <p className='w-full h-full flex justify-center items-center'>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && filteredFaculty.length > 0 ? (
              filteredFaculty.map((obj, index) => (
                <div
                  className="flex w-full p-4 justify-between items-center rounded-md bg-slate-200 my-2"
                  key={index}
                >
                  <div className="flex flex-col">
                    <p>Name: {obj.FacultyName}</p>
                    <p>Id: {obj.FacultyId}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => { setSelectedIndex(index) }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ml-4 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-1.5 text-center dark:bg-red-300 dark:hover:bg-red-500 dark:focus:ring-red-900"
                    onClick={()=>{deleteFaculty(obj.FacultyId)}}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No faculty members found.</p>
            )}
          </div>
        </div>

        <div className='max-sm:mx-3 relative max-sm:col-span-2 sm:col-span-1 sm:row-span-7  w-full  bg-white rounded-lg  flex justify-start items-start overflow-auto'>
          {
            selectedIndex === null ? (<h1 className='p-4'>Select to View data</h1>) : (
              <>
                <div className='relative flex flex-col items-start w-full p-4 max-sm:overflow-auto max-sm:mb-10'>

                  
                  <p><span className='text-lg font-semibold py-1'>Faculty Name : </span> <span>{filteredFaculty[selectedIndex].FacultyName}</span></p>
                  <p><span className='text-lg font-semibold py-1'>Faculty Id :</span> <span>{filteredFaculty[selectedIndex].FacultyId}</span></p>
                  <p><span className='text-lg font-semibold py-1'>Faculty Email :</span> <span>{filteredFaculty[selectedIndex].FacultyEmail}</span></p>
                  <p><span className='text-lg font-semibold py-1'>Faculty DOB :</span> <span>{filteredFaculty[selectedIndex].FacultyDOB}</span></p>
                  <p><span className='text-lg font-semibold py-1'>Faculty Department :</span> <span>{filteredFaculty[selectedIndex].FacultyDepartment}</span></p>
                  <p><span className='text-lg font-semibold py-1'>Faculty Designation :</span> <span>{filteredFaculty[selectedIndex].FacultyDesignation}</span></p>
                  <p><span className='text-lg font-semibold py-1'>Faculty Address :</span> <span>{filteredFaculty[selectedIndex].FacultyAddress}</span></p>
                  <p><span className='text-lg font-semibold py-1'>Faculty Name :</span> <span>{filteredFaculty[selectedIndex].FacultyName}</span></p>

 
                  <h2 className='my-2 text-lg font-semibold'>Classes : </h2>
                  {
                    filteredFaculty[selectedIndex].Classes.map((obj, index) => (
                      <div
                        className="rounded-md bg-slate-100 h-full w-full p-4 flex justify-between my-1 dark:bg-slate-500 dark:text-white"
                        key={index}
                      >
                        <p className="text-sm sm:text-base">{obj.Department}-{obj.Section}</p>
                        <p className="text-sm sm:text-base">Year : {obj.Year}</p>

                      <button
                        type="button"
                        className="ml-4 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-1.5 text-center dark:bg-red-300 dark:hover:bg-red-500 dark:focus:ring-red-900"
                      onClick={() =>{deleteClassAtIndex(index)}}>
                        Delete
                      </button>

                      </div>
                    ))
                  }

                </div>


              </>
            )
          }
          {
            selectedIndex!==null &&(
              <div className='absolute bottom-0 w-full flex justify-center items-center bg-slate-100 rounded-b-lg'>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center"
              onClick={updateIndividualFacultyData}>
                Update
              </button>
  
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center"
                onClick={openModal1}>
                Add Class
              </button>
            </div>
            )
          }

        </div>
      </div>
      <AddFacultyModal isOpen={isOpen} onClose={closeModal} />
      <NotifiModal Title='Faculty update' Desc='faculty class has added' isOpen={isOpen2} close={closeModal2}/>

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
                      onChange={(e) => setClassesData({...classesData, Department: e.target.value})}
                      className="border border-gray-300 rounded-lg p-2.5 w-full"
                      required
                    />
                    <label className="block text-sm font-medium text-gray-900">Section</label>
                    <input
                      type="text"
                      onChange={(e) => setClassesData({...classesData, Section: e.target.value})}
                      className="border border-gray-300 rounded-lg p-2.5 w-full"
                      required
                    />
                    <label className="block text-sm font-medium text-gray-900">Regulation</label>
                    <input
                      type="text"
                      onChange={(e) => setClassesData({...classesData, Regulation: e.target.value})}
                      className="border border-gray-300 rounded-lg p-2.5 w-full"
                      required
                    />
                    <label className="block text-sm font-medium text-gray-900">Year</label>
                    <input
                      type="text"
                      onChange={(e) => setClassesData({...classesData, Year: e.target.value})}
                      className="border border-gray-300 rounded-lg p-2.5 w-full"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className={`w-full py-2 text-center rounded-lg text-white font-bold focus:outline-none ${
                      isFormValid ? 'bg-violet-600 hover:bg-violet-800' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    onClick={closeModal1}
                    disabled={!isFormValid}
                  >
                    Submit Class
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
    </>
  );
};

export default AdminManageFaculty;
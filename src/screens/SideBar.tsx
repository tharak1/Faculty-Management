// import React, { useEffect, useState } from 'react';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import HomeSharpIcon from '@mui/icons-material/HomeSharp';
// import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
// import AssignmentIndSharpIcon from '@mui/icons-material/AssignmentIndSharp';
// import DisplaySettingsSharpIcon from '@mui/icons-material/DisplaySettingsSharp';
// import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
// import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
// import AddToPhotosSharpIcon from '@mui/icons-material/AddToPhotosSharp';
// import { useDispatch, useSelector } from 'react-redux';
// import { Theme } from '../redux/ThemeSlice';
// import { RootState, AppDispatch } from '../redux/PersistanceStorage';
// import { toggleDrawer } from '../redux/DrawerSlice';
// import CloseIcon from '@mui/icons-material/Close';

// const SideBar: React.FC = () => {
//   const theme = useSelector(Theme);
//   const navigate = useNavigate();
//   const [isAdmin,setIsAdmin] = useState<boolean>(false);

//   const logout = () =>{
//     localStorage.clear();
//     navigate("/");
//     handleToggle();
//   }

//   useEffect(() => {
//     const userString = localStorage.getItem('user');
//     console.log(userString);

//     if (userString) {
//         const user = JSON.parse(userString);
//         setIsAdmin(user.IsAdmin);
//         console.log(isAdmin);
        
//     }
// }, []);

// useEffect(() => {
//   console.log("isAdmin changed:", isAdmin);
// }, [isAdmin]);

// const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
// const dispatch: AppDispatch = useDispatch();

// const handleToggle = () => {
//   dispatch(toggleDrawer());
// };
//   return (
//     <div className={theme}>
//       <div className="sm:grid sm:grid-cols-5 sm:grid-rows-1 h-screen">
//         <div className={`${isOpen?"max-sm:w-full z-10 ":"max-sm:hidden"}  overflow-y-auto py-5 px-3 h-screen bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 col-span-1 row-start-1 row-span-1 flex flex-col justify-between`}>
//           <div>
//           <button onClick={handleToggle} className='sm:hidden mb-4'>
//             <CloseIcon/>
//           </button>
//             <ul className="space-y-2">
//               <li>
//                 <NavLink
//                 onClick={handleToggle}
//                   to="/app/home"
//                   className={({ isActive }) =>
//                     `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
//                       isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                     }`
//                   }
//                 >
//                   <HomeSharpIcon />
//                   <span className="ml-3">Home</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                 onClick={handleToggle}

//                   to="/app/mark_attendance"
//                   className={({ isActive }) =>
//                     `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
//                       isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                     }`
//                   }
//                 >
//                   <AssignmentIndSharpIcon />
//                   <span className="ml-3">Mark Attendance</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                 onClick={handleToggle}

//                   to="/app/substitute"
//                   className={({ isActive }) =>
//                     `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
//                       isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                     }`
//                   }
//                 >
//                   <DisplaySettingsSharpIcon />
//                   <span className="ml-3">Substitute</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                 onClick={handleToggle}

//                   to="/app/timeTable"
//                   className={({ isActive }) =>
//                     `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
//                       isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                     }`
//                   }
//                 >
//                   <CalendarMonthSharpIcon />
//                   <span className="flex-1 ml-3 whitespace-nowrap">TimeTable</span>
//                 </NavLink>
//               </li>
//             </ul>
//             {
               
//                isAdmin &&(
//                 <ul className="pt-5 mt-5 space-y-2 border-t border-gray-400 dark:border-gray-700">
//                 <li>
//                   <NavLink
//                 onClick={handleToggle}

//                     to="/app/admin/manage_faculty"
//                     className={({ isActive }) =>
//                       `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
//                         isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                       }`
//                     }
//                   >
//                     <PeopleSharpIcon />
//                     <span className="ml-3">Manage Faculty</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                 onClick={handleToggle}

//                     to="/app/admin/manage_faculty_attendance"
//                     className={({ isActive }) =>
//                       `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
//                         isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                       }`
//                     }
//                   >
//                     <ContactsSharpIcon />
//                     <span className="ml-3">Faculty Attendance</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                 onClick={handleToggle}
//                     to="/app/admin/manage_TimeTable"
//                     className={({ isActive }) =>
//                       `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
//                         isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                       }`
//                     }
//                   >
//                     <AddToPhotosSharpIcon />
//                     <span className="ml-3">Manage TimeTable</span>
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                 onClick={handleToggle}
//                     to="/app/admin/dev"
//                     className={({ isActive }) =>
//                       `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
//                         isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                       }`
//                     }
//                   >
//                     <span className="ml-3">Dev Options</span>
//                   </NavLink>
//                 </li>





//               </ul>
//               )
//             }
            
//           </div>
//           <div className="flex flex-row justify-center items-center">
//             <button
//               type="button"
//               className="text-gray-900 bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-around dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
//             onClick={logout}>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="logout"><path d="M15 24H1c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1s-1-.4-1-1V2H2v20h12v-6c0-.6.4-1 1-1s1 .4 1 1v7c0 .6-.4 1-1 1z"></path><path d="M23 13H8c-.6 0-1-.4-1-1s.4-1 1-1h15c.6 0 1 .4 1 1s-.4 1-1 1z"></path><path d="M23 13c-.3 0-.5-.1-.7-.3l-4-4c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4 4c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z"></path><path d="M19 17c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4-4c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-4 4c-.2.2-.4.3-.7.3z"></path></svg>
//               <p className="ml-2">LogOut</p>
//             </button>
//           </div>
//         </div>
//         <div className={`${isOpen?"max-sm:hidden":""} max-sm:col-span-5 dark:bg-gray-900 col-span-4 row-start-1 row-span-1 `}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;


// import React, { useEffect, useState } from 'react';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import HomeSharpIcon from '@mui/icons-material/HomeSharp';
// import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
// import AssignmentIndSharpIcon from '@mui/icons-material/AssignmentIndSharp';
// import DisplaySettingsSharpIcon from '@mui/icons-material/DisplaySettingsSharp';
// import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
// import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
// import AddToPhotosSharpIcon from '@mui/icons-material/AddToPhotosSharp';
// import { useDispatch, useSelector } from 'react-redux';
// import { Theme } from '../redux/ThemeSlice';
// import { RootState, AppDispatch } from '../redux/PersistanceStorage';
// import { toggleDrawer } from '../redux/DrawerSlice';
// import CloseIcon from '@mui/icons-material/Close';

// const SideBar: React.FC = () => {
//   const theme = useSelector(Theme);
//   const navigate = useNavigate();
//   const [isAdmin, setIsAdmin] = useState<boolean>(false);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//     handleToggle();
//   };

//   useEffect(() => {
//     const userString = localStorage.getItem('user');
//     if (userString) {
//       const user = JSON.parse(userString);
//       setIsAdmin(user.IsAdmin);
//     }
//   }, []);

//   const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
//   const dispatch: AppDispatch = useDispatch();

//   const handleToggle = () => {
//     dispatch(toggleDrawer());
//   };

//   return (
//     <div className={theme}>
//       <div className="sm:grid sm:grid-cols-5 sm:grid-rows-1 h-screen">
//         <div className={`${isOpen ? "max-sm:w-full z-10 " : "max-sm:hidden"} overflow-y-auto py-5 px-3 h-screen bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 col-span-1 row-start-1 row-span-1 flex flex-col justify-between`}>
//           <div>
//             <button onClick={handleToggle} className='sm:hidden mb-4'>
//               <CloseIcon />
//             </button>
//             <ul className="space-y-2">
//               <li>
//                 <NavLink
//                   onClick={handleToggle}
//                   to="/app/home"
//                   className={({ isActive }) =>
//                     `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
//                       isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                     }`
//                   }
//                 >
//                   <HomeSharpIcon />
//                   <span className="ml-3">Home</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   onClick={handleToggle}
//                   to="/app/mark_attendance"
//                   className={({ isActive }) =>
//                     `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
//                       isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                     }`
//                   }
//                 >
//                   <AssignmentIndSharpIcon />
//                   <span className="ml-3">Mark Attendance</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   onClick={handleToggle}
//                   to="/app/substitute"
//                   className={({ isActive }) =>
//                     `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
//                       isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                     }`
//                   }
//                 >
//                   <DisplaySettingsSharpIcon />
//                   <span className="ml-3">Substitute</span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   onClick={handleToggle}
//                   to="/app/timeTable"
//                   className={({ isActive }) =>
//                     `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
//                       isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                     }`
//                   }
//                 >
//                   <CalendarMonthSharpIcon />
//                   <span className="flex-1 ml-3 whitespace-nowrap">TimeTable</span>
//                 </NavLink>
//               </li>
//             </ul>
//             {isAdmin && (
//               <ul className="pt-5 mt-5 space-y-2 border-t border-gray-400 dark:border-gray-700">
//                 <li>
//                   <NavLink
//                     onClick={handleToggle}
//                     to="/app/admin/manage_faculty"
//                     className={({ isActive }) =>
//                       `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
//                         isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                       }`
//                     }
//                   >
//                     <PeopleSharpIcon />
//                     <span className="ml-3">Manage Faculty</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     onClick={handleToggle}
//                     to="/app/admin/manage_faculty_attendance"
//                     className={({ isActive }) =>
//                       `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
//                         isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                       }`
//                     }
//                   >
//                     <ContactsSharpIcon />
//                     <span className="ml-3">Faculty Attendance</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     onClick={handleToggle}
//                     to="/app/admin/manage_TimeTable"
//                     className={({ isActive }) =>
//                       `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
//                         isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                       }`
//                     }
//                   >
//                     <AddToPhotosSharpIcon />
//                     <span className="ml-3">Manage TimeTable</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     onClick={handleToggle}
//                     to="/app/admin/dev"
//                     className={({ isActive }) =>
//                       `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
//                         isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
//                       }`
//                     }
//                   >
//                     <span className="ml-3">Dev Options</span>
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </div>
//           <div className="flex flex-row justify-center items-center">
//             <button
//               type="button"
//               className="text-gray-900 bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-around dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
//               onClick={logout}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="logout">
//                 <path d="M15 24H1c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1s-1-.4-1-1V2H2v20h12v-6c0-.6.4-1 1-1s1 .4 1 1v7c0 .6-.4 1-1 1z"></path>
//                 <path d="M23 13H8c-.6 0-1-.4-1-1s.4-1 1-1h15c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
//                 <path d="M23 13c-.3 0-.5-.1-.7-.3l-4-4c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4 4c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z"></path>
//                 <path d="M19 17c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4-4c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-4 4c-.2.2-.4.3-.7.3z"></path>
//               </svg>
//               <p className="ml-2">LogOut</p>
//             </button>
//           </div>
//         </div>
//         <div className={`${isOpen ? "max-sm:hidden" : ""} max-sm:col-span-5 dark:bg-gray-900 col-span-4 row-start-1 row-span-1 `}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;


import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import AssignmentIndSharpIcon from '@mui/icons-material/AssignmentIndSharp';
import DisplaySettingsSharpIcon from '@mui/icons-material/DisplaySettingsSharp';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
import AddToPhotosSharpIcon from '@mui/icons-material/AddToPhotosSharp';
import { useDispatch, useSelector } from 'react-redux';
import { Theme } from '../redux/ThemeSlice';
import { RootState, AppDispatch } from '../redux/PersistanceStorage';
import { toggleDrawer } from '../redux/DrawerSlice';
import CloseIcon from '@mui/icons-material/Close';

const SideBar: React.FC = () => {
  const theme = useSelector(Theme);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    handleToggle();
  };

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setIsAdmin(user.IsAdmin);
    }
  }, []);

  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
  const dispatch: AppDispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDrawer());
  };

  return (
    <div className={theme}>
      <div className="sm:grid sm:grid-cols-5 sm:grid-rows-1 h-screen">
        <div className={`${isOpen ? "max-sm:w-full z-10 " : "max-sm:hidden"} overflow-y-auto py-5 px-3 h-screen bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 col-span-1 row-start-1 row-span-1 flex flex-col justify-between`}>
          <div>
            <button onClick={handleToggle} className='sm:hidden mb-4'>
              <CloseIcon />
            </button>
            <ul className="space-y-2">
              <li>
                <NavLink
                  onClick={handleToggle}
                  to="/app/home"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
                    }`
                  }
                >
                  <HomeSharpIcon />
                  <span className="ml-3">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handleToggle}
                  to="/app/mark_attendance"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
                    }`
                  }
                >
                  <AssignmentIndSharpIcon />
                  <span className="ml-3">Mark Attendance</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handleToggle}
                  to="/app/substitute"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
                    }`
                  }
                >
                  <DisplaySettingsSharpIcon />
                  <span className="ml-3">Substitute</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handleToggle}
                  to="/app/timeTable"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
                    }`
                  }
                >
                  <CalendarMonthSharpIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">TimeTable</span>
                </NavLink>
              </li>
            </ul>
            {isAdmin && (
              <ul className="pt-5 mt-5 space-y-2 border-t border-gray-400 dark:border-gray-700">
                <li>
                  <NavLink
                    onClick={handleToggle}
                    to="/app/admin/manage_faculty"
                    className={({ isActive }) =>
                      `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
                        isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
                      }`
                    }
                  >
                    <PeopleSharpIcon />
                    <span className="ml-3">Manage Faculty</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleToggle}
                    to="/app/admin/manage_faculty_attendance"
                    className={({ isActive }) =>
                      `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
                        isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
                      }`
                    }
                  >
                    <ContactsSharpIcon />
                    <span className="ml-3">Faculty Attendance</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleToggle}
                    to="/app/admin/manage_TimeTable"
                    className={({ isActive }) =>
                      `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
                        isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
                      }`
                    }
                  >
                    <AddToPhotosSharpIcon />
                    <span className="ml-3">Manage TimeTable</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleToggle}
                    to="/app/admin/dev"
                    className={({ isActive }) =>
                      `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${
                        isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
                      }`
                    }
                  >
                    <span className="ml-3">Dev Options</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              type="button"
              className="text-gray-900 bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-around dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
              onClick={logout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="logout">
                <path d="M15 24H1c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1s-1-.4-1-1V2H2v20h12v-6c0-.6.4-1 1-1s1 .4 1 1v7c0 .6-.4 1-1 1z"></path>
                <path d="M23 13H8c-.6 0-1-.4-1-1s.4-1 1-1h15c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
                <path d="M23 13c-.3 0-.5-.1-.7-.3l-4-4c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4 4c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z"></path>
                <path d="M19 17c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4-4c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-4 4c-.2.2-.4.3-.7.3z"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
        <div className={`${isOpen ? "max-sm:hidden " : ""} sm:col-span-4 row-start-1 row-span-1 h-screen overflow-y-auto`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

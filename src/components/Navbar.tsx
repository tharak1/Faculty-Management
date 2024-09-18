import React from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch} from '../redux/PersistanceStorage';
import { toggleDrawer } from '../redux/DrawerSlice';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/cmr-logo.png';

const Navbar:React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleToggle = () => {
      dispatch(toggleDrawer());
    };
  return (
    <div className="w-full bg-white shadow-md dark:bg-slate-700 dark:text-white p-3 flex items-center">
    <div className='sm:hidden flex items-center justify-center mr-4'>
      <button onClick={handleToggle}>
        <MenuIcon/>
      </button>
    </div>
    <div className="flex items-center space-x-4">
      <img src={logo} alt="" className="h-full w-16 sm:w-20 object-cover" />
      <div className='text-lg font font-semibold '>MALLA REDDY ENGINEERING COLLEGE</div>
    </div>
  </div>
  )
}

export default Navbar

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import React, { useState, Fragment, useEffect } from 'react';
import Faculty from '../models/FacultyModel';
import axios from 'axios';
import serverString from '../models/ServerString';

interface AddFacultyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFacultyModal: React.FC<AddFacultyModalProps> = ({ isOpen, onClose }) => {
  const [facultyData, setFacultyData] = useState<Faculty>({
    FacultyId: '',
    FacultyName: '',
    FacultyEmail: '',
    FacultyDOB: '',
    FacultyDepartment: '',
    FacultyDesignation: '',
    FacultyPhnNo: '',
    FacultyAddress: '',
    UserName: '',
    Password: '',
    IsAdmin: false,
    Classes: [],
    AcceptedSubstitueInfo: [],
    InQueueSubstituteInfo: [],
    TodaysAttendance:0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const isValid = Object.values(facultyData).every((value) => value !== '');
    setIsFormValid(isValid);
  }, [facultyData]);

  const addFaculty = async () => {
    if (!isFormValid) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    const url = `${serverString}/api/faculty/create`;
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        url,
        {
          ...facultyData,
          Classes: [],
          AcceptedSubstitueInfo: [],
          InQueueSubstituteInfo: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setFacultyData(response.data);
        onClose();
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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                <DialogPanel className="w-full h-full overflow-auto max-w-md transform rounded-2xl p-2 text-left align-middle shadow-xl transition-all bg-gray-50">
                  <div className="p-6 space-y-4 overflow-auto h-full">
                    <h2 className="text-lg font-bold mb-2">Add Faculty</h2>
                    <form className="">
                      <label
                        htmlFor="FacultyId"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        Faculty Id
                      </label>
                      <input
                        value={facultyData.FacultyId}
                        onChange={(e) =>
                          setFacultyData({ ...facultyData, FacultyId: e.target.value })
                        }
                        type="text"
                        name="FacultyId"
                        id="FacultyId"
                        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                        required
                      />
                      <label
                        htmlFor="FacultyName"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        Faculty Name
                      </label>
                      <input
                        value={facultyData.FacultyName}
                        onChange={(e) =>
                          setFacultyData({ ...facultyData, FacultyName: e.target.value })
                        }
                        type="text"
                        name="FacultyName"
                        id="FacultyName"
                        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                        required
                      />
                      <label
                        htmlFor="FacultyEmail"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        Faculty Email
                      </label>
                      <input
                        value={facultyData.FacultyEmail}
                        onChange={(e) =>
                          setFacultyData({ ...facultyData, FacultyEmail: e.target.value })
                        }
                        type="text"
                        name="FacultyEmail"
                        id="FacultyEmail"
                        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                        required
                      />

                      <label
                        htmlFor="FacultyDOB"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        Faculty DOB
                      </label>
                      <input
                        value={facultyData.FacultyDOB}
                        onChange={(e) =>
                          setFacultyData({ ...facultyData, FacultyDOB: e.target.value })
                        }
                        type="text"
                        name="FacultyDOB"
                        id="FacultyDOB"
                        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                        required
                      />

                      <label
                        htmlFor="FacultyDepartment"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        Faculty Department
                      </label>
                      <input
                        value={facultyData.FacultyDepartment}
                        onChange={(e) =>
                          setFacultyData({ ...facultyData, FacultyDepartment: e.target.value })
                        }
                        type="text"
                        name="FacultyDepartment"
                        id="FacultyDepartment"
                        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                        required
                      />

                      <label
                        htmlFor="FacultyDesignation"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        Faculty Designation
                      </label>
                      <input
                        value={facultyData.FacultyDesignation}
                        onChange={(e) =>
                          setFacultyData({ ...facultyData, FacultyDesignation: e.target.value })
                        }
                        type="text"
                        name="FacultyDesignation"
                        id="FacultyDesignation"
                        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                        required
                      />

                      <label
                        htmlFor="FacultyPhnNo"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        Faculty PhnNo
                      </label>
                      <input
                        value={facultyData.FacultyPhnNo}
                        onChange={(e) =>
                          setFacultyData({ ...facultyData, FacultyPhnNo: e.target.value })
                        }
                        type="text"
                        name="FacultyPhnNo"
                        id="FacultyPhnNo"
                        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                        required
                      />

                      <label
                        htmlFor="FacultyAddress"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        Faculty Address
                      </label>
                      <input
                        value={facultyData.FacultyAddress}
                        onChange={(e) =>
                          setFacultyData({ ...facultyData, FacultyAddress: e.target.value })
                        }
                        type="text"
                        name="FacultyAddress"
                        id="FacultyAddress"
                        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                        required
                      />
                      <label
                        htmlFor="UserName"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        UserName
                      </label>
                      <input
                        value={facultyData.UserName}
                        onChange={(e) =>
                          setFacultyData({ ...facultyData, UserName: e.target.value })
                        }
                        type="text"
                        name="UserName"
                        id="UserName"
                        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                        required
                      />
                      <label
                        htmlFor="Password"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        Password
                      </label>
                      <input
                        value={facultyData.Password}
                        onChange={(e) =>
                          setFacultyData({ ...facultyData, Password: e.target.value })
                        }
                        type="text"
                        name="Password"
                        id="Password"
                        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                        required
                      />
                      <label
                        htmlFor="IsAdmin"
                        className="block mb-2 text-sm font-medium text-gray-900 capitalize"
                      >
                        Is Admin
                      </label>
                      <div className="flex justify-around">
                        <label>
                          <input
                            type="radio"
                            name="booleanOption"
                            value="True"
                            onChange={(e) =>
                              setFacultyData({
                                ...facultyData,
                                IsAdmin: e.target.value === 'True',
                              })
                            }
                          />
                          True
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="booleanOption"
                            value="False"
                            onChange={(e) =>
                              setFacultyData({
                                ...facultyData,
                                IsAdmin: e.target.value === 'True',
                              })
                            }
                          />
                          False
                        </label>
                      </div>
                    </form>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                      type="button"
                      className={`w-full py-2 text-center rounded-lg text-white font-bold focus:outline-none ${
                        isFormValid
                          ? 'bg-violet-600 hover:bg-violet-800'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      onClick={addFaculty}
                      disabled={!isFormValid || loading}
                    >
                      {loading ? 'Loading...' : 'Add Faculty'}
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

export default AddFacultyModal;

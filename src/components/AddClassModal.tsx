import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import React, { useState, Fragment, useEffect } from 'react';

interface Classes {
  Department: string;
  Section: string;
  Regulation: string;
  Year: string;
}

interface AddClassesModalProps {
  isOpen: boolean;
  onClose: () => void;
  setFacultyClass: React.Dispatch<React.SetStateAction<Classes>>;
}

const AddClassesModal: React.FC<AddClassesModalProps> = ({ isOpen, onClose, setFacultyClass }) => {
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

  const submitClasses = () => {
    console.log(classesData);
    
    setFacultyClass(classesData);
    onClose();
  };

  return (
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
                    onClick={submitClasses}
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
  );
};

export default AddClassesModal;

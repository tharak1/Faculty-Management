import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './PersistanceStorage'; // assuming you have a store setup // Import your faculty model here
import Faculty from '../models/FacultyModel';

interface FacultyState {
  faculty: Faculty | null;
  loading: boolean;
  error: string | null;
}

const initialState: FacultyState = {
  faculty: null,
  loading: false,
  error: null,
};

const facultySlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {
    setFaculty(state, action: PayloadAction<Faculty | null>) {
      state.faculty = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setFaculty, setLoading, setError, clearError } = facultySlice.actions;

export const selectFaculty = (state: RootState) => state.faculty.faculty;
export const selectLoading = (state: RootState) => state.faculty.loading;
export const selectError = (state: RootState) => state.faculty.error;

export default facultySlice.reducer;

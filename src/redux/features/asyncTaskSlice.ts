
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AsyncTaskState {
  isLoading: boolean;
  data: string | null;
  error: string | null;
  progress: number;
}

const initialState: AsyncTaskState = {
  isLoading: false,
  data: null,
  error: null,
  progress: 0,
};

// Simulate a long-running task with progress updates
export const performAsyncTask = createAsyncThunk(
  'asyncTask/performTask',
  async (taskDuration: number, { dispatch }) => {
    // Mock API call with progress updates
    const updateInterval = taskDuration * 100; // 10 updates
    
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, updateInterval));
      dispatch(updateProgress((i + 1) * 10));
    }
    
    return 'Task completed successfully!';
  }
);

export const asyncTaskSlice = createSlice({
  name: 'asyncTask',
  initialState,
  reducers: {
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
    resetTask: (state) => {
      state.isLoading = false;
      state.data = null;
      state.error = null;
      state.progress = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performAsyncTask.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
        state.progress = 0;
      })
      .addCase(performAsyncTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.progress = 100;
      })
      .addCase(performAsyncTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
        state.progress = 0;
      });
  },
});

export const { updateProgress, resetTask } = asyncTaskSlice.actions;

export default asyncTaskSlice.reducer;

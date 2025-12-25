import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResearchStudy, SearchFilters, UIState, StudyCategory, StudyStatus } from '../types';
import { researchStudies } from '../data/mockData';

// Initial Search Filters
const initialFilters: SearchFilters = {
  query: '',
  categories: [],
  years: [],
  status: [],
  regions: [],
  tags: [],
  authors: [],
  sortBy: 'date',
  sortOrder: 'desc',
};

// Initial UI State
const initialUIState: UIState = {
  sidebarCollapsed: false,
  theme: 'dark',
  viewMode: 'grid',
  activeModal: null,
  notifications: [],
};

// Studies Slice
const studiesSlice = createSlice({
  name: 'studies',
  initialState: {
    items: researchStudies,
    selectedStudy: null as ResearchStudy | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setStudies: (state, action: PayloadAction<ResearchStudy[]>) => {
      state.items = action.payload;
    },
    selectStudy: (state, action: PayloadAction<ResearchStudy | null>) => {
      state.selectedStudy = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Search Slice
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    filters: initialFilters,
    results: [] as ResearchStudy[],
    isSearching: false,
    totalResults: 0,
  },
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.filters.query = action.payload;
    },
    setCategories: (state, action: PayloadAction<StudyCategory[]>) => {
      state.filters.categories = action.payload;
    },
    setYears: (state, action: PayloadAction<number[]>) => {
      state.filters.years = action.payload;
    },
    setStatus: (state, action: PayloadAction<StudyStatus[]>) => {
      state.filters.status = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.filters.tags = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'relevance' | 'date' | 'title' | 'popularity'>) => {
      state.filters.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.filters.sortOrder = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
    },
    setResults: (state, action: PayloadAction<ResearchStudy[]>) => {
      state.results = action.payload;
      state.totalResults = action.payload.length;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
  },
});

// UI Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    addNotification: (state, action: PayloadAction<UIState['notifications'][0]>) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

// Configure Store
export const store = configureStore({
  reducer: {
    studies: studiesSlice.reducer,
    search: searchSlice.reducer,
    ui: uiSlice.reducer,
  },
});

// Export Actions
export const studiesActions = studiesSlice.actions;
export const searchActions = searchSlice.actions;
export const uiActions = uiSlice.actions;

// Export Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

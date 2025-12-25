import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { searchActions } from '../store';
import { ResearchStudy, StudyCategory } from '../types';

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Search hook
export const useSearch = () => {
  const dispatch = useAppDispatch();
  const { filters, results, isSearching, totalResults } = useAppSelector(state => state.search);
  const { items: allStudies } = useAppSelector(state => state.studies);

  const performSearch = useCallback(() => {
    dispatch(searchActions.setIsSearching(true));

    let filtered = [...allStudies];

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(study =>
        study.title.toLowerCase().includes(query) ||
        study.description.toLowerCase().includes(query) ||
        study.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (study.summary && study.summary.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(study => 
        filters.categories.includes(study.category)
      );
    }

    // Year filter
    if (filters.years.length > 0) {
      filtered = filtered.filter(study => 
        filters.years.includes(study.year)
      );
    }

    // Status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(study => 
        filters.status.includes(study.status)
      );
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(study =>
        filters.tags.some(tag => study.tags.includes(tag))
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime();
      }
      return filters.sortOrder === 'desc' ? comparison : -comparison;
    });

    dispatch(searchActions.setResults(filtered));
    dispatch(searchActions.setIsSearching(false));
  }, [allStudies, filters, dispatch]);

  return {
    filters,
    results,
    isSearching,
    totalResults,
    performSearch,
    setQuery: (query: string) => dispatch(searchActions.setQuery(query)),
    setCategories: (categories: StudyCategory[]) => dispatch(searchActions.setCategories(categories)),
    setYears: (years: number[]) => dispatch(searchActions.setYears(years)),
    resetFilters: () => dispatch(searchActions.resetFilters()),
  };
};

// Studies hook
export const useStudies = () => {
  const { items, selectedStudy, loading, error } = useAppSelector(state => state.studies);

  const featuredStudies = useMemo(() => 
    items.filter(study => study.isFeatured),
    [items]
  );

  const recentStudies = useMemo(() => 
    [...items]
      .sort((a, b) => new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime())
      .slice(0, 6),
    [items]
  );

  const studiesByCategory = useMemo(() => {
    const grouped: Record<string, ResearchStudy[]> = {};
    items.forEach(study => {
      if (!grouped[study.category]) {
        grouped[study.category] = [];
      }
      grouped[study.category].push(study);
    });
    return grouped;
  }, [items]);

  const studiesByYear = useMemo(() => {
    const grouped: Record<number, ResearchStudy[]> = {};
    items.forEach(study => {
      if (!grouped[study.year]) {
        grouped[study.year] = [];
      }
      grouped[study.year].push(study);
    });
    return grouped;
  }, [items]);

  const getStudyById = useCallback((id: string) => {
    return items.find(study => study.id === id);
  }, [items]);

  return {
    studies: items,
    selectedStudy,
    loading,
    error,
    featuredStudies,
    recentStudies,
    studiesByCategory,
    studiesByYear,
    getStudyById,
  };
};

// UI hook
export const useUI = () => {
  const dispatch = useAppDispatch();
  const ui = useAppSelector(state => state.ui);

  return {
    ...ui,
    toggleSidebar: () => dispatch({ type: 'ui/toggleSidebar' }),
    setViewMode: (mode: 'grid' | 'list') => dispatch({ type: 'ui/setViewMode', payload: mode }),
    openModal: (modalId: string) => dispatch({ type: 'ui/setActiveModal', payload: modalId }),
    closeModal: () => dispatch({ type: 'ui/setActiveModal', payload: null }),
  };
};

// Debounce hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

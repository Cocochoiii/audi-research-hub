import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Grid,
  List,
  X,
  SlidersHorizontal,
  Calendar,
  Tag,
} from 'lucide-react';
import { useSearch, useStudies } from '../hooks';
import { StudyCard } from '../components/StudyCard';
import { cn } from '../utils';
import { StudyCategory, StudyStatus } from '../types';

const categories: { id: StudyCategory; label: string }[] = [
  { id: 'consumer-insights', label: 'Consumer Insights' },
  { id: 'product-research', label: 'Product Research' },
  { id: 'market-trends', label: 'Market Trends' },
  { id: 'digital-experience', label: 'Digital Experience' },
  { id: 'brand-strategy', label: 'Brand Strategy' },
  { id: 'customer-journey', label: 'Customer Journey' },
  { id: 'technology', label: 'Technology' },
];

const years = [2024, 2023, 2022, 2021];

const statuses: { id: StudyStatus; label: string }[] = [
  { id: 'completed', label: 'Completed' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'draft', label: 'Draft' },
  { id: 'archived', label: 'Archived' },
];

export const Library: React.FC = () => {
  const { studies } = useStudies();
  const { filters, setQuery, setCategories, setYears, resetFilters, performSearch, results } = useSearch();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<StudyCategory[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<StudyStatus[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'relevance'>('date');

  // Perform search when filters change
  useEffect(() => {
    performSearch();
  }, [filters]);

  // Update filters when selections change
  useEffect(() => {
    setCategories(selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    setYears(selectedYears);
  }, [selectedYears]);

  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and sort studies
  const displayedStudies = useMemo(() => {
    let filtered = results.length > 0 || filters.query || filters.categories.length > 0 || filters.years.length > 0
      ? results
      : studies;

    // Apply status filter
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(s => selectedStatuses.includes(s.status));
    }

    // Sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [results, studies, selectedStatuses, sortBy, filters]);

  const toggleCategory = (categoryId: StudyCategory) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleYear = (year: number) => {
    setSelectedYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  const toggleStatus = (statusId: StudyStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(statusId)
        ? prev.filter(s => s !== statusId)
        : [...prev, statusId]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedYears([]);
    setSelectedStatuses([]);
    setSearchQuery('');
    resetFilters();
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedYears.length > 0 || selectedStatuses.length > 0 || searchQuery;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Research Library</h1>
          <p className="text-audi-gray-400">
            Browse and explore {studies.length} research studies
          </p>
        </div>
      </motion.div>

      {/* Search & Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-audi-gray-500" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search studies by title, description, tags..."
            className="w-full pl-12 pr-4 py-3.5 bg-audi-gray-800/50 border border-audi-gray-700 rounded-xl text-white placeholder-audi-gray-500 focus:outline-none focus:border-audi-gray-600 focus:bg-audi-gray-800 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-audi-gray-500 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-xl border transition-all',
              showFilters
                ? 'bg-audi-gray-800 border-audi-gray-600 text-white'
                : 'bg-transparent border-audi-gray-700 text-audi-gray-400 hover:border-audi-gray-600'
            )}
          >
            <SlidersHorizontal size={18} />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-5 h-5 rounded-full bg-audi-red text-white text-xs flex items-center justify-center">
                {selectedCategories.length + selectedYears.length + selectedStatuses.length}
              </span>
            )}
          </button>

          <div className="flex rounded-xl border border-audi-gray-700 overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-3 transition-colors',
                viewMode === 'grid'
                  ? 'bg-audi-gray-800 text-white'
                  : 'text-audi-gray-500 hover:text-white hover:bg-audi-gray-800/50'
              )}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-3 transition-colors',
                viewMode === 'list'
                  ? 'bg-audi-gray-800 text-white'
                  : 'text-audi-gray-500 hover:text-white hover:bg-audi-gray-800/50'
              )}
            >
              <List size={18} />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'relevance')}
            className="px-4 py-3 bg-audi-gray-800/50 border border-audi-gray-700 rounded-xl text-audi-gray-300 focus:outline-none focus:border-audi-gray-600 cursor-pointer"
          >
            <option value="date">Latest First</option>
            <option value="title">A-Z</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="card-audi p-6 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-audi-gray-300 mb-3 flex items-center gap-2">
                  <Tag size={14} />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm transition-all',
                        selectedCategories.includes(cat.id)
                          ? 'bg-audi-red text-white'
                          : 'bg-audi-gray-700/50 text-audi-gray-300 hover:bg-audi-gray-700'
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Years */}
              <div>
                <h3 className="text-sm font-medium text-audi-gray-300 mb-3 flex items-center gap-2">
                  <Calendar size={14} />
                  Year
                </h3>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => toggleYear(year)}
                      className={cn(
                        'px-4 py-1.5 rounded-lg text-sm transition-all',
                        selectedYears.includes(year)
                          ? 'bg-audi-red text-white'
                          : 'bg-audi-gray-700/50 text-audi-gray-300 hover:bg-audi-gray-700'
                      )}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-sm font-medium text-audi-gray-300 mb-3 flex items-center gap-2">
                  <Filter size={14} />
                  Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => toggleStatus(status.id)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm transition-all',
                        selectedStatuses.includes(status.id)
                          ? 'bg-audi-red text-white'
                          : 'bg-audi-gray-700/50 text-audi-gray-300 hover:bg-audi-gray-700'
                      )}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="pt-4 border-t border-audi-gray-700">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-audi-red hover:text-audi-red-light transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-audi-gray-400">
          Showing <span className="text-white font-medium">{displayedStudies.length}</span> studies
          {hasActiveFilters && ' (filtered)'}
        </p>
      </div>

      {/* Studies Grid/List */}
      <AnimatePresence mode="wait">
        {displayedStudies.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            )}
          >
            {displayedStudies.map((study, index) => (
              <StudyCard
                key={study.id}
                study={study}
                variant={viewMode === 'list' ? 'compact' : 'default'}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-audi-gray-800 flex items-center justify-center mb-6">
              <Search size={40} className="text-audi-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No studies found</h3>
            <p className="text-audi-gray-400 mb-6 max-w-md">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <button
              onClick={clearAllFilters}
              className="btn-audi-secondary"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search as SearchIcon,
  Filter,
  X,
  Clock,
  TrendingUp,
  LayoutGrid,
  List,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useStudies, useDebounce } from '../hooks';
import { StudyCard } from '../components/StudyCard';
import { StudyCategory, StudyStatus } from '../types';
import { cn, getCategoryColor } from '../utils';

const recentSearches = [
  'NEV consumer insights',
  'Digital touchpoint',
  'Premium customer',
  'Gen Z lifestyle',
  'Connectivity features',
];

const suggestedQueries = [
  { label: 'Trending: EV adoption patterns', query: 'EV adoption' },
  { label: 'Popular: Customer journey mapping', query: 'customer journey' },
  { label: 'New: 2023 market analysis', query: '2023 market' },
];

const categories: { id: StudyCategory; label: string }[] = [
  { id: 'consumer-insights', label: 'Consumer Insights' },
  { id: 'product-research', label: 'Product Research' },
  { id: 'market-trends', label: 'Market Trends' },
  { id: 'digital-experience', label: 'Digital Experience' },
  { id: 'brand-strategy', label: 'Brand Strategy' },
  { id: 'customer-journey', label: 'Customer Journey' },
  { id: 'technology', label: 'Technology' },
  { id: 'sustainability', label: 'Sustainability' },
];

const years = [2024, 2023, 2022, 2021];
const statuses: { id: StudyStatus; label: string }[] = [
  { id: 'completed', label: 'Completed' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'draft', label: 'Draft' },
  { id: 'archived', label: 'Archived' },
];

export const Search: React.FC = () => {
  const { studies } = useStudies();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<StudyCategory[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<StudyStatus[]>([]);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'title'>('relevance');
  
  const debouncedQuery = useDebounce(query, 300);

  const toggleCategory = (cat: StudyCategory) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleYear = (year: number) => {
    setSelectedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const toggleStatus = (status: StudyStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedYears([]);
    setSelectedStatuses([]);
    setQuery('');
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedYears.length > 0 || selectedStatuses.length > 0;

  const filteredStudies = useMemo(() => {
    let results = [...studies];

    // Text search
    if (debouncedQuery.trim()) {
      const searchTerms = debouncedQuery.toLowerCase().split(' ');
      results = results.filter(study => {
        const searchableText = `${study.title} ${study.description} ${study.tags.join(' ')} ${study.category}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter(study => selectedCategories.includes(study.category));
    }

    // Year filter
    if (selectedYears.length > 0) {
      results = results.filter(study => selectedYears.includes(study.year));
    }

    // Status filter
    if (selectedStatuses.length > 0) {
      results = results.filter(study => selectedStatuses.includes(study.status));
    }

    // Sorting
    switch (sortBy) {
      case 'date':
        results.sort((a, b) => new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime());
        break;
      case 'title':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'relevance':
      default:
        if (debouncedQuery) {
          // Simple relevance: title matches score higher
          results.sort((a, b) => {
            const aTitle = a.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ? 1 : 0;
            const bTitle = b.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ? 1 : 0;
            return bTitle - aTitle;
          });
        }
    }

    return results;
  }, [studies, debouncedQuery, selectedCategories, selectedYears, selectedStatuses, sortBy]);

  const hasSearched = query.length > 0 || hasActiveFilters;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Search Research
        </h1>
        <p className="text-audi-gray-400">
          Find studies, insights, and documents across the entire research library
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="relative">
          <SearchIcon 
            size={22} 
            className="absolute left-5 top-1/2 -translate-y-1/2 text-audi-gray-400" 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, keyword, category, or author..."
            className="w-full h-14 pl-14 pr-32 bg-audi-gray-800 border border-audi-gray-700 rounded-xl text-white placeholder-audi-gray-500 focus:outline-none focus:border-audi-red/50 focus:ring-2 focus:ring-audi-red/20 transition-all text-lg"
            autoFocus
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-2 hover:bg-audi-gray-700 rounded-lg transition-colors"
              >
                <X size={18} className="text-audi-gray-400" />
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                showFilters || hasActiveFilters
                  ? 'bg-audi-red text-white'
                  : 'bg-audi-gray-700 text-audi-gray-300 hover:bg-audi-gray-600'
              )}
            >
              <Filter size={16} />
              <span className="text-sm font-medium">Filters</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full text-xs">
                  {selectedCategories.length + selectedYears.length + selectedStatuses.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-6 bg-audi-gray-800/50 border border-audi-gray-700 rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Advanced Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-audi-red hover:text-audi-red-light transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-audi-gray-400 mb-3">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={cn(
                          'px-3 py-1.5 text-sm rounded-lg transition-all',
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
                  <label className="block text-sm font-medium text-audi-gray-400 mb-3">
                    Year
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => toggleYear(year)}
                        className={cn(
                          'px-4 py-1.5 text-sm rounded-lg transition-all',
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
                  <label className="block text-sm font-medium text-audi-gray-400 mb-3">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map(status => (
                      <button
                        key={status.id}
                        onClick={() => toggleStatus(status.id)}
                        className={cn(
                          'px-3 py-1.5 text-sm rounded-lg transition-all',
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results or Suggestions */}
      {!hasSearched ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Recent Searches */}
          <div>
            <h2 className="text-sm font-semibold text-audi-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock size={16} />
              Recent Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <motion.button
                  key={search}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  onClick={() => setQuery(search)}
                  className="px-4 py-2 bg-audi-gray-800/50 border border-audi-gray-700 rounded-lg text-sm text-audi-gray-300 hover:bg-audi-gray-800 hover:border-audi-gray-600 hover:text-white transition-all"
                >
                  {search}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Suggested Queries */}
          <div>
            <h2 className="text-sm font-semibold text-audi-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles size={16} />
              Suggested
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestedQueries.map((suggestion, index) => (
                <motion.button
                  key={suggestion.query}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => setQuery(suggestion.query)}
                  className="group p-4 bg-gradient-to-br from-audi-gray-800/80 to-audi-gray-800/40 border border-audi-gray-700 rounded-xl text-left hover:border-audi-red/30 transition-all"
                >
                  <p className="text-sm text-audi-gray-400 mb-1">{suggestion.label.split(':')[0]}:</p>
                  <p className="text-white font-medium group-hover:text-audi-red-light transition-colors flex items-center gap-2">
                    {suggestion.label.split(':')[1]}
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Browse by Category */}
          <div>
            <h2 className="text-sm font-semibold text-audi-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp size={16} />
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat, index) => {
                const categoryStudies = studies.filter(s => s.category === cat.id);
                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.03 }}
                    onClick={() => {
                      setSelectedCategories([cat.id]);
                      setShowFilters(true);
                    }}
                    className="group p-4 bg-audi-gray-800/30 border border-audi-gray-700/50 rounded-xl hover:bg-audi-gray-800/50 hover:border-audi-gray-600 transition-all text-left"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center"
                      style={{ backgroundColor: getCategoryColor(cat.id) + '20' }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getCategoryColor(cat.id) }}
                      />
                    </div>
                    <p className="text-sm font-medium text-white mb-1 group-hover:text-audi-red-light transition-colors">
                      {cat.label}
                    </p>
                    <p className="text-xs text-audi-gray-500">
                      {categoryStudies.length} studies
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-audi-gray-400">
                {filteredStudies.length === 0 ? (
                  'No results found'
                ) : (
                  <>
                    Found <span className="text-white font-medium">{filteredStudies.length}</span> 
                    {' '}result{filteredStudies.length !== 1 ? 's' : ''}
                    {query && (
                      <> for "<span className="text-audi-red">{query}</span>"</>
                    )}
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-audi-gray-800 border border-audi-gray-700 rounded-lg text-sm text-audi-gray-300 focus:outline-none focus:border-audi-gray-600"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
              </select>
              <div className="flex items-center border border-audi-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'grid' ? 'bg-audi-gray-700 text-white' : 'text-audi-gray-400 hover:text-white'
                  )}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'list' ? 'bg-audi-gray-700 text-white' : 'text-audi-gray-400 hover:text-white'
                  )}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid/List */}
          {filteredStudies.length > 0 ? (
            <div className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'space-y-3'
            )}>
              {filteredStudies.map((study, index) => (
                <StudyCard
                  key={study.id}
                  study={study}
                  variant={viewMode === 'list' ? 'compact' : 'default'}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-audi-gray-800/50 flex items-center justify-center mb-6">
                <SearchIcon size={32} className="text-audi-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-audi-gray-400 mb-6 max-w-md">
                We couldn't find any studies matching your search. Try adjusting your filters or using different keywords.
              </p>
              <button
                onClick={clearAllFilters}
                className="btn-audi-secondary"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Search;

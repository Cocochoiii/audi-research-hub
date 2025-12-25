import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { LoadingSpinner } from './components/Icons';

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Library = lazy(() => import('./pages/Library'));
const Search = lazy(() => import('./pages/Search'));
const Trends = lazy(() => import('./pages/Trends'));
const StudyDetail = lazy(() => import('./pages/StudyDetail'));
const Analytics = lazy(() => import('./pages/Analytics'));

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <LoadingSpinner size={40} />
      <p className="text-audi-gray-400 text-sm">Loading...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Search />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/study/:id" element={<StudyDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Layout>
  );
};

export default App;

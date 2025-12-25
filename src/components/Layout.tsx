import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Search,
  FolderOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Menu,
  X,
  Compass,
  BarChart3,
  FileText,
  Bookmark,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../utils';
import { AudiRings } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'library', label: 'Research Library', icon: FolderOpen, path: '/library' },
  { id: 'search', label: 'Search', icon: Search, path: '/search' },
  { id: 'trends', label: 'Trend Radar', icon: Compass, path: '/trends' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
];

const secondaryNavItems = [
  { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, path: '/bookmarks' },
  { id: 'reports', label: 'Reports', icon: FileText, path: '/reports' },
  { id: 'team', label: 'Team', icon: Users, path: '/team' },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-audi-black">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-audi-gray-900/95 backdrop-blur-xl border-b border-audi-gray-800">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-audi-gray-300 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <AudiRings className="w-16 h-6" />
            <span className="text-sm font-medium tracking-wider">AIR</span>
          </div>
          <button className="p-2 text-audi-gray-300 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-audi-red rounded-full" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-audi-gray-900 z-50 overflow-y-auto"
            >
              <div className="p-4 border-b border-audi-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AudiRings className="w-20 h-8" />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-audi-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="p-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'nav-link',
                          location.pathname === item.path && 'nav-link-active'
                        )}
                      >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-40',
          'bg-audi-gray-900/95 backdrop-blur-xl border-r border-audi-gray-800',
          'transition-all duration-300 ease-out',
          sidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-audi-gray-800 px-4">
          <Link to="/" className="flex items-center gap-3">
            <AudiRings className={cn('h-8 transition-all', sidebarCollapsed ? 'w-12' : 'w-20')} />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold tracking-wider">AIR</span>
                    <span className="text-[10px] text-audi-gray-400 tracking-widest uppercase">Research Hub</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-audi-gray-300',
                    'transition-all duration-200',
                    'hover:bg-audi-gray-800 hover:text-white',
                    location.pathname === item.path && 'bg-audi-gray-800 text-white border-l-2 border-audi-red ml-0',
                    sidebarCollapsed && 'justify-center px-0'
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            ))}
          </ul>

          {/* Secondary Navigation */}
          <div className="mt-8 pt-6 border-t border-audi-gray-800">
            {!sidebarCollapsed && (
              <p className="px-4 mb-3 text-xs font-medium text-audi-gray-500 uppercase tracking-wider">
                Quick Access
              </p>
            )}
            <ul className="space-y-1">
              {secondaryNavItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-lg text-audi-gray-400 text-sm',
                      'transition-all duration-200',
                      'hover:bg-audi-gray-800 hover:text-audi-gray-200',
                      sidebarCollapsed && 'justify-center px-0'
                    )}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <item.icon size={18} className="flex-shrink-0" />
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-audi-gray-800">
          <Link
            to="/settings"
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 rounded-lg text-audi-gray-400 text-sm',
              'transition-all duration-200',
              'hover:bg-audi-gray-800 hover:text-audi-gray-200',
              sidebarCollapsed && 'justify-center px-0'
            )}
          >
            <Settings size={18} />
            {!sidebarCollapsed && <span>Settings</span>}
          </Link>
          <Link
            to="/help"
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 rounded-lg text-audi-gray-400 text-sm',
              'transition-all duration-200',
              'hover:bg-audi-gray-800 hover:text-audi-gray-200',
              sidebarCollapsed && 'justify-center px-0'
            )}
          >
            <HelpCircle size={18} />
            {!sidebarCollapsed && <span>Help</span>}
          </Link>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            'absolute -right-3 top-24 w-6 h-6 rounded-full',
            'bg-audi-gray-800 border border-audi-gray-700',
            'flex items-center justify-center',
            'text-audi-gray-400 hover:text-white hover:border-audi-gray-600',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-audi-red'
          )}
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          'pt-16 lg:pt-0',
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        )}
      >
        {/* Top Header */}
        <header className="hidden lg:flex items-center justify-between h-20 px-8 border-b border-audi-gray-800 bg-audi-black/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-audi-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search studies, insights, trends..."
                className="w-80 pl-12 pr-4 py-2.5 bg-audi-gray-800/50 border border-audi-gray-700 rounded-lg text-sm placeholder-audi-gray-500 focus:outline-none focus:border-audi-gray-600 focus:bg-audi-gray-800 transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] text-audi-gray-500 bg-audi-gray-700 rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-audi-gray-400 hover:text-white hover:bg-audi-gray-800 rounded-lg transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-audi-red rounded-full" />
            </button>
            <div className="w-px h-8 bg-audi-gray-700" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-audi-red to-audi-red-dark flex items-center justify-center text-sm font-medium">
                CC
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-medium">Coco Choi</p>
                <p className="text-xs text-audi-gray-400">AIR Research Lead</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

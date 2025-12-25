import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';

// Class name utility
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Date formatting
export function formatDate(date: string | Date, formatStr: string = 'MMM d, yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, formatStr);
}

export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

// File size formatting
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Number formatting
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
}

// Percentage formatting
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Debounce function
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Get category color
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'consumer-insights': '#BB0A30',
    'product-research': '#E01E41',
    'market-trends': '#FF3341',
    'digital-experience': '#8C8C8C',
    'brand-strategy': '#5C5C5C',
    'customer-journey': '#3D3D3D',
    'technology': '#2A2A2A',
    'sustainability': '#4ADE80',
    'competitor-analysis': '#F59E0B',
  };
  return colors[category] || '#5C5C5C';
}

// Get status color
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'completed': '#10b981',
    'in-progress': '#3b82f6',
    'archived': '#6b7280',
    'draft': '#f59e0b',
  };
  return colors[status] || '#6b7280';
}

// Get status classes for badges
export function getStatusClasses(status: string): string {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    'completed': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    'in-progress': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
    'archived': { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' },
    'draft': { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  };
  return Object.values(colors[status] || colors.draft).join(' ');
}

// Get document icon type
export function getDocumentIcon(type: string): string {
  const icons: Record<string, string> = {
    'pdf': 'FileText',
    'pptx': 'Presentation',
    'xlsx': 'Table',
    'docx': 'FileText',
    'video': 'Video',
    'image': 'Image',
  };
  return icons[type] || 'File';
}

// Highlight search terms
export function highlightSearchTerms(text: string, query: string): string {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-audi-red/30 text-white px-0.5 rounded">$1</mark>');
}

// Sort array by key
export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

// Group array by key
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// Storage utilities
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error('Failed to save to localStorage');
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      console.error('Failed to remove from localStorage');
    }
  },
};

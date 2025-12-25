// Research Study Types
export interface ResearchStudy {
  id: string;
  title: string;
  category: StudyCategory;
  subcategory?: string;
  year: number;
  quarter?: string;
  status: StudyStatus;
  description: string;
  summary?: string;
  methodology?: string;
  sampleSize?: number;
  region: string[];
  tags: string[];
  authors: Author[];
  dateCreated: string;
  dateModified: string;
  thumbnail?: string;
  documents: Document[];
  findings?: Finding[];
  metrics?: Metric[];
  relatedStudies?: string[];
  isFeatured?: boolean;
  accessLevel: AccessLevel;
}

export type StudyCategory = 
  | 'consumer-insights'
  | 'product-research'
  | 'market-trends'
  | 'digital-experience'
  | 'brand-strategy'
  | 'customer-journey'
  | 'technology'
  | 'sustainability'
  | 'competitor-analysis';

export type StudyStatus = 
  | 'in-progress'
  | 'completed'
  | 'archived'
  | 'draft';

export type AccessLevel = 
  | 'public'
  | 'internal'
  | 'restricted'
  | 'confidential';

export interface Author {
  id: string;
  name: string;
  department: string;
  avatar?: string;
  email?: string;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  url: string;
  dateUploaded: string;
}

export type DocumentType = 
  | 'pdf'
  | 'pptx'
  | 'xlsx'
  | 'docx'
  | 'video'
  | 'image';

export interface Finding {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
}

export interface Metric {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

// Dashboard Types
export interface DashboardStats {
  totalStudies: number;
  activeProjects: number;
  completedThisYear: number;
  pendingReviews: number;
  totalDocuments: number;
  totalAuthors: number;
}

export interface TrendData {
  month: string;
  studies: number;
  insights: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

// Search & Filter Types
export interface SearchFilters {
  query: string;
  categories: StudyCategory[];
  years: number[];
  status: StudyStatus[];
  regions: string[];
  tags: string[];
  authors: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy: SortOption;
  sortOrder: 'asc' | 'desc';
}

export type SortOption = 
  | 'relevance'
  | 'date'
  | 'title'
  | 'popularity';

export interface SearchResult {
  study: ResearchStudy;
  score: number;
  highlights: string[];
}

// UI State Types
export interface UIState {
  sidebarCollapsed: boolean;
  theme: 'dark' | 'light';
  viewMode: 'grid' | 'list';
  activeModal: string | null;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Trend Radar Types
export type TrendRing = 'adopt' | 'trial' | 'assess' | 'hold';
export type TrendQuadrant = 'consumer-behavior' | 'technology' | 'market-dynamics' | 'experience-design';

export interface TrendItem {
  id: string;
  name: string;
  category: string;
  ring: TrendRing;
  quadrant: TrendQuadrant;
  description: string;
  insight: string;
  sources: string[];
  studies?: string[];
  momentum: 'rising' | 'stable' | 'declining';
  dataPoints?: { label: string; value: string }[];
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
  children?: NavItem[];
}

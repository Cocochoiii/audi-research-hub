import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Users,
  Tag,
  Globe,
  FileText,
  Download,
  Share2,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  BarChart3,
  Lightbulb,
  Target,
  TrendingUp,
  Clock,
  Eye,
  MessageSquare,
  ThumbsUp,
} from 'lucide-react';
import { useStudies } from '../hooks';
import { DocumentIcon } from '../components/Icons';
import { cn, formatRelativeDate, formatFileSize, getStatusColor, getCategoryColor } from '../utils';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Eye },
  { id: 'findings', label: 'Key Findings', icon: Lightbulb },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'metrics', label: 'Metrics', icon: BarChart3 },
];

export const StudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStudyById, studies } = useStudies();
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const study = getStudyById(id || '');

  if (!study) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-audi-gray-800/50 flex items-center justify-center mb-6">
          <FileText size={32} className="text-audi-gray-600" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Study not found</h2>
        <p className="text-audi-gray-400 mb-6">The study you're looking for doesn't exist or has been removed.</p>
        <Link to="/library" className="btn-audi-primary">
          Back to Library
        </Link>
      </div>
    );
  }

  const relatedStudies = studies
    .filter(s => s.id !== study.id && (s.category === study.category || s.tags.some(t => study.tags.includes(t))))
    .slice(0, 3);

  const statusColor = getStatusColor(study.status);
  const categoryColor = getCategoryColor(study.category);

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-audi-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-audi-prominent p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            {/* Status & Category */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span 
                className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider"
                style={{ 
                  backgroundColor: statusColor + '20',
                  color: statusColor 
                }}
              >
                {study.status}
              </span>
              <span 
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{ 
                  backgroundColor: categoryColor + '20',
                  color: categoryColor 
                }}
              >
                {study.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
              {study.isFeatured && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-audi-red/20 text-audi-red">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {study.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-audi-gray-400 mb-6 max-w-3xl">
              {study.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-audi-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{study.year}{study.quarter ? ` ${study.quarter}` : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{study.authors.map(a => a.name).join(', ')}</span>
              </div>
              {study.region && study.region.length > 0 && (
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span>{study.region.join(', ')}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Updated {formatRelativeDate(study.dateModified)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(
                'p-3 rounded-lg transition-all',
                isBookmarked
                  ? 'bg-audi-red text-white'
                  : 'bg-audi-gray-700 text-audi-gray-400 hover:bg-audi-gray-600 hover:text-white'
              )}
            >
              {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
            <button className="p-3 bg-audi-gray-700 text-audi-gray-400 rounded-lg hover:bg-audi-gray-600 hover:text-white transition-all">
              <Share2 size={20} />
            </button>
            <button className="btn-audi-primary">
              <Download size={18} className="mr-2" />
              Export Study
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 pt-6 border-t border-audi-gray-700/50">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={16} className="text-audi-gray-500" />
            {study.tags.map(tag => (
              <Link
                key={tag}
                to={`/search?tag=${tag}`}
                className="px-3 py-1 bg-audi-gray-700/50 text-audi-gray-300 text-sm rounded-lg hover:bg-audi-gray-700 hover:text-white transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 overflow-x-auto pb-2"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              activeTab === tab.id
                ? 'bg-audi-red text-white'
                : 'bg-audi-gray-800/50 text-audi-gray-400 hover:bg-audi-gray-800 hover:text-white'
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2 space-y-6"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Summary */}
                <div className="card-audi p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Executive Summary</h2>
                  <p className="text-audi-gray-300 leading-relaxed">{study.summary}</p>
                </div>

                {/* Methodology */}
                {study.methodology && (
                  <div className="card-audi p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Methodology</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-audi-gray-800/30 rounded-lg">
                        <p className="text-xs text-audi-gray-500 uppercase tracking-wider mb-1">Approach</p>
                        <p className="text-white font-medium">{study.methodology}</p>
                      </div>
                      {study.sampleSize && (
                        <div className="p-4 bg-audi-gray-800/30 rounded-lg">
                          <p className="text-xs text-audi-gray-500 uppercase tracking-wider mb-1">Sample Size</p>
                          <p className="text-white font-medium">{study.sampleSize.toLocaleString()} respondents</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                {study.metrics && study.metrics.length > 0 && (
                  <div className="card-audi p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Key Metrics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {study.metrics.slice(0, 4).map((metric, index) => (
                        <div key={index} className="text-center p-4 bg-audi-gray-800/30 rounded-lg">
                          <p className="text-2xl font-bold text-audi-red">{metric.value}</p>
                          <p className="text-sm text-audi-gray-400">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'findings' && (
              <motion.div
                key="findings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card-audi p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-6">Key Findings</h2>
                {study.findings && study.findings.length > 0 ? (
                  <div className="space-y-4">
                    {study.findings.map((finding, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 p-4 bg-audi-gray-800/30 rounded-lg hover:bg-audi-gray-800/50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-audi-red/20 flex items-center justify-center">
                          <Lightbulb size={16} className="text-audi-red" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-1">{finding.title}</h3>
                          <p className="text-sm text-audi-gray-400">{finding.description}</p>
                          {finding.impact && (
                            <div className="mt-2 flex items-center gap-2">
                              <Target size={12} className="text-audi-gray-500" />
                              <span className="text-xs text-audi-gray-500">Impact: {finding.impact}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-audi-gray-500 text-center py-8">No findings recorded yet.</p>
                )}
              </motion.div>
            )}

            {activeTab === 'documents' && (
              <motion.div
                key="documents"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card-audi p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-6">Documents</h2>
                {study.documents && study.documents.length > 0 ? (
                  <div className="space-y-3">
                    {study.documents.map((doc, index) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-4 bg-audi-gray-800/30 rounded-lg hover:bg-audi-gray-800/50 transition-colors cursor-pointer group"
                      >
                        <DocumentIcon type={doc.type} size={32} />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate group-hover:text-audi-red-light transition-colors">
                            {doc.name}
                          </p>
                          <p className="text-xs text-audi-gray-500">
                            {doc.type.toUpperCase()} • {formatFileSize(doc.size)} • Updated {formatRelativeDate(doc.dateUploaded)}
                          </p>
                        </div>
                        <button className="p-2 text-audi-gray-400 hover:text-white hover:bg-audi-gray-700 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                          <Download size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-audi-gray-500 text-center py-8">No documents attached.</p>
                )}
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card-audi p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-6">Research Metrics</h2>
                {study.metrics && study.metrics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {study.metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-5 bg-audi-gray-800/30 rounded-lg border border-audi-gray-700/50"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
                            <p className="text-sm text-audi-gray-400">{metric.label}</p>
                          </div>
                          {metric.trend && (
                            <div className={cn(
                              'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium',
                              metric.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' : metric.trend === 'down' ? 'bg-rose-500/20 text-rose-400' : 'bg-audi-gray-700 text-audi-gray-400'
                            )}>
                              <TrendingUp size={12} className={metric.trend === 'down' ? 'rotate-180' : ''} />
                              {metric.change !== undefined ? `${Math.abs(metric.change)}%` : metric.trend}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-audi-gray-500 text-center py-8">No metrics available.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <div className="card-audi p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-audi-gray-800/30 rounded-lg text-audi-gray-300 hover:bg-audi-gray-800/50 hover:text-white transition-colors text-left">
                <Download size={18} />
                <span>Download Full Report</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-audi-gray-800/30 rounded-lg text-audi-gray-300 hover:bg-audi-gray-800/50 hover:text-white transition-colors text-left">
                <MessageSquare size={18} />
                <span>Request Presentation</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-audi-gray-800/30 rounded-lg text-audi-gray-300 hover:bg-audi-gray-800/50 hover:text-white transition-colors text-left">
                <Users size={18} />
                <span>Contact Research Team</span>
              </button>
            </div>
          </div>

          {/* Study Stats */}
          <div className="card-audi p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Study Engagement</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-audi-gray-400">
                  <Eye size={16} />
                  <span className="text-sm">Views</span>
                </div>
                <span className="text-white font-medium">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-audi-gray-400">
                  <Download size={16} />
                  <span className="text-sm">Downloads</span>
                </div>
                <span className="text-white font-medium">342</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-audi-gray-400">
                  <ThumbsUp size={16} />
                  <span className="text-sm">Recommendations</span>
                </div>
                <span className="text-white font-medium">89</span>
              </div>
            </div>
          </div>

          {/* Related Studies */}
          {relatedStudies.length > 0 && (
            <div className="card-audi p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Related Studies</h3>
                <Link
                  to={`/library?category=${study.category}`}
                  className="text-xs text-audi-red hover:text-audi-red-light flex items-center gap-1 transition-colors"
                >
                  View all <ChevronRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {relatedStudies.map((related) => (
                  <Link
                    key={related.id}
                    to={`/study/${related.id}`}
                    className="block p-3 bg-audi-gray-800/30 rounded-lg hover:bg-audi-gray-800/50 transition-colors group"
                  >
                    <p className="text-sm font-medium text-white group-hover:text-audi-red-light transition-colors line-clamp-2 mb-1">
                      {related.title}
                    </p>
                    <p className="text-xs text-audi-gray-500">
                      {related.year} • {related.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.aside>
      </div>
    </div>
  );
};

export default StudyDetail;

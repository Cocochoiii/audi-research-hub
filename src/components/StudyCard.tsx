import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, FileText, ArrowRight, Star, Tag } from 'lucide-react';
import { ResearchStudy } from '../types';
import { cn, formatDate, getStatusColor } from '../utils';
import { categoryLabels, statusLabels } from '../data/mockData';

interface StudyCardProps {
  study: ResearchStudy;
  variant?: 'default' | 'compact' | 'featured';
  index?: number;
}

export const StudyCard: React.FC<StudyCardProps> = ({ study, variant = 'default', index = 0 }) => {
  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      'consumer-insights': 'from-rose-500/20 to-transparent',
      'product-research': 'from-amber-500/20 to-transparent',
      'market-trends': 'from-blue-500/20 to-transparent',
      'digital-experience': 'from-purple-500/20 to-transparent',
      'brand-strategy': 'from-emerald-500/20 to-transparent',
      'customer-journey': 'from-cyan-500/20 to-transparent',
      'technology': 'from-indigo-500/20 to-transparent',
    };
    return gradients[category] || 'from-gray-500/20 to-transparent';
  };

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Link
          to={`/study/${study.id}`}
          className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-audi-gray-800/80 to-audi-gray-900/90 border border-audi-gray-700/50 hover:border-audi-red/50 transition-all duration-500"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-audi-red/10 via-transparent to-transparent" />
          </div>

          {/* Category Gradient */}
          <div className={cn('absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l opacity-50', getCategoryGradient(study.category))} />

          <div className="relative p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className={cn('badge-audi', getStatusColor(study.status))}>
                  {statusLabels[study.status]}
                </span>
                {study.isFeatured && (
                  <span className="flex items-center gap-1 text-xs text-amber-400">
                    <Star size={12} fill="currentColor" />
                    Featured
                  </span>
                )}
              </div>
              <span className="text-sm text-audi-gray-400">{study.year}</span>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-audi-red-light transition-colors">
              {study.title}
            </h3>

            <p className="text-audi-gray-300 mb-6 line-clamp-2">
              {study.description}
            </p>

            {study.findings && study.findings.length > 0 && (
              <div className="mb-6 p-4 bg-audi-gray-900/50 rounded-lg border border-audi-gray-700/30">
                <p className="text-xs text-audi-gray-400 uppercase tracking-wider mb-2">Key Finding</p>
                <p className="text-sm text-white">{study.findings[0].title}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-audi-gray-700/50">
              <div className="flex items-center gap-4 text-sm text-audi-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(study.dateModified)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} />
                  {study.authors.length} authors
                </span>
                {study.documents.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <FileText size={14} />
                    {study.documents.length} docs
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1 text-audi-red group-hover:gap-2 transition-all">
                View <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link
          to={`/study/${study.id}`}
          className="group flex items-center gap-4 p-4 rounded-lg bg-audi-gray-800/30 border border-transparent hover:border-audi-gray-700 hover:bg-audi-gray-800/50 transition-all"
        >
          <div className="flex-shrink-0 w-1 h-12 rounded-full bg-gradient-to-b from-audi-red to-audi-red-dark" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white truncate group-hover:text-audi-red-light transition-colors">
              {study.title}
            </h4>
            <p className="text-xs text-audi-gray-400 mt-0.5">
              {categoryLabels[study.category]} • {study.year}
            </p>
          </div>
          <ArrowRight size={16} className="text-audi-gray-500 group-hover:text-audi-red group-hover:translate-x-1 transition-all" />
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link
        to={`/study/${study.id}`}
        className="group block h-full relative overflow-hidden rounded-xl bg-gradient-to-br from-audi-gray-800/60 to-audi-gray-900/80 border border-audi-gray-700/40 hover:border-audi-gray-600 transition-all duration-300"
      >
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-audi-red via-audi-red-light to-audi-red opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <span className={cn('badge-audi text-[10px]', getStatusColor(study.status))}>
              {statusLabels[study.status]}
            </span>
            <span className="text-xs text-audi-gray-500">{study.year}</span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-audi-red-light transition-colors line-clamp-2">
            {study.title}
          </h3>

          <p className="text-sm text-audi-gray-400 mb-4 line-clamp-2">
            {study.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {study.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag text-[10px]">
                {tag}
              </span>
            ))}
            {study.tags.length > 3 && (
              <span className="tag text-[10px]">+{study.tags.length - 3}</span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-audi-gray-700/30">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {study.authors.slice(0, 2).map((author, i) => (
                  <div
                    key={author.id}
                    className="w-6 h-6 rounded-full bg-audi-gray-600 border-2 border-audi-gray-800 flex items-center justify-center text-[10px] font-medium"
                    title={author.name}
                  >
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
              </div>
              <span className="text-xs text-audi-gray-500">
                {formatDate(study.dateModified, 'MMM d')}
              </span>
            </div>
            <ArrowRight 
              size={16} 
              className="text-audi-gray-500 group-hover:text-audi-red group-hover:translate-x-1 transition-all" 
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StudyCard;

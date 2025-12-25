import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radar,
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  ChevronRight,
  Filter,
  Zap,
  Target,
  Eye,
  Pause,
  ExternalLink,
} from 'lucide-react';
import { trendItems } from '../data/mockData';
import { TrendItem, TrendRing, TrendQuadrant } from '../types';
import { cn } from '../utils';

const ringConfig: Record<TrendRing, { label: string; color: string; radius: number; description: string }> = {
  adopt: { 
    label: 'ADOPT', 
    color: '#10b981', 
    radius: 25,
    description: 'Technologies with strong market fit that should be adopted now'
  },
  trial: { 
    label: 'TRIAL', 
    color: '#3b82f6', 
    radius: 45,
    description: 'Technologies worth exploring in controlled pilots'
  },
  assess: { 
    label: 'ASSESS', 
    color: '#f59e0b', 
    radius: 65,
    description: 'Technologies to watch and evaluate for future potential'
  },
  hold: { 
    label: 'HOLD', 
    color: '#6b7280', 
    radius: 85,
    description: 'Technologies to avoid or phase out for various reasons'
  },
};

const quadrantConfig: Record<TrendQuadrant, { label: string; angle: number; color: string }> = {
  'consumer-behavior': { label: 'Consumer Behavior', angle: 45, color: '#BB0A30' },
  'technology': { label: 'Technology', angle: 135, color: '#3b82f6' },
  'market-dynamics': { label: 'Market Dynamics', angle: 225, color: '#10b981' },
  'experience-design': { label: 'Experience Design', angle: 315, color: '#f59e0b' },
};

const momentumIcons = {
  rising: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
};

const TrendRadarViz: React.FC<{
  items: TrendItem[];
  selectedRing: TrendRing | null;
  selectedQuadrant: TrendQuadrant | null;
  onSelectItem: (item: TrendItem) => void;
  selectedItem: TrendItem | null;
}> = ({ items, selectedRing, selectedQuadrant, onSelectItem, selectedItem }) => {
  const size = 500;
  const center = size / 2;

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (selectedRing && item.ring !== selectedRing) return false;
      if (selectedQuadrant && item.quadrant !== selectedQuadrant) return false;
      return true;
    });
  }, [items, selectedRing, selectedQuadrant]);

  // Calculate positions for items
  const positionedItems = useMemo(() => {
    return filteredItems.map((item, index) => {
      const ringRadius = ringConfig[item.ring].radius * (size / 200);
      const quadrant = quadrantConfig[item.quadrant];
      
      // Add some randomness within the quadrant
      const baseAngle = (quadrant.angle - 45 + (Math.random() * 60 + 15)) * (Math.PI / 180);
      const radiusVariation = ringRadius + (Math.random() - 0.5) * 20;
      
      return {
        ...item,
        x: center + radiusVariation * Math.cos(baseAngle),
        y: center + radiusVariation * Math.sin(baseAngle),
      };
    });
  }, [filteredItems]);

  return (
    <div className="relative">
      <svg width={size} height={size} className="mx-auto">
        {/* Background rings */}
        {Object.entries(ringConfig).reverse().map(([key, config]) => (
          <g key={key}>
            <circle
              cx={center}
              cy={center}
              r={config.radius * (size / 200)}
              fill="none"
              stroke={config.color}
              strokeWidth="1"
              strokeOpacity={selectedRing === key || !selectedRing ? 0.3 : 0.1}
              className="transition-opacity duration-300"
            />
            <circle
              cx={center}
              cy={center}
              r={config.radius * (size / 200)}
              fill={config.color}
              fillOpacity={selectedRing === key ? 0.05 : 0.02}
              className="transition-all duration-300"
            />
          </g>
        ))}

        {/* Quadrant lines */}
        {Object.entries(quadrantConfig).map(([key, config]) => {
          const angle = (config.angle) * (Math.PI / 180);
          const lineLength = 85 * (size / 200);
          return (
            <line
              key={key}
              x1={center}
              y1={center}
              x2={center + lineLength * Math.cos(angle)}
              y2={center + lineLength * Math.sin(angle)}
              stroke={config.color}
              strokeWidth="1"
              strokeOpacity={selectedQuadrant === key || !selectedQuadrant ? 0.5 : 0.2}
              strokeDasharray="4 4"
              className="transition-opacity duration-300"
            />
          );
        })}

        {/* Center dot */}
        <circle cx={center} cy={center} r="4" fill="#BB0A30" />

        {/* Trend items */}
        {positionedItems.map((item, index) => {
          const isSelected = selectedItem?.id === item.id;
          const ringColor = ringConfig[item.ring].color;
          
          return (
            <motion.g
              key={item.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className="cursor-pointer"
              onClick={() => onSelectItem(item)}
            >
              <circle
                cx={item.x}
                cy={item.y}
                r={isSelected ? 10 : 7}
                fill={ringColor}
                fillOpacity={isSelected ? 1 : 0.8}
                stroke={isSelected ? '#fff' : 'transparent'}
                strokeWidth="2"
                className="transition-all duration-200 hover:fill-opacity-100"
              />
              {item.momentum === 'rising' && (
                <polygon
                  points={`${item.x},${item.y - 14} ${item.x - 4},${item.y - 8} ${item.x + 4},${item.y - 8}`}
                  fill="#10b981"
                />
              )}
            </motion.g>
          );
        })}
      </svg>

      {/* Quadrant labels */}
      <div className="absolute top-4 left-4 text-xs font-medium text-audi-gray-400 flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-[#BB0A30]" />
        Consumer Behavior
      </div>
      <div className="absolute top-4 right-4 text-xs font-medium text-audi-gray-400 flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
        Technology
      </div>
      <div className="absolute bottom-4 left-4 text-xs font-medium text-audi-gray-400 flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-[#10b981]" />
        Market Dynamics
      </div>
      <div className="absolute bottom-4 right-4 text-xs font-medium text-audi-gray-400 flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
        Experience Design
      </div>

      {/* Ring legend */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 flex items-center gap-6">
        {Object.entries(ringConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div 
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            <span className="text-xs text-audi-gray-500">{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Trends: React.FC = () => {
  const [selectedRing, setSelectedRing] = useState<TrendRing | null>(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState<TrendQuadrant | null>(null);
  const [selectedItem, setSelectedItem] = useState<TrendItem | null>(null);
  const [viewMode, setViewMode] = useState<'radar' | 'list'>('radar');

  const handleSelectItem = (item: TrendItem) => {
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  const filteredItems = useMemo(() => {
    return trendItems.filter(item => {
      if (selectedRing && item.ring !== selectedRing) return false;
      if (selectedQuadrant && item.quadrant !== selectedQuadrant) return false;
      return true;
    });
  }, [selectedRing, selectedQuadrant]);

  const clearFilters = () => {
    setSelectedRing(null);
    setSelectedQuadrant(null);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-audi-red/20 rounded-lg">
              <Radar size={24} className="text-audi-red" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              AIR Trend Radar
            </h1>
          </div>
          <p className="text-audi-gray-400">
            Strategic overview of emerging trends shaping China's premium automotive market
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'radar' ? 'list' : 'radar')}
            className="btn-audi-secondary"
          >
            {viewMode === 'radar' ? 'List View' : 'Radar View'}
          </button>
          <select className="px-4 py-2 bg-audi-gray-800 border border-audi-gray-700 rounded-lg text-white focus:outline-none focus:border-audi-gray-600">
            <option>Q4 2023</option>
            <option>Q3 2023</option>
            <option>Q2 2023</option>
          </select>
        </div>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-4 p-4 bg-audi-gray-800/30 border border-audi-gray-700/50 rounded-xl"
      >
        <div className="flex items-center gap-2 text-sm text-audi-gray-400">
          <Filter size={16} />
          <span>Filter by:</span>
        </div>
        
        {/* Ring filters */}
        <div className="flex items-center gap-2">
          {Object.entries(ringConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedRing(selectedRing === key ? null : key as TrendRing)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-all flex items-center gap-2',
                selectedRing === key
                  ? 'text-white'
                  : 'text-audi-gray-400 hover:text-white hover:bg-audi-gray-700/50'
              )}
              style={{
                backgroundColor: selectedRing === key ? config.color : undefined,
              }}
            >
              {key === 'adopt' && <Zap size={14} />}
              {key === 'trial' && <Target size={14} />}
              {key === 'assess' && <Eye size={14} />}
              {key === 'hold' && <Pause size={14} />}
              {config.label}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-audi-gray-700" />

        {/* Quadrant filters */}
        <div className="flex items-center gap-2">
          {Object.entries(quadrantConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedQuadrant(selectedQuadrant === key ? null : key as TrendQuadrant)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-all',
                selectedQuadrant === key
                  ? 'text-white'
                  : 'text-audi-gray-400 hover:text-white hover:bg-audi-gray-700/50'
              )}
              style={{
                backgroundColor: selectedQuadrant === key ? config.color : undefined,
              }}
            >
              {config.label}
            </button>
          ))}
        </div>

        {(selectedRing || selectedQuadrant) && (
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-audi-red hover:text-audi-red-light transition-colors"
          >
            Clear filters
          </button>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Radar / List View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={cn(
            'card-audi p-6',
            viewMode === 'radar' ? 'xl:col-span-2' : 'xl:col-span-3'
          )}
        >
          {viewMode === 'radar' ? (
            <TrendRadarViz
              items={trendItems}
              selectedRing={selectedRing}
              selectedQuadrant={selectedQuadrant}
              onSelectItem={handleSelectItem}
              selectedItem={selectedItem}
            />
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(ringConfig).map(([ringKey, ringData]) => {
                  const ringItems = filteredItems.filter(i => i.ring === ringKey);
                  return (
                    <div key={ringKey}>
                      <div 
                        className="flex items-center gap-2 mb-3 pb-2 border-b"
                        style={{ borderColor: ringData.color + '40' }}
                      >
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: ringData.color }}
                        />
                        <h3 className="font-semibold text-white">{ringData.label}</h3>
                        <span className="text-xs text-audi-gray-500">({ringItems.length})</span>
                      </div>
                      <div className="space-y-2">
                        {ringItems.map(item => {
                          const MomentumIcon = momentumIcons[item.momentum];
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelectItem(item)}
                              className={cn(
                                'w-full p-3 rounded-lg text-left transition-all',
                                selectedItem?.id === item.id
                                  ? 'bg-audi-gray-700 ring-1 ring-audi-red/50'
                                  : 'bg-audi-gray-800/30 hover:bg-audi-gray-800/50'
                              )}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-medium text-white">{item.name}</p>
                                <MomentumIcon 
                                  size={14} 
                                  className={cn(
                                    item.momentum === 'rising' && 'text-emerald-500',
                                    item.momentum === 'stable' && 'text-gray-400',
                                    item.momentum === 'declining' && 'text-rose-500',
                                  )}
                                />
                              </div>
                              <p className="text-xs text-audi-gray-500 mt-1">{item.category}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Detail Panel */}
        {viewMode === 'radar' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Selected Item Detail */}
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card-audi p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="px-2 py-0.5 text-xs font-medium rounded"
                          style={{ 
                            backgroundColor: ringConfig[selectedItem.ring].color + '20',
                            color: ringConfig[selectedItem.ring].color 
                          }}
                        >
                          {ringConfig[selectedItem.ring].label}
                        </div>
                        <div 
                          className="px-2 py-0.5 text-xs rounded"
                          style={{ 
                            backgroundColor: quadrantConfig[selectedItem.quadrant].color + '20',
                            color: quadrantConfig[selectedItem.quadrant].color 
                          }}
                        >
                          {quadrantConfig[selectedItem.quadrant].label}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white">{selectedItem.name}</h3>
                    </div>
                    <div className={cn(
                      'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium',
                      selectedItem.momentum === 'rising' && 'bg-emerald-500/20 text-emerald-400',
                      selectedItem.momentum === 'stable' && 'bg-gray-500/20 text-gray-400',
                      selectedItem.momentum === 'declining' && 'bg-rose-500/20 text-rose-400',
                    )}>
                      {React.createElement(momentumIcons[selectedItem.momentum], { size: 12 })}
                      {selectedItem.momentum.charAt(0).toUpperCase() + selectedItem.momentum.slice(1)}
                    </div>
                  </div>

                  <p className="text-audi-gray-400 text-sm mb-4">{selectedItem.description}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-audi-gray-500 uppercase tracking-wider mb-2">
                        Key Insight
                      </h4>
                      <p className="text-sm text-audi-gray-300">{selectedItem.insight}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-medium text-audi-gray-500 uppercase tracking-wider mb-2">
                        Source Studies
                      </h4>
                      <div className="space-y-2">
                        {selectedItem.sources.map((source, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between p-2 bg-audi-gray-800/30 rounded-lg group cursor-pointer hover:bg-audi-gray-800/50 transition-colors"
                          >
                            <span className="text-sm text-audi-gray-300">{source}</span>
                            <ExternalLink size={14} className="text-audi-gray-500 group-hover:text-audi-red transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedItem.dataPoints && (
                      <div>
                        <h4 className="text-xs font-medium text-audi-gray-500 uppercase tracking-wider mb-2">
                          Key Data Points
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedItem.dataPoints.map((dp, idx) => (
                            <div key={idx} className="p-3 bg-audi-gray-800/30 rounded-lg">
                              <p className="text-lg font-bold text-white">{dp.value}</p>
                              <p className="text-xs text-audi-gray-500">{dp.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card-audi p-6 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-audi-gray-800/50 flex items-center justify-center">
                    <Info size={24} className="text-audi-gray-500" />
                  </div>
                  <p className="text-audi-gray-400 text-sm">
                    Click on a trend item in the radar to view details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ring Descriptions */}
            <div className="card-audi p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Ring Guide</h3>
              <div className="space-y-3">
                {Object.entries(ringConfig).map(([key, config]) => (
                  <div 
                    key={key}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer',
                      selectedRing === key ? 'bg-audi-gray-700' : 'hover:bg-audi-gray-800/30'
                    )}
                    onClick={() => setSelectedRing(selectedRing === key ? null : key as TrendRing)}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: config.color }}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{config.label}</p>
                      <p className="text-xs text-audi-gray-500">{config.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="card-audi p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Trend Overview</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-500">
                    {trendItems.filter(t => t.momentum === 'rising').length}
                  </p>
                  <p className="text-xs text-audi-gray-500">Rising</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-400">
                    {trendItems.filter(t => t.momentum === 'stable').length}
                  </p>
                  <p className="text-xs text-audi-gray-500">Stable</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-rose-500">
                    {trendItems.filter(t => t.momentum === 'declining').length}
                  </p>
                  <p className="text-xs text-audi-gray-500">Declining</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Trends;

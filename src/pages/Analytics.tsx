import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useStudies } from '../hooks';
import { cn } from '../utils';

// Mock analytics data
const monthlyActivity = [
  { month: 'Jan', studies: 4, downloads: 120, views: 890 },
  { month: 'Feb', studies: 3, downloads: 98, views: 720 },
  { month: 'Mar', studies: 5, downloads: 156, views: 1100 },
  { month: 'Apr', studies: 2, downloads: 87, views: 560 },
  { month: 'May', studies: 6, downloads: 203, views: 1450 },
  { month: 'Jun', studies: 4, downloads: 145, views: 980 },
  { month: 'Jul', studies: 3, downloads: 112, views: 870 },
  { month: 'Aug', studies: 5, downloads: 178, views: 1200 },
  { month: 'Sep', studies: 7, downloads: 234, views: 1680 },
  { month: 'Oct', studies: 4, downloads: 167, views: 1120 },
  { month: 'Nov', studies: 6, downloads: 189, views: 1340 },
  { month: 'Dec', studies: 3, downloads: 145, views: 920 },
];

const categoryDistribution = [
  { name: 'Consumer Insights', value: 35, color: '#BB0A30' },
  { name: 'Product Research', value: 25, color: '#3b82f6' },
  { name: 'Market Trends', value: 18, color: '#10b981' },
  { name: 'Digital Experience', value: 12, color: '#f59e0b' },
  { name: 'Brand Strategy', value: 6, color: '#8b5cf6' },
  { name: 'Technology', value: 4, color: '#ec4899' },
];

const topStudies = [
  { title: 'AIR Trend Radar 2023', views: 2450, downloads: 456, trend: 12 },
  { title: 'Audi Premium NEV Study 3.0', views: 1890, downloads: 378, trend: 8 },
  { title: 'China Premium Digital Lifestyle', views: 1650, downloads: 312, trend: -3 },
  { title: 'Chinese Female Elite Customer', views: 1420, downloads: 287, trend: 15 },
  { title: 'Gen Z Lifestyle Study', views: 1280, downloads: 245, trend: 22 },
];

const regionData = [
  { region: 'Beijing', studies: 18, percentage: 28 },
  { region: 'Shanghai', studies: 15, percentage: 23 },
  { region: 'Guangzhou', studies: 12, percentage: 19 },
  { region: 'Shenzhen', studies: 8, percentage: 12 },
  { region: 'Chengdu', studies: 6, percentage: 9 },
  { region: 'Other', studies: 6, percentage: 9 },
];

const authorStats = [
  { name: 'Dr. Li Wei', studies: 12, citations: 156 },
  { name: 'Wang Jun', studies: 10, citations: 134 },
  { name: 'Sarah Chen', studies: 9, citations: 112 },
  { name: 'Zhang Mei', studies: 8, citations: 98 },
  { name: 'Liu Yang', studies: 7, citations: 87 },
];

export const Analytics: React.FC = () => {
  const { studies } = useStudies();
  const [timeRange, setTimeRange] = useState('year');

  const stats = [
    {
      label: 'Total Studies',
      value: studies.length,
      change: 18,
      trend: 'up',
      icon: FileText,
      color: 'from-audi-red/20',
    },
    {
      label: 'Total Downloads',
      value: '2.4K',
      change: 24,
      trend: 'up',
      icon: Download,
      color: 'from-blue-500/20',
    },
    {
      label: 'Active Researchers',
      value: 6,
      change: 2,
      trend: 'up',
      icon: Users,
      color: 'from-emerald-500/20',
    },
    {
      label: 'Avg. Engagement',
      value: '87%',
      change: 5,
      trend: 'up',
      icon: TrendingUp,
      color: 'from-amber-500/20',
    },
  ];

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
              <BarChart3 size={24} className="text-audi-red" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Analytics</h1>
          </div>
          <p className="text-audi-gray-400">
            Research portfolio performance and engagement metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-audi-gray-800 border border-audi-gray-700 rounded-lg text-white focus:outline-none focus:border-audi-gray-600"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn-audi-secondary">
            <Download size={18} className="mr-2" />
            Export Report
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card group"
          >
            <div className={cn('absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l', stat.color, 'to-transparent')} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-audi-gray-700/50 group-hover:bg-audi-gray-700 transition-colors">
                  <stat.icon size={20} className="text-audi-gray-300" />
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
                )}>
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}%
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-audi-gray-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Activity Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 card-audi p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Research Activity</h2>
              <p className="text-sm text-audi-gray-400">Studies, downloads, and views over time</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-audi-red" />
                <span className="text-xs text-audi-gray-400">Studies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-audi-gray-400">Downloads</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyActivity}>
                <defs>
                  <linearGradient id="colorStudies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#BB0A30" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#BB0A30" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="month" stroke="#5C5C5C" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#5C5C5C" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    borderRadius: '8px',
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#8C8C8C' }}
                />
                <Area
                  type="monotone"
                  dataKey="downloads"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorDownloads)"
                />
                <Area
                  type="monotone"
                  dataKey="studies"
                  stroke="#BB0A30"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorStudies)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-audi p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-2">Category Distribution</h2>
          <p className="text-sm text-audi-gray-400 mb-4">Studies by research category</p>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    borderRadius: '8px',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {categoryDistribution.slice(0, 4).map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm text-audi-gray-300 truncate">{cat.name}</span>
                </div>
                <span className="text-sm text-audi-gray-500">{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Studies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-audi p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-2">Top Performing Studies</h2>
          <p className="text-sm text-audi-gray-400 mb-6">Most viewed and downloaded studies</p>
          <div className="space-y-4">
            {topStudies.map((study, index) => (
              <div key={study.title} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-audi-gray-700/50 flex items-center justify-center text-sm font-bold text-audi-gray-400">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{study.title}</p>
                  <p className="text-xs text-audi-gray-500">
                    {study.views.toLocaleString()} views • {study.downloads} downloads
                  </p>
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  study.trend > 0 ? 'text-emerald-400' : 'text-rose-400'
                )}>
                  {study.trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(study.trend)}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Regional Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-audi p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-2">Regional Coverage</h2>
          <p className="text-sm text-audi-gray-400 mb-6">Studies by research region</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis type="number" stroke="#5C5C5C" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  type="category" 
                  dataKey="region" 
                  stroke="#5C5C5C" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    borderRadius: '8px',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="studies" fill="#BB0A30" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Research Team Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card-audi p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-2">Research Team Performance</h2>
        <p className="text-sm text-audi-gray-400 mb-6">Author contributions and impact</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-audi-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-audi-gray-400">Researcher</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-audi-gray-400">Studies</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-audi-gray-400">Citations</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-audi-gray-400">Impact</th>
              </tr>
            </thead>
            <tbody>
              {authorStats.map((author) => (
                <tr key={author.name} className="border-b border-audi-gray-800 hover:bg-audi-gray-800/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-audi-red to-audi-red-dark flex items-center justify-center text-white text-xs font-bold">
                        {author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-white font-medium">{author.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-audi-gray-300">{author.studies}</td>
                  <td className="py-4 px-4 text-center text-sm text-audi-gray-300">{author.citations}</td>
                  <td className="py-4 px-4">
                    <div className="w-full bg-audi-gray-700 rounded-full h-2 max-w-32">
                      <div 
                        className="bg-audi-red h-2 rounded-full transition-all"
                        style={{ width: `${(author.citations / 156) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;

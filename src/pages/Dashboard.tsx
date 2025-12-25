import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  FolderOpen,
  FileText,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Zap,
  Target,
  Compass,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useStudies } from '../hooks';
import { StudyCard } from '../components/StudyCard';
import { dashboardStats, trendData, categoryDistribution, trendItems } from '../data/mockData';
import { cn } from '../utils';

const statCards = [
  {
    id: 'total',
    label: 'Total Studies',
    value: dashboardStats.totalStudies,
    icon: FolderOpen,
    change: 12,
    trend: 'up',
    color: 'from-audi-red/20 to-transparent',
  },
  {
    id: 'active',
    label: 'Active Projects',
    value: dashboardStats.activeProjects,
    icon: Zap,
    change: 2,
    trend: 'up',
    color: 'from-blue-500/20 to-transparent',
  },
  {
    id: 'completed',
    label: 'Completed 2023',
    value: dashboardStats.completedThisYear,
    icon: Target,
    change: 8,
    trend: 'up',
    color: 'from-emerald-500/20 to-transparent',
  },
  {
    id: 'documents',
    label: 'Documents',
    value: dashboardStats.totalDocuments,
    icon: FileText,
    change: 24,
    trend: 'up',
    color: 'from-amber-500/20 to-transparent',
  },
];

export const Dashboard: React.FC = () => {
  const { featuredStudies, recentStudies } = useStudies();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4"
      >
        <div>
          <p className="text-audi-gray-500 text-sm mb-1">{currentDate}</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            AIR Research Hub
          </h1>
          <p className="text-audi-gray-400">
            Welcome back, Coco. Here's your research portfolio overview.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/library"
            className="btn-audi-secondary"
          >
            View All Studies
          </Link>
          <Link
            to="/trends"
            className="btn-audi-primary"
          >
            <Compass size={18} className="mr-2" />
            Trend Radar
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card group"
          >
            <div className={cn('absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l', stat.color)} />
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
              <p className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-audi-gray-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card-audi p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Research Activity</h2>
              <p className="text-sm text-audi-gray-400">Studies and insights generated over time</p>
            </div>
            <select className="px-3 py-1.5 bg-audi-gray-700 border border-audi-gray-600 rounded-lg text-sm text-audi-gray-300 focus:outline-none focus:border-audi-gray-500">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorStudies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#BB0A30" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#BB0A30" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInsights" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5C5C5C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5C5C5C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis 
                  dataKey="month" 
                  stroke="#5C5C5C" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#5C5C5C" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#8C8C8C' }}
                />
                <Area
                  type="monotone"
                  dataKey="studies"
                  stroke="#BB0A30"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorStudies)"
                />
                <Area
                  type="monotone"
                  dataKey="insights"
                  stroke="#5C5C5C"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorInsights)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-audi-gray-700/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-audi-red" />
              <span className="text-sm text-audi-gray-400">Studies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-audi-gray-500" />
              <span className="text-sm text-audi-gray-400">Insights</span>
            </div>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-audi p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-2">By Category</h2>
          <p className="text-sm text-audi-gray-400 mb-6">Distribution of research studies</p>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="count"
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
              <div key={cat.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm text-audi-gray-300">{cat.category}</span>
                </div>
                <span className="text-sm text-audi-gray-500">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured Studies */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Featured Studies</h2>
            <p className="text-sm text-audi-gray-400">Highlighted research with key insights</p>
          </div>
          <Link
            to="/library?filter=featured"
            className="text-sm text-audi-red hover:text-audi-red-light flex items-center gap-1 transition-colors"
          >
            View all featured <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredStudies.slice(0, 2).map((study, index) => (
            <StudyCard key={study.id} study={study} variant="featured" index={index} />
          ))}
        </div>
      </motion.section>

      {/* Recent & Trends Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Studies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 card-audi p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-audi-gray-400" />
              <h2 className="text-lg font-semibold text-white">Recent Updates</h2>
            </div>
            <Link
              to="/library?sort=date"
              className="text-sm text-audi-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-2">
            {recentStudies.slice(0, 5).map((study, index) => (
              <StudyCard key={study.id} study={study} variant="compact" index={index} />
            ))}
          </div>
        </motion.div>

        {/* Trend Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-audi p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-audi-red" />
              <h2 className="text-lg font-semibold text-white">Rising Trends</h2>
            </div>
            <Link
              to="/trends"
              className="text-sm text-audi-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              Radar <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {trendItems
              .filter(t => t.momentum === 'rising')
              .slice(0, 5)
              .map((trend, index) => (
                <motion.div
                  key={trend.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-audi-gray-800/30 hover:bg-audi-gray-800/50 transition-colors cursor-pointer group"
                >
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    trend.ring === 'adopt' && 'bg-emerald-500',
                    trend.ring === 'trial' && 'bg-blue-500',
                    trend.ring === 'assess' && 'bg-amber-500',
                    trend.ring === 'hold' && 'bg-gray-500',
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-audi-red-light transition-colors truncate">
                      {trend.name}
                    </p>
                    <p className="text-xs text-audi-gray-500">{trend.category}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-emerald-500" />
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

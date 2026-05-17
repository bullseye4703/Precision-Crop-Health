import { motion } from 'framer-motion';
import { Target, Zap, Layers, History, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Mon', accuracy: 98.2 },
  { name: 'Tue', accuracy: 99.1 },
  { name: 'Wed', accuracy: 98.5 },
  { name: 'Thu', accuracy: 98.6 },
  { name: 'Fri', accuracy: 99.4 },
  { name: 'Sat', accuracy: 99.5 },
  { name: 'Sun', accuracy: 99.2 },
];

const recentScans = [
  { id: 1, name: 'Tomato Leaf', status: 'Healthy', time: '10 min ago', color: 'text-primary', bg: 'bg-primary/10' },
  { id: 2, name: 'Potato Leaf', status: 'Early Blight', time: '1 hour ago', color: 'text-danger', bg: 'bg-danger/10' },
  { id: 3, name: 'Pepper Leaf', status: 'Bacterial Spot', time: '3 hours ago', color: 'text-warning', bg: 'bg-warning/10' },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Accuracy Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-6 border-l-4 border-l-accent relative overflow-hidden"
      >
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-textMuted text-sm font-medium mb-1">AI Model Accuracy</p>
            <h3 className="text-3xl font-bold text-textMain">99.2%</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <Target className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="h-20 w-full mt-4 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="accuracy" stroke="#16a34a" fillOpacity={1} fill="url(#colorAccuracy)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Speed Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-6 border-l-4 border-l-warning relative overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-warning/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-textMuted text-sm font-medium mb-1">Inference Speed</p>
            <h3 className="text-3xl font-bold text-textMain">&lt; 100ms</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <Zap className="w-5 h-5 text-warning" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-textMuted bg-white/5 p-3 rounded-lg border border-white/10">
          <TrendingUp className="w-4 h-4 text-warning" />
          <span>Realtime Detection Active</span>
        </div>
      </motion.div>

      {/* Recent History */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-6 border-l-4 border-l-primary relative overflow-hidden"
      >
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-textMuted text-sm font-medium mb-1">Recent Scans</p>
            <h3 className="text-xl font-bold text-textMain flex items-center gap-2">
              <History className="w-5 h-5" /> Activity
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <Layers className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <div className="space-y-3 mt-2">
          {recentScans.map(scan => (
            <div key={scan.id} className="flex justify-between items-center text-sm">
              <span className="text-textMain/80 font-medium">{scan.name}</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${scan.bg} ${scan.color}`}>
                  {scan.status}
                </span>
                <span className="text-textMuted text-xs w-16 text-right">{scan.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

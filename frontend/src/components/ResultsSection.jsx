import { motion } from 'framer-motion';
import { Activity, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

export default function ResultsSection({ result, previewUrl }) {
  const { disease, confidence } = result;
  
  // Format disease name to be more readable
  const formattedDisease = disease.replace(/_/g, ' ').replace('___', ' - ');
  const isHealthy = disease.toLowerCase().includes('healthy');
  
  const confidencePercent = (confidence).toFixed(1);
  const now = new Date();

  return (
    <div className="glass-card overflow-hidden flex flex-col md:flex-row h-full">
      {/* Image Side */}
      <div className="w-full md:w-2/5 relative min-h-[300px]">
        <img src={previewUrl} alt="Analyzed Plant" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        
        {/* Overlay Badges */}
        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>Analyzed at {now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border backdrop-blur-md
            ${isHealthy ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-danger/20 border-danger/30 text-danger'}`}
          >
            {isHealthy ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {isHealthy ? 'Healthy Plant Detected' : 'Disease Detected'}
          </div>
        </div>

        {/* Scanning Animation Overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_20px_rgba(46,161,105,1)] animate-[scan_3s_ease-in-out_infinite]" />
      </div>

      {/* Details Side */}
      <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
        <h3 className="text-sm font-medium text-textMuted uppercase tracking-wider mb-2">AI Diagnosis Result</h3>
        
        <h2 className={`text-3xl font-bold mb-6 ${isHealthy ? 'text-primary' : 'text-danger'}`}>
          {formattedDisease}
        </h2>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-textMuted">Confidence Level</span>
              <span className="text-2xl font-bold text-textMain">{confidencePercent}%</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${confidencePercent}%` }}
                transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                className={`h-full rounded-full ${isHealthy ? 'bg-primary' : 'bg-danger'} shadow-[0_0_10px_currentColor]`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-textMuted text-xs mb-1">Status</div>
              <div className="font-semibold text-textMain flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-primary' : 'bg-danger'}`} />
                {isHealthy ? 'Optimal' : 'Critical'}
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-textMuted text-xs mb-1">Severity Indicator</div>
              <div className="font-semibold text-textMain">
                {isHealthy ? 'None' : confidence > 90 ? 'High' : 'Moderate'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}

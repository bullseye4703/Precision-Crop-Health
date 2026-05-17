import { useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, AlertCircle, ScanLine } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UploadSection({ file, previewUrl, onFileChange, isPredicting, onPredict, error }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      onFileChange(droppedFile);
    }
  }, [onFileChange]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`w-full max-w-2xl aspect-[16/9] sm:aspect-[21/9] rounded-2xl border-2 border-dashed 
          ${file ? 'border-primary/50 bg-primary/10' : 'border-white/20 bg-white/5 hover:border-primary/50 hover:bg-white/10'} 
          transition-all duration-300 ease-in-out flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group`}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <input 
          id="file-upload"
          type="file" 
          accept="image/jpeg, image/png, image/jpg" 
          className="hidden" 
          onChange={(e) => {
            if (e.target.files?.[0]) onFileChange(e.target.files[0]);
          }}
        />

        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center mb-3 shadow-lg border border-white/10 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-8 h-8 text-primary" />
              </div>
              <p className="font-medium text-white">{file.name}</p>
              <p className="text-sm text-white/60 mt-1">Click or drag to change image</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center px-4 relative z-10">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 shadow-sm border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20 backdrop-blur-sm">
              <UploadCloud className="w-8 h-8 text-primary group-hover:text-primaryHover transition-colors" />
            </div>
            <p className="text-lg font-medium text-white mb-2">Drag and drop your image here</p>
            <p className="text-sm text-textMuted mb-4">Supports JPG, JPEG, PNG</p>
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/20 transition-colors text-white backdrop-blur-sm">
              Browse Files
            </span>
          </div>
        )}
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-danger bg-danger/10 px-4 py-3 rounded-lg border border-danger/20 w-full max-w-2xl"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      <button
        onClick={onPredict}
        disabled={!file || isPredicting}
        className={`w-full max-w-md py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3
          ${!file || isPredicting 
            ? 'bg-white/5 text-white/40 cursor-not-allowed border border-white/10' 
            : 'bg-primary hover:bg-primaryHover text-white shadow-lg shadow-primary/40 transform hover:-translate-y-1'
          }`}
      >
        {isPredicting ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Analyzing Image...
          </>
        ) : (
          <>
            <ScanLine className="w-6 h-6" />
            Analyze Plant
          </>
        )}
      </button>
    </div>
  );
}

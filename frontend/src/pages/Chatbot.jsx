import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Volume2, Square, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getDiseaseInfo, diseaseDictionary } from '../utils/diseaseInfo';

export default function Chatbot() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: language === 'en' ? "Hello! I am your AI Agriculture Assistant. How can I help you today?" : "नमस्ते! मैं आपका एआई कृषि सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Voice state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const generateResponse = (query) => {
    const q = query.toLowerCase();
    
    // Knowledge base matching
    if (q.includes('early blight')) {
      const info = diseaseDictionary["Tomato___Early_blight"];
      return language === 'en' ? `For Early Blight: ${info.treatment} Cause: ${info.cause}` : info.hindiDiagnosis;
    }
    if (q.includes('late blight')) {
      const info = diseaseDictionary["Tomato___Late_blight"];
      return language === 'en' ? `For Late Blight: ${info.treatment} Cause: ${info.cause}` : info.hindiDiagnosis;
    }
    if (q.includes('bacterial spot')) {
      const info = diseaseDictionary["Pepper__bell___Bacterial_spot"];
      return language === 'en' ? `For Bacterial Spot: ${info.treatment} Prevention: ${info.prevention}` : info.hindiDiagnosis;
    }
    if (q.includes('pesticide') || q.includes('fungicide')) {
      return language === 'en' ? "Use copper-based fungicides for blights and spots. Always consult local agricultural experts for exact dosages." : "ब्लाइट और स्पॉट के लिए तांबा आधारित फंगीसाइड का उपयोग करें। हमेशा कृषि विशेषज्ञों से सलाह लें।";
    }
    if (q.includes('prevent')) {
      return language === 'en' ? "To prevent diseases: ensure proper spacing, avoid overhead watering, practice crop rotation, and use disease-free seeds." : "बीमारियों को रोकने के लिए: उचित दूरी सुनिश्चित करें, ऊपर से पानी देने से बचें, और फसल चक्र अपनाएं।";
    }
    if (q.includes('health') || q.includes('improve')) {
      return language === 'en' ? "Maintain optimal watering, use balanced NPK fertilizers, and monitor regularly for early signs of infection." : "इष्टतम पानी बनाए रखें, संतुलित उर्वरकों का उपयोग करें, और नियमित रूप से निगरानी करें।";
    }

    // Default
    return language === 'en' 
      ? "I am currently focused on identifying and treating specific plant diseases like Early Blight, Late Blight, and Bacterial Spot. Please upload a leaf image in the Detect section for precise diagnosis."
      : "मैं वर्तमान में पौधों की बीमारियों की पहचान करने पर केंद्रित हूं। सटीक निदान के लिए कृपया जांच अनुभाग में पत्ते की छवि अपलोड करें।";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateResponse(userMsg.text);
      const botMsg = { id: Date.now() + 1, type: 'bot', text: responseText };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const playVoice = (text, msgId) => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying && currentMessageId === msgId) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechUtterance = utterance; // Prevent GC
      
      if (language === 'hi') {
        const voices = window.speechSynthesis.getVoices();
        const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('HI'));
        if (hindiVoice) utterance.voice = hindiVoice;
        utterance.lang = 'hi-IN';
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setCurrentMessageId(msgId);
      };
      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentMessageId(null);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setCurrentMessageId(null);
      };

      window.speechSynthesis.speak(utterance);
    }, 50);
  };

  const suggestions = language === 'en' ? [
    "How to cure early blight?",
    "How to prevent bacterial spot?",
    "Best pesticide for tomato diseases?",
    "How to improve plant health?"
  ] : [
    "अर्ली ब्लाइट का इलाज कैसे करें?",
    "बैक्टीरियल स्पॉट को कैसे रोकें?",
    "टमाटर के रोगों के लिए सबसे अच्छा कीटनाशक?",
    "पौधों के स्वास्थ्य में सुधार कैसे करें?"
  ];

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-6rem)] flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">{t('chatbot.title')}</h2>
        <p className="text-textMuted">{t('chatbot.subtitle')}</p>
      </div>

      <div className="flex-1 glass-card overflow-hidden flex flex-col relative">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                    {msg.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  
                  <div className={`group relative p-4 rounded-2xl ${msg.type === 'user' ? 'bg-primary/10 border border-primary/20 rounded-tr-none' : 'bg-white/5 border border-white/10 rounded-tl-none'}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    {msg.type === 'bot' && (
                      <button 
                        onClick={() => playVoice(msg.text, msg.id)}
                        className={`absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 ${isPlaying && currentMessageId === msg.id ? 'bg-primary text-white opacity-100' : 'bg-white/10 text-textMuted hover:text-textMain'}`}
                      >
                        {isPlaying && currentMessageId === msg.id ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-xs text-textMuted uppercase tracking-wider">Processing...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions & Input */}
        <div className="p-4 border-t border-white/5 bg-surface/50 backdrop-blur-sm">
          {messages.length === 1 && (
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="text-xs text-textMuted py-2">{t('chatbot.suggestionsTitle')}</span>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(s); }}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-primary hover:text-primary transition-colors text-textMain"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chatbot.placeholder')}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm text-textMain"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-primary hover:bg-primary/90 text-background p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [processId, setProcessId] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: number | undefined;
    if (isLoading) {
      setProcessId(Math.random().toString(16).substring(2, 8).toUpperCase());
      interval = window.setInterval(() => {
        setLoadingStep(s => (s + 1) % 3);
        setProcessId(Math.random().toString(16).substring(2, 8).toUpperCase());
      }, 1200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const loadingStatuses = isThinkingMode 
    ? ['ANALYZING LOGIC', 'SYNTHESIZING', 'VALIDATING']
    : ['RETRIEVING', 'FORMATTING', 'OUTPUTTING'];

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const modelName = isThinkingMode ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are the official AI assistant for Ginbar Media, an editorial digital strategy agency in Addis Ababa. Your tone is professional, minimalist, and helpful. You discuss design, strategy, and branding with a focus on 'reduction of chaos into system'. Keep responses concise and insightful.",
          ...(isThinkingMode && { 
            thinkingConfig: { thinkingBudget: 32768 } 
          })
        }
      });

      const aiText = response.text || "I apologize, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to Ginbar Intelligence. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-6 md:right-12 z-[60] w-14 h-14 bg-ink dark:bg-paper dark:text-ink text-paper rounded-none flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 shadow-xl group border border-white/10"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent animate-pulse"></div>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[12rem] right-6 md:right-12 z-[60] w-[90vw] md:w-96 bg-paper dark:bg-paper-dark border border-ink/10 dark:border-white/10 shadow-2xl flex flex-col h-[500px] overflow-hidden"
          >
            <div className="p-4 border-b border-ink/5 dark:border-white/5 bg-ink dark:bg-white text-paper dark:text-ink flex justify-between items-center">
              <div>
                <h3 className="font-display font-bold uppercase tracking-tight text-sm">Ginbar Intelligence</h3>
                <p className="text-[10px] opacity-60 font-mono">v3.0.1 ALPHA</p>
              </div>
              <button 
                onClick={() => setIsThinkingMode(!isThinkingMode)}
                className={`flex items-center gap-2 px-2 py-1 border text-[10px] font-mono transition-all duration-300 ${isThinkingMode ? 'bg-accent border-accent text-white' : 'border-white/20 dark:border-ink/20 hover:border-white dark:hover:border-ink'}`}
              >
                {isThinkingMode ? 'THINKING_MODE' : 'FAST_MODE'}
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-sans bg-paper dark:bg-paper-dark scroll-smooth">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center px-8 text-ink dark:text-ink-dark">
                  <div className="w-12 h-12 border border-ink/20 dark:border-white/20 flex items-center justify-center mb-4 text-xl font-display font-bold">G</div>
                  <p className="text-xs uppercase tracking-widest leading-loose">
                    Inquire about strategy,<br/>design systems, or our<br/>Ethiopian heritage.
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-sm leading-relaxed ${m.role === 'user' ? 'bg-accent text-white font-medium' : 'bg-ink/5 dark:bg-white/5 border border-ink/10 dark:border-white/10 text-ink dark:text-ink-dark'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="relative overflow-hidden bg-ink/5 dark:bg-white/5 border border-ink/10 dark:border-white/10 p-5 flex flex-col gap-5 min-w-[240px]">
                    
                    {/* Multi-Bar Spectrum Analyzer Animation */}
                    <div className="flex gap-[2px] items-end h-8">
                        {[...Array(24)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`flex-1 ${isThinkingMode ? 'bg-accent' : 'bg-ink/40 dark:bg-white/40'}`}
                                animate={{
                                    height: [`${15 + Math.random() * 20}%`, `${70 + Math.random() * 30}%`, `${10 + Math.random() * 40}%`],
                                    opacity: [0.3, 1, 0.5]
                                }}
                                transition={{
                                    duration: 0.5 + (Math.random() * 0.5),
                                    repeat: Infinity,
                                    delay: i * 0.03,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <motion.span 
                            key={loadingStep}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent font-bold"
                        >
                            {loadingStatuses[loadingStep]}
                        </motion.span>
                        <span className="text-[9px] font-mono text-ink/40 dark:text-ink-dark/40">
                           {processId}
                        </span>
                      </div>
                      
                      {/* Technical Progress Sub-bar */}
                      <div className="w-full h-[1px] bg-ink/5 dark:bg-white/5 relative overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-accent/40"
                          animate={{ left: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          style={{ width: "30%" }}
                        />
                      </div>
                      
                      <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-ink/30 dark:text-ink-dark/30">
                         System Cluster: G-INTEL-{isThinkingMode ? 'PRO' : 'LITE'}
                      </span>
                    </div>

                    {/* Scanning Radial Light Pulse */}
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent pointer-events-none z-20"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Vertical Scan Line */}
                    <motion.div 
                        className="absolute inset-x-0 h-[1px] bg-accent/20 pointer-events-none z-20"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-ink/5 dark:border-white/5 bg-paper/50 dark:bg-paper-dark/50">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Inquire here..."
                  className="flex-1 bg-transparent border border-ink/10 dark:border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-ink/20 dark:placeholder:text-ink-dark/20 text-ink dark:text-ink-dark"
                />
                <button 
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-ink dark:bg-white dark:text-ink text-white px-4 py-2 hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:bg-ink transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

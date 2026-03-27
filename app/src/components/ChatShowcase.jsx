import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../content';
import SectionWrapper from './ui/SectionWrapper';
import GlassPanel from './ui/GlassPanel';

export default function ChatShowcase() {
  const { chat } = CONTENT;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const handleSend = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: chat.sampleResponse },
      ]);
    }, 1800);
  };

  return (
    <SectionWrapper id="ai">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text-red"
      >
        {chat.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-white/50 max-w-xl mx-auto mb-10 whitespace-pre-line text-sm leading-relaxed"
      >
        {chat.intro}
      </motion.p>

      <GlassPanel className="max-w-2xl mx-auto !border-red-glow/20 hover:!border-red-glow/40 transition-colors duration-500">
        {/* Chat messages */}
        <div className="min-h-[280px] max-h-[400px] overflow-y-auto space-y-4 mb-6 pr-2">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-[200px]">
              <p className="text-white/20 text-sm">Start a conversation below</p>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#FB0C0C] to-[#950707] text-white rounded-br-md'
                      : 'bg-white/[0.05] border border-white/10 text-white/70 rounded-bl-md'
                  }`}
                >
                  {msg.text.split('\n').map((line, j, arr) => (
                    <span key={j}>
                      {line}
                      {j < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-1.5 px-4 py-3"
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-2 h-2 rounded-full bg-red-glow/50 animate-pulse-glow"
                  style={{ animationDelay: `${d * 0.2}s` }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Starter prompts */}
        {messages.length === 0 && (
          <div className="mb-4">
            <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-white/30 font-secondary">
              Starter prompts
            </p>
            <div className="flex flex-wrap gap-2">
            {chat.prompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-white/40 hover:border-red-glow/30 hover:text-white/60 hover:bg-red-glow/[0.05] transition-all duration-200 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={chat.placeholder}
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-red-glow/40 focus:shadow-[0_0_20px_rgba(251,12,12,0.15)] transition-all duration-300"
          />
          <button
            onClick={() => handleSend()}
            className="px-5 py-3 rounded-xl text-sm font-medium text-white cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,12,12,0.3)]"
            style={{ background: 'linear-gradient(135deg, #FB0C0C, #950707)' }}
          >
            Send
          </button>
        </div>
      </GlassPanel>
    </SectionWrapper>
  );
}

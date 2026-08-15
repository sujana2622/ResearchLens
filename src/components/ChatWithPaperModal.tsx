import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Quote,
  Loader2,
  FileText,
} from 'lucide-react';
import { Paper, ChatMessage } from '../types';
import { chatWithPaper } from '../services/geminiService';

interface ChatWithPaperModalProps {
  paper: Paper;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWithPaperModal: React.FC<ChatWithPaperModalProps> = ({
  paper,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello! I've loaded "${paper.title}". Ask me any questions about its methodology, datasets, empirical benchmarks, or limitations.`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'How does this compare to baseline models?',
    'What dataset was used and how many records?',
    'What are the key limitations acknowledged by authors?',
    'Explain the core algorithm in simple terms.',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = async (questionToSend?: string) => {
    const q = questionToSend || inputText;
    if (!q.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await chatWithPaper(paper, messages, q.trim());
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: 'Just now',
        citationQuotes: response.citationQuotes,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: 'I encountered an error analyzing that question. Please try again.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-md h-[88vh] sm:h-[650px] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-zinc-200">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-zinc-900 truncate">
                Chat with Paper
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium truncate">
                {paper.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0 text-xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-zinc-950 text-white rounded-tr-xs'
                      : 'bg-zinc-100 text-zinc-800 rounded-tl-xs border border-zinc-200/80'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Citation quote pill if available */}
                  {msg.citationQuotes && msg.citationQuotes.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-zinc-200/80 space-y-1.5">
                      {msg.citationQuotes.map((quote, qi) => (
                        <div
                          key={qi}
                          className="bg-white/80 rounded-lg p-2 text-xs text-zinc-700 border border-zinc-200 flex items-start gap-1.5"
                        >
                          <Quote className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-zinc-900 block text-[11px]">
                              {quote.section}
                            </span>
                            <span className="italic text-zinc-600">"{quote.quote}"</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-zinc-200 text-zinc-700 flex items-center justify-center shrink-0 text-xs mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2.5 justify-start items-center text-zinc-500 text-xs pl-9">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Analyzing paper contents...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested prompts (if few messages) */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none">
            {suggestedQuestions.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleSend(sq)}
                className="text-[11px] font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2.5 py-1 rounded-full whitespace-nowrap border border-zinc-200 transition-colors shrink-0"
              >
                {sq}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 border-t border-zinc-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-zinc-100 focus-within:bg-white border border-zinc-200 focus-within:border-zinc-400 rounded-2xl px-3 py-1.5 transition-all"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about this research..."
              className="w-full bg-transparent text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden py-1"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2 rounded-xl bg-zinc-900 text-white disabled:opacity-40 disabled:hover:bg-zinc-900 hover:bg-zinc-800 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

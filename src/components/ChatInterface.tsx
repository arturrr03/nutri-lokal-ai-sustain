// tailwind.config.js

 

// ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../utils/types';
import { sendMessageToGemini } from '../services/geminiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    role: 'assistant',
    content: 'Selamat datang di NutriLokal! Saya siap bantu rekomendasi gizi dan menu sehat dari bahan lokal. Apa yang bisa saya bantu hari ini?',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini([...messages, userMessage]);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col h-[600px] bg-gradient-to-tr from-lime-100 via-white to-teal-50 rounded-3xl shadow-2xl overflow-hidden border border-teal-100/40 relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.3)_0%,transparent_70%)] z-0 pointer-events-none" />
      <div className="flex-1 overflow-y-auto p-5 space-y-4 relative z-10">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3 rounded-3xl backdrop-blur-md shadow-md transition-all duration-300 ${message.role === 'user' ? 'bg-nutri-blue text-white rounded-tr-none' : 'bg-white/80 text-gray-900 border border-gray-100 rounded-tl-none'}`}>
              <div className="text-xs mb-1 flex justify-between">
                <span className={message.role === 'user' ? 'text-blue-100' : 'text-gray-600'}>{message.role === 'user' ? 'Anda' : 'NutriLokal'}</span>
                <span className={message.role === 'user' ? 'text-blue-100' : 'text-gray-600'}>{formatTimestamp(message.timestamp)}</span>
              </div>
              <div className="whitespace-pre-wrap leading-snug">{message.content}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-3xl px-5 py-3 shadow-md max-w-[80%]">
              <div className="text-xs mb-1 text-teal-800">NutriLokal</div>
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce delay-200" />
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce delay-400" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4 relative z-10">
        <div className="flex space-x-2 items-center">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pertanyaan nutrisi atau bahan makanan..."
            className="flex-1 bg-gray-100/60 rounded-full px-4 py-2 shadow-inner text-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="bg-nutri-green hover:bg-emerald-600 text-green rounded-full px-3 py-2 shadow-md"
            disabled={isLoading || input.trim() === ''}
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;

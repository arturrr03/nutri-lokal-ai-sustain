
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../utils/types';
import { sendMessageToGemini } from '../services/geminiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Selamat datang di NutriLokal! Saya siap membantu Anda dengan rekomendasi gizi dan menu sehat menggunakan bahan lokal yang terjangkau. Apa yang bisa saya bantu hari ini?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
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
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} chat-bubble-animation`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user' 
                  ? 'bg-nutrilokal-blue text-white rounded-tr-none' 
                  : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {message.role === 'user' ? 'Anda' : 'NutriLokal'}
                </span>
                <span className={`text-xs ml-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
              <div className={`${message.role === 'user' ? 'text-white' : 'text-gray-800'} whitespace-pre-wrap`}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start chat-bubble-animation">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 rounded-tl-none shadow-sm max-w-[80%]">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-gray-400">NutriLokal</span>
                <span className="text-xs ml-2 text-gray-400">{formatTimestamp(new Date())}</span>
              </div>
              <div className="typing-indicator flex">
                <span style={{ '--dot-index': 0 } as React.CSSProperties} className="w-2 h-2 bg-nutrilokal-green rounded-full mx-0.5"></span>
                <span style={{ '--dot-index': 1 } as React.CSSProperties} className="w-2 h-2 bg-nutrilokal-green rounded-full mx-0.5"></span>
                <span style={{ '--dot-index': 2 } as React.CSSProperties} className="w-2 h-2 bg-nutrilokal-green rounded-full mx-0.5"></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="bg-white p-3 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tuliskan bahan makanan yang tersedia atau tanyakan tentang nutrisi..."
            className="flex-1 bg-gray-50"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-nutrilokal-green hover:bg-nutrilokal-green-dark transition-colors"
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

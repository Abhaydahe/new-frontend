"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Paperclip } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'other';
  text: string;
  timestamp: string;
}

const dummyMessages: Message[] = [
  {
    id: '1',
    sender: 'other',
    text: 'Hi! I saw your application for the Senior Architect position.',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    sender: 'user',
    text: 'Hello! Yes, I am very interested in this opportunity.',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    sender: 'other',
    text: 'Great! Can you tell me more about your experience with commercial projects?',
    timestamp: '10:35 AM',
  },
  {
    id: '4',
    sender: 'user',
    text: 'I have 10+ years of experience in commercial architecture. I have led projects worth over ₹50Cr.',
    timestamp: '10:37 AM',
  },
];

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientName?: string;
  recipientAvatar?: string;
}

export function ChatModal({
  open,
  onOpenChange,
  recipientName = 'Tech Solutions Ltd',
  recipientAvatar = '',
}: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={recipientAvatar} alt={recipientName} />
              <AvatarFallback className="bg-[#00ADB5] text-white">
                {recipientName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{recipientName}</DialogTitle>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-[#00ADB5] text-white'
                      : 'bg-gray-100 text-[#222831]'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/80' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              size="icon"
              className="bg-[#00ADB5] hover:bg-[#00ADB5]/90"
              onClick={handleSendMessage}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is a demo chat interface. Real-time messaging will be available soon.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

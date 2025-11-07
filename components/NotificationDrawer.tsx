"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Briefcase, FileText, MessageSquare, CheckCircle, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'job_match' | 'proposal' | 'application' | 'message';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

const dummyNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Job Match',
    message: 'Senior Architect position matches your profile',
    type: 'job_match',
    link: '/jobs/1',
    isRead: false,
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Proposal Accepted',
    message: 'Your proposal for 3D Visualization project has been accepted',
    type: 'proposal',
    link: '/dashboard/freelancer',
    isRead: false,
    createdAt: '5 hours ago',
  },
  {
    id: '3',
    title: 'Application Update',
    message: 'Your application for Interior Designer has been shortlisted',
    type: 'application',
    link: '/dashboard/jobseeker',
    isRead: false,
    createdAt: '1 day ago',
  },
  {
    id: '4',
    title: 'New Message',
    message: 'You have a new message from Tech Solutions Ltd',
    type: 'message',
    link: '/messages',
    isRead: true,
    createdAt: '2 days ago',
  },
  {
    id: '5',
    title: 'Job Alert',
    message: '3 new Architecture jobs posted in Mumbai',
    type: 'job_match',
    link: '/jobs',
    isRead: true,
    createdAt: '3 days ago',
  },
];

interface NotificationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationDrawer({ open, onOpenChange }: NotificationDrawerProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'job_match':
        return <Briefcase className="w-5 h-5" />;
      case 'proposal':
        return <FileText className="w-5 h-5" />;
      case 'application':
        return <CheckCircle className="w-5 h-5" />;
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'job_match':
        return 'bg-blue-100 text-blue-600';
      case 'proposal':
        return 'bg-green-100 text-green-600';
      case 'application':
        return 'bg-purple-100 text-purple-600';
      case 'message':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const unreadCount = dummyNotifications.filter(n => !n.isRead).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-96">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-red-500">{unreadCount}</Badge>
              )}
            </SheetTitle>
            <Button variant="ghost" size="sm" className="text-[#00ADB5]">
              Mark all as read
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-100px)] mt-6">
          <div className="space-y-3">
            {dummyNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                  notification.isRead
                    ? 'bg-white border-gray-200'
                    : 'bg-[#00ADB5]/5 border-[#00ADB5]/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm text-[#222831]">
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-[#00ADB5] rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <Button variant="outline" className="w-full">
            View All Notifications
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

'use client'

import React, { useState } from 'react';
import { Menu, X, Kanban, Settings, HelpCircle, User, Bell, Activity } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";

const HomePage = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(3);

  const menuItems = [
    { icon: <Kanban size={20} />, text: 'Projects' },
    { icon: <User size={20} />, text: 'Profile' },
    { icon: <Settings size={20} />, text: 'Settings' },
    { icon: <HelpCircle size={20} />, text: 'Help & FAQ' },
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 lg:relative lg:flex z-40 ${sidebarOpen ? 'flex' : 'hidden'}`}>
        <div className="flex flex-col w-64 bg-gray-50 border-r min-h-screen">
          {/* Sidebar Header */}
          <div className="p-4 border-b shrink-0">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">CIMPL</h1>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
          </div>

          {/* Scrollable Menu Area */}
          <div className="flex-1 overflow-y-auto">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start gap-2 text-gray-700 hover:text-gray-900"
                  >
                    {item.icon}
                    {item.text}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* User Profile Section - Now sticky at bottom */}
          <div className="border-t p-4 bg-gray-50 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" alt="User" />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Jawad Khalid</span>
                  <span className="text-xs text-gray-500">jawad@questra.digital</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {notifications > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b shrink-0">
          <div className="flex items-center p-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            {/* Tooltip */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium">
              <Activity size={16} />
              <span>Keep people of Gaza in your prayers. And Take care of underpreivliged people around you</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900">Assalamu Alaikum! Jawad</h2>
            <p className="text-lg text-gray-600">
              With Allah's blessings, See your innovative Ideas come to reality
            </p>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
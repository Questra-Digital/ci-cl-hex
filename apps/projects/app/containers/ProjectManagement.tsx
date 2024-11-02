'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { GripHorizontal, X } from 'lucide-react';

// Mock data
const mockData = {
  epics: [
    { id: '1', title: 'User Authentication', status: 'TODO', description: 'Implement user auth system' },
    { id: '2', title: 'Payment Integration', status: 'IN_PROGRESS', description: 'Add payment gateway' },
    { id: '3', title: 'Reporting Dashboard', status: 'DONE', description: 'Create analytics dashboard' },
  ],
  stories: [
    { id: '1', title: 'Login Form', status: 'TODO', epicId: '1', description: 'Create login form with validation' },
    { id: '2', title: 'Password Reset', status: 'IN_PROGRESS', epicId: '1', description: 'Implement password reset flow' },
    { id: '3', title: 'Stripe Setup', status: 'REVIEW', epicId: '2', description: 'Set up Stripe payment gateway' },
    { id: '4', title: 'Charts Component', status: 'DONE', epicId: '3', description: 'Create reusable charts' },
  ],
  meetings: [
    { 
      id: '1', 
      date: '2024-10-27', 
      topic: 'Sprint Planning', 
      decisions: 'Prioritized auth features',
      attendees: 'John, Sarah, Mike'
    },
    {
      id: '2',
      date: '2024-10-26',
      topic: 'Technical Review',
      decisions: 'Decided on OAuth implementation',
      attendees: 'Sarah, Mike, Tom'
    }
  ]
};

const Sidebar = ({ item, type, onClose, onSave }) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleSave = () => {
    onSave(editedItem, type);
    onClose();
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg border-l border-gray-200 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Edit {type}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            value={editedItem.title || editedItem.topic || ''}
            onChange={(e) => setEditedItem({...editedItem, [type === 'meeting' ? 'topic' : 'title']: e.target.value})}
          />
        </div>

        {(type === 'epic' || type === 'story') && (
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={editedItem.description || ''}
              onChange={(e) => setEditedItem({...editedItem, description: e.target.value})}
              rows={4}
            />
          </div>
        )}

        {type === 'meeting' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input
                type="date"
                value={editedItem.date}
                onChange={(e) => setEditedItem({...editedItem, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Decisions</label>
              <Textarea
                value={editedItem.decisions}
                onChange={(e) => setEditedItem({...editedItem, decisions: e.target.value})}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Attendees</label>
              <Input
                value={editedItem.attendees}
                onChange={(e) => setEditedItem({...editedItem, attendees: e.target.value})}
              />
            </div>
          </>
        )}

        {type === 'story' && (
          <div>
            <label className="block text-sm font-medium mb-1">Epic</label>
            <select
              className="w-full rounded-md border border-gray-300 p-2"
              value={editedItem.epicId}
              onChange={(e) => setEditedItem({...editedItem, epicId: e.target.value})}
            >
              {mockData.epics.map(epic => (
                <option key={epic.id} value={epic.id}>{epic.title}</option>
              ))}
            </select>
          </div>
        )}

        <Button className="w-full" onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

const ProjectManagement = () => {
  const [epics, setEpics] = useState(mockData.epics);
  const [stories, setStories] = useState(mockData.stories);
  const [meetings, setMeetings] = useState(mockData.meetings);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragType, setDragType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleDragStart = (e, item, type) => {
    setDraggedItem(item);
    setDragType(type);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (dragType === 'epic') {
      const updatedEpics = epics.map(epic => 
        epic.id === draggedItem.id ? { ...epic, status } : epic
      );
      setEpics(updatedEpics);
    } else if (dragType === 'story') {
      const updatedStories = stories.map(story => 
        story.id === draggedItem.id ? { ...story, status } : story
      );
      setStories(updatedStories);
    }

    setDraggedItem(null);
    setDragType(null);
  };

  const handleItemClick = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  const handleSave = (updatedItem, type) => {
    if (type === 'epic') {
      setEpics(epics.map(epic => epic.id === updatedItem.id ? updatedItem : epic));
    } else if (type === 'story') {
      setStories(stories.map(story => story.id === updatedItem.id ? updatedItem : story));
    } else if (type === 'meeting') {
      setMeetings(meetings.map(meeting => meeting.id === updatedItem.id ? updatedItem : meeting));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* EPICs Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">EPICs</h2>
        <div className="grid grid-cols-3 gap-4">
          {['TODO', 'IN_PROGRESS', 'DONE'].map((status) => (
            <div
              key={status}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
              className="bg-gray-50 p-4 rounded-lg min-h-[400px]"
            >
              <h3 className="font-semibold mb-4">{status.replace('_', ' ')}</h3>
              {epics
                .filter(epic => epic.status === status)
                .map((epic) => (
                  <Card
                    key={epic.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, epic, 'epic')}
                    onClick={() => handleItemClick(epic, 'epic')}
                    className="mb-4 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="float-right">
                        <GripHorizontal className="h-4 w-4" />
                      </div>
                      <CardTitle>{epic.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{epic.description}</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* User Stories Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">User Stories</h2>
        <div className="grid grid-cols-4 gap-4">
          {['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'].map((status) => (
            <div
              key={status}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
              className="bg-gray-50 p-4 rounded-lg min-h-[300px]"
            >
              <h3 className="font-semibold mb-4">{status.replace('_', ' ')}</h3>
              {stories
                .filter(story => story.status === status)
                .map(story => (
                  <Card
                    key={story.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, story, 'story')}
                    onClick={() => handleItemClick(story, 'story')}
                    className="mb-4 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="float-right">
                        <GripHorizontal className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-sm">{story.title}</CardTitle>
                      <p className="text-xs text-gray-500">
                        Epic: {epics.find(epic => epic.id === story.epicId)?.title}
                      </p>
                    </CardHeader>
                  </Card>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Meeting Minutes Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Meeting Minutes</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Decisions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {meetings.map(meeting => (
                  <tr 
                    key={meeting.id}
                    onClick={() => handleItemClick(meeting, 'meeting')}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{meeting.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{meeting.topic}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{meeting.decisions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{meeting.attendees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sidebar */}
      {selectedItem && (
        <Sidebar
          item={selectedItem}
          type={selectedType}
          onClose={() => {
            setSelectedItem(null);
            setSelectedType(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProjectManagement;
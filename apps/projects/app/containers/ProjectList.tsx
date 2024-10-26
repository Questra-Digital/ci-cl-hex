'use client'

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { TableIcon, LayoutGridIcon, Search, ArrowUpDown, Plus } from 'lucide-react';
import { Switch } from '@/app/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Label } from "@/app/components/ui/label";
import { useToast } from "@/app/hooks/use-toast";


const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $description: String, $status: String!) {
    createProject(title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;


const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      status
    }
  }
`;

const ProjectList = () => {
  const { toast } = useToast();
  const [isTableView, setIsTableView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const { loading: projectsLoading, error: projectsError, data } = useQuery(GET_PROJECTS);
  const [createProject, { loading: createLoading }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
    onCompleted: () => {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

   // New project form state
   const [newProject, setNewProject] = useState({
    title: '',
    status: ''
  });

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to save the new project
    try {
      await createProject({ variables: { ...newProject } });
      // Reset form and close dialog
      setNewProject({
        title: '',
        status: ''
      });

    }  catch (error) {
      console.error('Error creating project:', error);
    }
  };


  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      const colors = {
        'Completed': 'bg-green-100 text-green-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Planning': 'bg-yellow-100 text-yellow-800'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
        {status}
      </span>
    );
  };

  // Sort function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };


  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    return data === undefined ?  [] : data.projects
      .filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const direction = sortDirection === 'asc' ? 1 : -1;
        return aValue.localeCompare(bValue) * direction;
      });
  }, [data, searchQuery, statusFilter, sortField, sortDirection]);

  // Header with Sort Button
  const SortButton = ({ field, children }) => (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center gap-1 ${sortField === field ? 'text-blue-600' : ''}`}
      onClick={() => handleSort(field)}
    >
      {children}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );

  // Show loading state
  if (projectsLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show error state
  if (projectsError) {
    return (
      <div className="w-full p-4 text-red-500">
        Error loading projects: {projectsError.message}
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header with view toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Enter the details for your new project.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="Title"
                    value={newProject.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newProject.status}
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Project</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center gap-2">
          <TableIcon className={`w-5 h-5 ${isTableView ? 'text-blue-600' : 'text-gray-400'}`} />
          <Switch
            checked={!isTableView}
            onCheckedChange={() => setIsTableView(!isTableView)}
          />
          <LayoutGridIcon className={`w-5 h-5 ${!isTableView ? 'text-blue-600' : 'text-gray-400'}`} />
        </div>
      </div>


      {/* Search and Filter Controls */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Planning">Planning</SelectItem>
          </SelectContent>
        </Select>
      </div>


      {/* Table View */}
      {isTableView ? (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <SortButton field="title">Project Name</SortButton>
                </TableHead>
                <TableHead>
                <SortButton field="status">Status</SortButton>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell><StatusBadge status={project.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Status</span>
                    <StatusBadge status={project.status} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;

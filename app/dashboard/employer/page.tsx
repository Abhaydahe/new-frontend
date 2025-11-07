"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Users, Eye, TrendingUp, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const statsData = [
  { label: 'Active Jobs', value: '8', icon: Briefcase, color: 'text-blue-600' },
  { label: 'Total Applicants', value: '156', icon: Users, color: 'text-green-600' },
  { label: 'Total Views', value: '2,345', icon: Eye, color: 'text-purple-600' },
  { label: 'Hired This Month', value: '3', icon: TrendingUp, color: 'text-[#00ADB5]' },
];

const jobsData = [
  { id: 1, title: 'Senior Architect', status: 'Active', applicants: 12, views: 245, posted: '2025-10-20' },
  { id: 2, title: 'Interior Designer', status: 'Active', applicants: 23, views: 189, posted: '2025-10-18' },
  { id: 3, title: 'Project Manager', status: 'Active', applicants: 8, views: 312, posted: '2025-10-15' },
  { id: 4, title: '3D Visualizer', status: 'Closed', applicants: 34, views: 421, posted: '2025-10-10' },
  { id: 5, title: 'Structural Engineer', status: 'Active', applicants: 15, views: 156, posted: '2025-10-12' },
];

const applicationsData = [
  { id: 1, name: 'Rahul Verma', job: 'Senior Architect', status: 'Applied', date: '2025-10-25', email: 'rahul@example.com' },
  { id: 2, name: 'Sneha Patel', job: 'Interior Designer', status: 'Shortlisted', date: '2025-10-24', email: 'sneha@example.com' },
  { id: 3, name: 'Amit Singh', job: 'Senior Architect', status: 'Interview', date: '2025-10-23', email: 'amit@example.com' },
  { id: 4, name: 'Priya Sharma', job: 'Project Manager', status: 'Applied', date: '2025-10-22', email: 'priya@example.com' },
];

export default function EmployerDashboard() {
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'Active': 'bg-green-500',
      'Closed': 'bg-gray-500',
      'Draft': 'bg-yellow-500',
      'Applied': 'bg-blue-500',
      'Shortlisted': 'bg-purple-500',
      'Interview': 'bg-orange-500',
      'Hired': 'bg-green-500',
      'Rejected': 'bg-red-500',
    };
    return <Badge className={variants[status] || 'bg-gray-500'}>{status}</Badge>;
  };

  const handlePostJob = () => {
    toast({
      title: 'Job posted successfully!',
      description: 'Your job posting is now live.',
    });
    setIsPostJobOpen(false);
  };

  const handleStatusChange = (applicantId: number, newStatus: string) => {
    toast({
      title: 'Status updated',
      description: `Application status changed to ${newStatus}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#222831]">Employer Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your job postings and applications</p>
          </div>
          <Dialog open={isPostJobOpen} onOpenChange={setIsPostJobOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#00ADB5] hover:bg-[#00ADB5]/90">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Post a New Job</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" placeholder="e.g., Senior Architect" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Your company name" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="architecture">Architecture</SelectItem>
                        <SelectItem value="interior">Interior Design</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="3d-viz">3D Visualization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Job Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Mumbai, India" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary-min">Min Salary (₹/year)</Label>
                    <Input id="salary-min" type="number" placeholder="800000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary-max">Max Salary (₹/year)</Label>
                    <Input id="salary-max" type="number" placeholder="1200000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (comma separated)</Label>
                  <Input id="skills" placeholder="AutoCAD, Revit, SketchUp" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed job description..."
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <Textarea
                    id="requirements"
                    placeholder="- 5+ years experience&#10;- Strong portfolio&#10;- Team player"
                    rows={4}
                  />
                </div>

                <Button
                  className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90"
                  onClick={handlePostJob}
                >
                  Post Job
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#222831] mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="jobs">Manage Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Your Job Postings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applicants</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobsData.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{getStatusBadge(job.status)}</TableCell>
                        <TableCell>{job.applicants}</TableCell>
                        <TableCell>{job.views}</TableCell>
                        <TableCell>{new Date(job.posted).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Job</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationsData.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.name}</TableCell>
                        <TableCell>{application.email}</TableCell>
                        <TableCell>{application.job}</TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                        <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select onValueChange={(value) => handleStatusChange(application.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Update" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Shortlisted">Shortlist</SelectItem>
                              <SelectItem value="Interview">Interview</SelectItem>
                              <SelectItem value="Hired">Hire</SelectItem>
                              <SelectItem value="Rejected">Reject</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shortlisted">
            <Card>
              <CardHeader>
                <CardTitle>Shortlisted Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  No shortlisted candidates yet
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  No interviews scheduled
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

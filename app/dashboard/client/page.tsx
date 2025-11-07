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
import { FolderOpen, Users, DollarSign, TrendingUp, Plus, MoreVertical, Eye } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const statsData = [
  { label: 'Active Projects', value: '5', icon: FolderOpen, color: 'text-blue-600' },
  { label: 'Total Proposals', value: '43', icon: Users, color: 'text-green-600' },
  { label: 'Total Spent', value: '₹3.2L', icon: DollarSign, color: 'text-purple-600' },
  { label: 'Completed Projects', value: '12', icon: TrendingUp, color: 'text-[#00ADB5]' },
];

const projectsData = [
  { id: 1, title: 'Residential 3D Visualization', status: 'Open', proposals: 12, views: 234, budget: '₹50k-80k', posted: '2025-10-20' },
  { id: 2, title: 'Commercial CAD Drawings', status: 'In Progress', proposals: 8, views: 189, budget: '₹1.5k-2.5k/hr', posted: '2025-10-18' },
  { id: 3, title: 'Restaurant Interior Design', status: 'Open', proposals: 24, views: 312, budget: '₹75k-120k', posted: '2025-10-15' },
  { id: 4, title: 'BIM Modeling Office Building', status: 'In Progress', proposals: 6, views: 156, budget: '₹2k-3k/hr', posted: '2025-10-12' },
];

const proposalsData = [
  {
    id: 1,
    freelancer: 'Priya Sharma',
    project: 'Residential 3D Visualization',
    budget: '₹65,000',
    delivery: '2 weeks',
    rating: 4.9,
    status: 'Pending',
  },
  {
    id: 2,
    freelancer: 'Rajesh Kumar',
    project: 'BIM Modeling Office Building',
    budget: '₹2,500/hr',
    delivery: '6 weeks',
    rating: 4.8,
    status: 'Accepted',
  },
  {
    id: 3,
    freelancer: 'Anita Desai',
    project: 'Restaurant Interior Design',
    budget: '₹95,000',
    delivery: '3 weeks',
    rating: 4.7,
    status: 'Pending',
  },
];

const activeContractsData = [
  {
    id: 1,
    project: 'Commercial CAD Drawings',
    freelancer: 'Rajesh Kumar',
    budget: '₹180,000',
    progress: 65,
    startDate: '2025-10-15',
    deadline: '2025-11-15',
  },
  {
    id: 2,
    project: 'BIM Modeling Office Building',
    freelancer: 'Vikram Singh',
    budget: '₹220,000',
    progress: 40,
    startDate: '2025-10-10',
    deadline: '2025-12-01',
  },
];

export default function ClientDashboard() {
  const [isPostProjectOpen, setIsPostProjectOpen] = useState(false);
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'Open': 'bg-green-500',
      'In Progress': 'bg-blue-500',
      'Completed': 'bg-gray-500',
      'Closed': 'bg-red-500',
      'Pending': 'bg-yellow-500',
      'Accepted': 'bg-green-500',
      'Rejected': 'bg-red-500',
    };
    return <Badge className={variants[status] || 'bg-gray-500'}>{status}</Badge>;
  };

  const handlePostProject = () => {
    toast({
      title: 'Project posted successfully!',
      description: 'Your project is now visible to freelancers.',
    });
    setIsPostProjectOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#222831]">Client Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your projects and hire freelancers</p>
          </div>
          <Dialog open={isPostProjectOpen} onOpenChange={setIsPostProjectOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#00ADB5] hover:bg-[#00ADB5]/90">
                <Plus className="w-4 h-4 mr-2" />
                Post New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Post a New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="project-title">Project Title</Label>
                  <Input id="project-title" placeholder="e.g., 3D Visualization for Residential Building" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3d-viz">3D Visualization</SelectItem>
                        <SelectItem value="drafting">Architectural Drafting</SelectItem>
                        <SelectItem value="interior">Interior Design</SelectItem>
                        <SelectItem value="bim">BIM Modeling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget-type">Budget Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget-min">Min Budget (₹)</Label>
                    <Input id="budget-min" type="number" placeholder="50000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget-max">Max Budget (₹)</Label>
                    <Input id="budget-max" type="number" placeholder="80000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Expected Duration</Label>
                  <Input id="duration" placeholder="e.g., 2-3 weeks" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (comma separated)</Label>
                  <Input id="skills" placeholder="3ds Max, V-Ray, Photoshop" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed project description..."
                    rows={6}
                  />
                </div>

                <Button
                  className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90"
                  onClick={handlePostProject}
                >
                  Post Project
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

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="contracts">Active Contracts</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Proposals</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Posted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectsData.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>{getStatusBadge(project.status)}</TableCell>
                        <TableCell>{project.proposals}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            {project.views}
                          </div>
                        </TableCell>
                        <TableCell>{project.budget}</TableCell>
                        <TableCell>{new Date(project.posted).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>Received Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Freelancer</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Delivery</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proposalsData.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell className="font-medium">{proposal.freelancer}</TableCell>
                        <TableCell>{proposal.project}</TableCell>
                        <TableCell>{proposal.budget}</TableCell>
                        <TableCell>{proposal.delivery}</TableCell>
                        <TableCell>⭐ {proposal.rating}</TableCell>
                        <TableCell>{getStatusBadge(proposal.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-[#00ADB5] hover:bg-[#00ADB5]/90">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeContractsData.map((contract) => (
                    <div key={contract.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[#222831]">{contract.project}</h3>
                          <p className="text-sm text-gray-600 mt-1">with {contract.freelancer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#00ADB5]">{contract.budget}</p>
                          <p className="text-xs text-gray-500">Total Budget</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold">{contract.progress}%</span>
                          </div>
                          <Progress value={contract.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-gray-600">Start Date: </span>
                            <span className="font-medium">{new Date(contract.startDate).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Deadline: </span>
                            <span className="font-medium">{new Date(contract.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Details
                          </Button>
                          <Button size="sm" className="flex-1 bg-[#00ADB5] hover:bg-[#00ADB5]/90">
                            Message Freelancer
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  No payment history available
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

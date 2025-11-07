"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, FileText, Star, TrendingUp, Wallet, CreditCard } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const statsData = [
  { label: 'Active Projects', value: '3', icon: FileText, color: 'text-blue-600' },
  { label: 'Total Earnings', value: '₹4.2L', icon: DollarSign, color: 'text-green-600' },
  { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-yellow-600' },
  { label: 'Success Rate', value: '96%', icon: TrendingUp, color: 'text-[#00ADB5]' },
];

const proposalsData = [
  {
    id: 1,
    project: 'Residential 3D Visualization',
    client: 'John Smith',
    budget: '₹65,000',
    status: 'Pending',
    submittedDate: '2025-10-25',
  },
  {
    id: 2,
    project: 'Restaurant Interior Design',
    client: 'Sarah Johnson',
    budget: '₹95,000',
    status: 'Under Review',
    submittedDate: '2025-10-23',
  },
  {
    id: 3,
    project: 'Office Space Planning',
    client: 'Michael Brown',
    budget: '₹55,000',
    status: 'Rejected',
    submittedDate: '2025-10-20',
  },
];

const activeProjectsData = [
  {
    id: 1,
    title: 'Commercial CAD Drawings',
    client: 'Tech Solutions Ltd',
    budget: '₹180,000',
    progress: 65,
    deadline: '2025-11-15',
    milestones: [
      { title: 'Initial Draft', status: 'completed' },
      { title: 'Client Review', status: 'completed' },
      { title: 'Final Deliverables', status: 'in-progress' },
    ],
  },
  {
    id: 2,
    title: 'BIM Modeling Office Building',
    client: 'Urban Developers',
    budget: '₹220,000',
    progress: 40,
    deadline: '2025-12-01',
    milestones: [
      { title: 'Site Analysis', status: 'completed' },
      { title: 'Model Development', status: 'in-progress' },
      { title: 'Documentation', status: 'pending' },
    ],
  },
];

const earningsData = {
  available: 42000,
  pending: 18000,
  withdrawn: 325000,
  lastPayout: '2025-10-15',
};

const reviewsData = [
  {
    id: 1,
    client: 'John Smith',
    project: 'Residential Design',
    rating: 5,
    comment: 'Excellent work! Very professional and delivered on time.',
    date: '2025-10-20',
  },
  {
    id: 2,
    client: 'Sarah Johnson',
    project: 'Commercial Visualization',
    rating: 4.5,
    comment: 'Great quality renders. Minor revisions needed but overall satisfied.',
    date: '2025-10-15',
  },
];

export default function FreelancerDashboard() {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'Pending': 'bg-yellow-500',
      'Under Review': 'bg-blue-500',
      'Accepted': 'bg-green-500',
      'Rejected': 'bg-red-500',
      'completed': 'bg-green-500',
      'in-progress': 'bg-blue-500',
      'pending': 'bg-gray-500',
    };
    return <Badge className={variants[status] || 'bg-gray-500'}>{status}</Badge>;
  };

  const handleWithdraw = () => {
    toast({
      title: 'Withdrawal requested',
      description: 'Your funds will be transferred within 3-5 business days.',
    });
    setIsWithdrawOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222831]">Freelancer Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your projects and track earnings</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Available</p>
                  <p className="text-2xl font-bold text-green-600">₹{earningsData.available.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">₹{earningsData.pending.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Withdrawn</p>
                  <p className="text-2xl font-bold text-blue-600">₹{earningsData.withdrawn.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Last payout: {new Date(earningsData.lastPayout).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Withdraw Funds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-[#00ADB5]/10 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                  <p className="text-3xl font-bold text-[#00ADB5]">₹{earningsData.available.toLocaleString()}</p>
                </div>
                <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Withdraw
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Withdraw Funds</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (₹)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          max={earningsData.available}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="method">Withdrawal Method</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90"
                        onClick={handleWithdraw}
                      >
                        Confirm Withdrawal
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="projects">Active Projects</TabsTrigger>
            <TabsTrigger value="proposals">My Proposals</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="space-y-6">
              {activeProjectsData.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">Client: {project.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#00ADB5]">{project.budget}</p>
                        <p className="text-xs text-gray-500">Total Value</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold mb-2">Milestones</p>
                        <div className="space-y-2">
                          {project.milestones.map((milestone, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{milestone.title}</span>
                              {getStatusBadge(milestone.status)}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t text-sm">
                        <span className="text-gray-600">Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                        <Button size="sm" className="bg-[#00ADB5] hover:bg-[#00ADB5]/90">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>Submitted Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposalsData.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-[#00ADB5] transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#222831]">{proposal.project}</h3>
                          <p className="text-sm text-gray-600 mt-1">Client: {proposal.client}</p>
                          <div className="flex items-center gap-3 mt-2 text-sm">
                            <span className="text-gray-600">Budget: {proposal.budget}</span>
                            <span>•</span>
                            <span className="text-gray-600">
                              Submitted {new Date(proposal.submittedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(proposal.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Commercial CAD Drawings</p>
                      <p className="text-sm text-gray-600">Tech Solutions Ltd</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+₹117,000</p>
                      <p className="text-xs text-gray-500">Oct 15, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Residential 3D Renders</p>
                      <p className="text-sm text-gray-600">John Smith</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+₹65,000</p>
                      <p className="text-xs text-gray-500">Oct 10, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Interior Design Package</p>
                      <p className="text-sm text-gray-600">Sarah Johnson</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+₹85,000</p>
                      <p className="text-xs text-gray-500">Oct 5, 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviewsData.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.client}</p>
                          <p className="text-sm text-gray-600">{review.project}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{review.rating}</span>
                          </div>
                          <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

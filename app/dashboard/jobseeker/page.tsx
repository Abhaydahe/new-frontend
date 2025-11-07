"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, BookmarkCheck, Bell, FileText, Edit, Sparkles, CheckCircle2 } from 'lucide-react';
import { JobCard } from '@/components/JobCard';

const profileCompletionData = {
  percentage: 75,
  missing: ['Add portfolio', 'Complete skills assessment'],
};

const statsData = [
  { label: 'Applied Jobs', value: '12', icon: Briefcase, color: 'text-blue-600' },
  { label: 'Saved Jobs', value: '8', icon: BookmarkCheck, color: 'text-green-600' },
  { label: 'Job Alerts', value: '15', icon: Bell, color: 'text-purple-600' },
  { label: 'Profile Views', value: '234', icon: FileText, color: 'text-[#00ADB5]' },
];

const applicationsData = [
  {
    id: 1,
    job: 'Senior Architect',
    company: 'DesignCorp Studios',
    location: 'Mumbai, India',
    appliedDate: '2025-10-25',
    status: 'Applied',
    salary: '₹12L - ₹18L',
  },
  {
    id: 2,
    job: 'Interior Designer',
    company: 'Luxe Interiors',
    location: 'Bangalore, India',
    appliedDate: '2025-10-24',
    status: 'Interview',
    salary: '₹8L - ₹12L',
  },
  {
    id: 3,
    job: '3D Visualization Artist',
    company: 'Render Studios',
    location: 'Pune, India',
    appliedDate: '2025-10-22',
    status: 'Rejected',
    salary: '₹6L - ₹9L',
  },
  {
    id: 4,
    job: 'Project Manager',
    company: 'BuildTech Solutions',
    location: 'Delhi, India',
    appliedDate: '2025-10-20',
    status: 'Applied',
    salary: '₹15L - ₹22L',
  },
];

const savedJobsData = [
  {
    id: '5',
    employer_id: '5',
    title: 'BIM Coordinator',
    company_name: 'Tech Architecture',
    description: 'Looking for BIM expert.',
    requirements: [],
    category: 'Architecture',
    job_type: 'Full-time',
    experience_level: 'Mid',
    salary_min: 900000,
    salary_max: 1300000,
    location: 'Hyderabad, India',
    skills: ['Revit', 'BIM', 'Navisworks'],
    status: 'active',
    views: 178,
    applicants_count: 14,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function JobSeekerDashboard() {
  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: { bg: string; text: string } } = {
      'Applied': { bg: 'bg-blue-500', text: 'text-white' },
      'Interview': { bg: 'bg-orange-500', text: 'text-white' },
      'Hired': { bg: 'bg-green-500', text: 'text-white' },
      'Rejected': { bg: 'bg-red-500', text: 'text-white' },
    };
    const variant = variants[status] || { bg: 'bg-gray-500', text: 'text-white' };
    return <Badge className={`${variant.bg} ${variant.text}`}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222831]">Job Seeker Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your applications and discover new opportunities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Completion</CardTitle>
                <Button variant="ghost" size="sm" className="text-[#00ADB5]">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {profileCompletionData.percentage}% Complete
                    </span>
                    <span className="text-xs text-gray-500">
                      Complete your profile to increase visibility
                    </span>
                  </div>
                  <Progress value={profileCompletionData.percentage} className="h-3" />
                </div>
                <div className="space-y-2">
                  {profileCompletionData.missing.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Resume Improvement
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-[#00ADB5] text-white text-2xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">John Doe</h3>
                  <p className="text-sm text-gray-600">Senior Architect</p>
                  <p className="text-xs text-gray-500 mt-1">Mumbai, India</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="border-[#00ADB5] text-[#00ADB5]">
                    AutoCAD
                  </Badge>
                  <Badge variant="outline" className="border-[#00ADB5] text-[#00ADB5]">
                    Revit
                  </Badge>
                  <Badge variant="outline" className="border-[#00ADB5] text-[#00ADB5]">
                    SketchUp
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
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

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
            <TabsTrigger value="alerts">Job Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Applied Jobs</CardTitle>
                  <Badge variant="outline">{applicationsData.length} Total</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationsData.map((application) => (
                    <div
                      key={application.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-[#00ADB5] transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#222831]">
                            {application.job}
                          </h3>
                          <p className="text-sm text-gray-600">{application.company}</p>
                          <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                            <span>{application.location}</span>
                            <span>•</span>
                            <span>{application.salary}</span>
                            <span>•</span>
                            <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Saved Jobs</CardTitle>
                  <Badge variant="outline">{savedJobsData.length} Saved</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedJobsData.map((job) => (
                    <JobCard key={job.id} job={job} isSaved={true} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Job Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#222831]">Senior Architect Positions</h3>
                        <p className="text-sm text-gray-600 mt-1">Mumbai, Bangalore, Delhi</p>
                        <p className="text-xs text-gray-500 mt-2">5 new jobs match your criteria</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-[#00ADB5]">
                        View Jobs
                      </Button>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#222831]">AutoCAD, Revit Jobs</h3>
                        <p className="text-sm text-gray-600 mt-1">Remote, On-site</p>
                        <p className="text-xs text-gray-500 mt-2">3 new jobs match your skills</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-[#00ADB5]">
                        View Jobs
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

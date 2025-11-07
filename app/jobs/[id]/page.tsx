"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Briefcase, DollarSign, Clock, Building2, Calendar, Eye, Bookmark } from 'lucide-react';
import { JobCard } from '@/components/JobCard';
import { useToast } from '@/hooks/use-toast';

const jobData = {
  id: '1',
  title: 'Senior Architect',
  company_name: 'DesignCorp Studios',
  company_logo: null,
  description: `We are seeking an experienced Senior Architect to lead our residential and commercial projects. The ideal candidate will have a strong portfolio showcasing innovative designs and successful project completions.

Key Responsibilities:
• Lead architectural design projects from concept to completion
• Collaborate with clients to understand their vision and requirements
• Develop detailed architectural drawings and specifications
• Coordinate with engineering teams and contractors
• Ensure compliance with building codes and regulations
• Mentor junior architects and design staff
• Present designs to clients and stakeholders
• Manage project timelines and budgets`,
  requirements: [
    '10+ years of professional architectural experience',
    'Proficiency in AutoCAD, Revit, and SketchUp',
    'Strong understanding of building codes and regulations',
    'Excellent communication and presentation skills',
    'Proven track record of leading successful projects',
    'Team leadership and mentoring experience',
    'B.Arch or M.Arch from accredited institution',
  ],
  category: 'Architecture',
  job_type: 'Full-time',
  experience_level: 'Senior',
  salary_min: 1200000,
  salary_max: 1800000,
  location: 'Mumbai, India',
  skills: ['AutoCAD', 'Revit', 'SketchUp', '3ds Max', 'Photoshop', 'InDesign'],
  status: 'active',
  views: 245,
  applicants_count: 12,
  posted_date: '2025-10-20',
};

const similarJobs = [
  {
    id: '2',
    employer_id: '2',
    title: 'Lead Architect',
    company_name: 'Metro Designs',
    description: 'Leading architectural projects.',
    requirements: [],
    category: 'Architecture',
    job_type: 'Full-time',
    experience_level: 'Senior',
    salary_min: 1300000,
    salary_max: 1900000,
    location: 'Mumbai, India',
    skills: ['AutoCAD', 'Revit', 'BIM'],
    status: 'active',
    views: 156,
    applicants_count: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function JobDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? 'Job removed from saved' : 'Job saved successfully',
      description: isSaved ? 'Job has been removed from your saved list' : 'You can view saved jobs in your dashboard',
    });
  };

  const handleApply = () => {
    toast({
      title: 'Application submitted!',
      description: 'Your application has been sent to the employer.',
    });
    setIsDialogOpen(false);
    setCoverLetter('');
    setResumeUrl('');
  };

  const formatSalary = (min: number, max: number) => {
    return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L per year`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2 text-[#222831]">
                      {jobData.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="w-5 h-5 text-gray-600" />
                      <span className="text-xl text-[#393E46] font-medium">
                        {jobData.company_name}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSaveJob}
                    className={isSaved ? 'text-[#00ADB5]' : 'text-gray-400'}
                  >
                    <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4 text-sm text-[#393E46]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{jobData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      <span>{jobData.job_type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{jobData.experience_level} Level</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>Posted {new Date(jobData.posted_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      <span>{jobData.views} views</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-[#00ADB5]" />
                      <span className="text-2xl font-bold text-[#00ADB5]">
                        {formatSalary(jobData.salary_min, jobData.salary_max)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-[#EEEEEE] text-[#222831]">
                      {jobData.category}
                    </Badge>
                    {jobData.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-[#00ADB5] text-[#00ADB5]">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-xl font-semibold mb-3 text-[#222831]">Job Description</h3>
                    <div className="text-[#393E46] whitespace-pre-line leading-relaxed">
                      {jobData.description}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-xl font-semibold mb-3 text-[#222831]">Requirements</h3>
                    <ul className="space-y-2">
                      {jobData.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-[#393E46]">
                          <span className="text-[#00ADB5] mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {similarJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardContent className="pt-6">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 h-12 text-lg">
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Apply for {jobData.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume/CV URL</Label>
                        <Input
                          id="resume"
                          placeholder="https://example.com/resume.pdf"
                          value={resumeUrl}
                          onChange={(e) => setResumeUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cover-letter">Cover Letter</Label>
                        <Textarea
                          id="cover-letter"
                          placeholder="Tell us why you're a great fit for this role..."
                          rows={8}
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                        />
                      </div>
                      <Button
                        className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90"
                        onClick={handleApply}
                      >
                        Submit Application
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Applicants</span>
                    <span className="font-semibold">{jobData.applicants_count}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Views</span>
                    <span className="font-semibold">{jobData.views}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About {jobData.company_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#393E46]">
                  DesignCorp Studios is a leading architectural firm specializing in innovative residential
                  and commercial designs. With over 15 years of experience, we have completed numerous
                  award-winning projects across India.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

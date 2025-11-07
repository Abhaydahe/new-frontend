"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { JobCard } from '@/components/JobCard';
import { FilterPanel } from '@/components/FilterPanel';
import { supabase, Job } from '@/lib/supabase';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const categories = [
  { label: 'Architecture', value: 'architecture' },
  { label: 'Interior Design', value: 'interior' },
  { label: 'Construction', value: 'construction' },
  { label: '3D Visualization', value: '3d-viz' },
  { label: 'Structural Engineering', value: 'structural' },
];

const jobTypes = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
];

const experienceLevels = [
  { label: 'Entry Level', value: 'entry' },
  { label: 'Mid Level', value: 'mid' },
  { label: 'Senior Level', value: 'senior' },
];

const dummyJobs: Job[] = [
  {
    id: '1',
    employer_id: '1',
    title: 'Senior Architect',
    company_name: 'DesignCorp Studios',
    description: 'We are looking for an experienced architect to lead our residential projects.',
    requirements: ['10+ years experience', 'AutoCAD proficiency', 'Team leadership'],
    category: 'Architecture',
    job_type: 'Full-time',
    experience_level: 'Senior',
    salary_min: 1200000,
    salary_max: 1800000,
    location: 'Mumbai, India',
    skills: ['AutoCAD', 'Revit', 'SketchUp', '3ds Max'],
    status: 'active',
    views: 245,
    applicants_count: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    employer_id: '2',
    title: 'Interior Designer',
    company_name: 'Luxe Interiors',
    description: 'Looking for creative interior designer for high-end residential projects.',
    requirements: ['5+ years experience', 'Strong portfolio', 'Client communication'],
    category: 'Interior Design',
    job_type: 'Full-time',
    experience_level: 'Mid',
    salary_min: 800000,
    salary_max: 1200000,
    location: 'Bangalore, India',
    skills: ['AutoCAD', '3ds Max', 'V-Ray', 'Photoshop'],
    status: 'active',
    views: 189,
    applicants_count: 23,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    employer_id: '3',
    title: 'Construction Project Manager',
    company_name: 'BuildTech Solutions',
    description: 'Manage large-scale commercial construction projects from planning to execution.',
    requirements: ['7+ years in construction', 'PMP certified', 'Budget management'],
    category: 'Construction',
    job_type: 'Full-time',
    experience_level: 'Senior',
    salary_min: 1500000,
    salary_max: 2200000,
    location: 'Delhi, India',
    skills: ['Project Management', 'MS Project', 'AutoCAD', 'Cost Estimation'],
    status: 'active',
    views: 312,
    applicants_count: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    employer_id: '4',
    title: '3D Visualization Artist',
    company_name: 'Render Studios',
    description: 'Create photorealistic 3D renders for architectural projects.',
    requirements: ['3+ years experience', 'Strong portfolio', 'Attention to detail'],
    category: '3D Visualization',
    job_type: 'Contract',
    experience_level: 'Mid',
    salary_min: 600000,
    salary_max: 900000,
    location: 'Pune, India',
    skills: ['3ds Max', 'V-Ray', 'Corona', 'Photoshop', 'After Effects'],
    status: 'active',
    views: 421,
    applicants_count: 34,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    employer_id: '5',
    title: 'Structural Engineer',
    company_name: 'Engineering Dynamics',
    description: 'Design and analyze structural systems for commercial and residential buildings.',
    requirements: ['B.Tech in Civil Engineering', 'STAAD Pro expertise', '4+ years experience'],
    category: 'Structural Engineering',
    job_type: 'Full-time',
    experience_level: 'Mid',
    salary_min: 900000,
    salary_max: 1400000,
    location: 'Hyderabad, India',
    skills: ['STAAD Pro', 'ETABS', 'AutoCAD', 'Structural Analysis'],
    status: 'active',
    views: 156,
    applicants_count: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    employer_id: '6',
    title: 'Junior Architect',
    company_name: 'Urban Planning Associates',
    description: 'Assist senior architects in residential and commercial design projects.',
    requirements: ['B.Arch degree', 'AutoCAD proficiency', 'Fresh graduates welcome'],
    category: 'Architecture',
    job_type: 'Full-time',
    experience_level: 'Entry',
    salary_min: 400000,
    salary_max: 600000,
    location: 'Chennai, India',
    skills: ['AutoCAD', 'SketchUp', 'Revit', 'Photoshop'],
    status: 'active',
    views: 523,
    applicants_count: 67,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(dummyJobs);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSearch = () => {
    let filtered = dummyJobs;

    if (searchKeyword) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    }

    if (searchLocation) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    setJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Find Your Next Job in Architecture, Interior & Construction
            </h1>
            <p className="text-lg text-white/90">
              Discover opportunities from top companies in the AEC industry
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    className="pl-10 h-12 border-0 focus-visible:ring-0"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="City or location"
                    className="pl-10 h-12 border-0 focus-visible:ring-0"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button
                  className="h-12 bg-[#00ADB5] hover:bg-[#00ADB5]/90 px-8"
                  onClick={handleSearch}
                >
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#222831]">
            {jobs.length} Jobs Found
          </h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <FilterPanel
                categories={categories}
                jobTypes={jobTypes}
                experienceLevels={experienceLevels}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block">
            <FilterPanel
              categories={categories}
              jobTypes={jobTypes}
              experienceLevels={experienceLevels}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            {jobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onSave={() => handleSaveJob(job.id)}
                isSaved={savedJobs.includes(job.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

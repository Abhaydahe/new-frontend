"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard';
import { ProfileCard } from '@/components/ProfileCard';
import { FilterPanel } from '@/components/FilterPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Project, Profile } from '@/lib/supabase';

const categories = [
  { label: '3D Visualization', value: '3d-viz' },
  { label: 'Architectural Drafting', value: 'drafting' },
  { label: 'Interior Design', value: 'interior' },
  { label: 'Structural Design', value: 'structural' },
  { label: 'BIM Modeling', value: 'bim' },
];

const budgetTypes = [
  { label: 'Fixed Price', value: 'fixed' },
  { label: 'Hourly Rate', value: 'hourly' },
];

const experienceLevels = [
  { label: 'Entry Level', value: 'entry' },
  { label: 'Intermediate', value: 'mid' },
  { label: 'Expert', value: 'senior' },
];

const dummyProjects: Project[] = [
  {
    id: '1',
    client_id: '1',
    title: 'Residential Building 3D Visualization',
    description: 'Need photorealistic exterior and interior renders for a luxury residential project. Looking for someone with strong portfolio in architectural visualization.',
    category: '3D Visualization',
    budget_type: 'fixed',
    budget_min: 50000,
    budget_max: 80000,
    duration: '2-3 weeks',
    skills: ['3ds Max', 'V-Ray', 'Photoshop', 'Corona Renderer'],
    status: 'open',
    views: 234,
    proposals_count: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    client_id: '2',
    title: 'Commercial Complex CAD Drawings',
    description: 'Require detailed architectural drawings for a commercial complex project. Must have experience with large-scale projects.',
    category: 'Architectural Drafting',
    budget_type: 'hourly',
    budget_min: 1500,
    budget_max: 2500,
    duration: '1 month',
    skills: ['AutoCAD', 'Revit', 'Technical Drawing'],
    status: 'open',
    views: 189,
    proposals_count: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    client_id: '3',
    title: 'Restaurant Interior Design',
    description: 'Looking for creative interior designer for a modern restaurant. Need complete design package including 3D visualization.',
    category: 'Interior Design',
    budget_type: 'fixed',
    budget_min: 75000,
    budget_max: 120000,
    duration: '3-4 weeks',
    skills: ['SketchUp', '3ds Max', 'AutoCAD', 'V-Ray'],
    status: 'open',
    views: 312,
    proposals_count: 24,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    client_id: '4',
    title: 'BIM Modeling for Office Building',
    description: 'Need experienced BIM specialist to create detailed building information model for 5-story office building.',
    category: 'BIM Modeling',
    budget_type: 'hourly',
    budget_min: 2000,
    budget_max: 3000,
    duration: '6-8 weeks',
    skills: ['Revit', 'BIM 360', 'Navisworks', 'AutoCAD'],
    status: 'open',
    views: 156,
    proposals_count: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const topFreelancers: Profile[] = [
  {
    id: '1',
    full_name: 'Priya Sharma',
    email: 'priya@example.com',
    avatar_url: '',
    bio: 'Expert 3D Visualization Artist specializing in photorealistic architectural renders. 8+ years of experience.',
    skills: ['3ds Max', 'V-Ray', 'Corona', 'Photoshop', 'After Effects'],
    hourly_rate: 2500,
    experience_level: 'senior',
    location: 'Mumbai, India',
    user_type: 'freelancer',
    rating: 4.9,
    completed_projects: 127,
    verification_status: 'verified',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    full_name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    avatar_url: '',
    bio: 'Senior Architect with expertise in Revit and BIM. Specialized in commercial and residential projects.',
    skills: ['Revit', 'AutoCAD', 'BIM', 'SketchUp', 'Lumion'],
    hourly_rate: 3000,
    experience_level: 'senior',
    location: 'Bangalore, India',
    user_type: 'freelancer',
    rating: 4.8,
    completed_projects: 89,
    verification_status: 'verified',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    full_name: 'Anita Desai',
    email: 'anita@example.com',
    avatar_url: '',
    bio: 'Creative Interior Designer with a passion for modern and minimalist designs. Portfolio includes residential and commercial projects.',
    skills: ['SketchUp', 'AutoCAD', '3ds Max', 'Photoshop', 'InDesign'],
    hourly_rate: 2000,
    experience_level: 'mid',
    location: 'Delhi, India',
    user_type: 'freelancer',
    rating: 4.7,
    completed_projects: 64,
    verification_status: 'verified',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function FreelancersPage() {
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [proposalText, setProposalText] = useState('');
  const [proposalBudget, setProposalBudget] = useState('');
  const [proposalDelivery, setProposalDelivery] = useState('');
  const { toast } = useToast();

  const handleSearch = () => {
    let filtered = dummyProjects;

    if (searchKeyword) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        project.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    }

    setProjects(filtered);
  };

  const handleSendProposal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleSubmitProposal = () => {
    toast({
      title: 'Proposal submitted!',
      description: 'Your proposal has been sent to the client.',
    });
    setSelectedProject(null);
    setProposalText('');
    setProposalBudget('');
    setProposalDelivery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Hire the Best Freelancers in Design, Drafting & Visualization
            </h1>
            <p className="text-lg text-white/90">
              Connect with talented professionals for your AEC projects
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by skills, tools, or keywords"
                    className="pl-10 h-12 border-0 focus-visible:ring-0"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button
                  className="h-12 bg-[#00ADB5] hover:bg-[#00ADB5]/90 px-8"
                  onClick={handleSearch}
                >
                  Search Projects
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="freelancers">Top Freelancers</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#222831]">
                {projects.length} Projects Available
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
                    budgetTypes={budgetTypes}
                    experienceLevels={experienceLevels}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="hidden lg:block">
                <FilterPanel
                  categories={categories}
                  budgetTypes={budgetTypes}
                  experienceLevels={experienceLevels}
                />
              </div>

              <div className="lg:col-span-3 space-y-4">
                {projects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onPropose={() => handleSendProposal(project)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="freelancers">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#222831]">
                  Top Rated Freelancers
                </h2>
                <Button variant="outline" className="border-[#00ADB5] text-[#00ADB5]">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Smart Match
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topFreelancers.map(freelancer => (
                  <ProfileCard
                    key={freelancer.id}
                    profile={freelancer}
                    onHire={() => toast({
                      title: 'Hire Request Sent',
                      description: `Your hire request has been sent to ${freelancer.full_name}`,
                    })}
                    onMessage={() => toast({
                      title: 'Message Sent',
                      description: 'Chat feature coming soon!',
                    })}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Send Proposal</DialogTitle>
            {selectedProject && (
              <p className="text-sm text-gray-600 mt-2">{selectedProject.title}</p>
            )}
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Your Proposed Budget (₹)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="50000"
                value={proposalBudget}
                onChange={(e) => setProposalBudget(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery">Delivery Time</Label>
              <Input
                id="delivery"
                placeholder="e.g., 2 weeks"
                value={proposalDelivery}
                onChange={(e) => setProposalDelivery(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposal">Cover Letter</Label>
              <Textarea
                id="proposal"
                placeholder="Explain why you're the best fit for this project..."
                rows={8}
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-[#00ADB5] text-[#00ADB5]"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Generate Proposal
              </Button>
              <Button
                className="flex-1 bg-[#00ADB5] hover:bg-[#00ADB5]/90"
                onClick={handleSubmitProposal}
              >
                Submit Proposal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

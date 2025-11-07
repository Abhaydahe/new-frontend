import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, Eye, FileText } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/lib/supabase';

interface ProjectCardProps {
  project: Project;
  onPropose?: () => void;
}

export function ProjectCard({ project, onPropose }: ProjectCardProps) {
  const formatBudget = (min: number, max: number, type: string) => {
    if (type === 'hourly') {
      return `₹${min}-${max}/hr`;
    }
    return `₹${(min / 1000).toFixed(0)}k - ₹${(max / 1000).toFixed(0)}k`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-[#00ADB5]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 text-[#222831]">
              <Link href={`/freelancers/${project.id}`} className="hover:text-[#00ADB5] transition-colors">
                {project.title}
              </Link>
            </CardTitle>
            <Badge variant="secondary" className="bg-[#EEEEEE] text-[#222831]">
              {project.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-[#393E46] line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 items-center text-sm text-[#393E46]">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">
                {formatBudget(project.budget_min, project.budget_max, project.budget_type)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>{project.proposals_count} proposals</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{project.views} views</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline" className="border-[#00ADB5] text-[#00ADB5]">
                {skill}
              </Badge>
            ))}
            {project.skills.length > 4 && (
              <Badge variant="outline" className="border-gray-300">
                +{project.skills.length - 4} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="text-xs text-gray-500">
              Posted {new Date(project.created_at).toLocaleDateString()}
            </span>
            <Button
              className="bg-[#00ADB5] hover:bg-[#00ADB5]/90"
              onClick={onPropose}
            >
              Send Proposal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

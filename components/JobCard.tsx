import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, DollarSign, Clock, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Job } from '@/lib/supabase';

interface JobCardProps {
  job: Job;
  onSave?: () => void;
  isSaved?: boolean;
}

export function JobCard({ job, onSave, isSaved = false }: JobCardProps) {
  const formatSalary = (min: number, max: number) => {
    if (min && max) {
      return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
    }
    return 'Negotiable';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-[#00ADB5]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 text-[#222831]">
              <Link href={`/jobs/${job.id}`} className="hover:text-[#00ADB5] transition-colors">
                {job.title}
              </Link>
            </CardTitle>
            <p className="text-[#393E46] font-medium">{job.company_name}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            className={isSaved ? 'text-[#00ADB5]' : 'text-gray-400'}
          >
            <Bookmark className={isSaved ? 'fill-current' : ''} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center text-sm text-[#393E46]">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>{job.job_type}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{formatSalary(job.salary_min, job.salary_max)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{job.experience_level}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-[#EEEEEE] text-[#222831]">
              {job.category}
            </Badge>
            {job.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="border-[#00ADB5] text-[#00ADB5]">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 3 && (
              <Badge variant="outline" className="border-gray-300">
                +{job.skills.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="text-sm text-gray-500">
              {job.applicants_count} applicants
            </span>
            <Link href={`/jobs/${job.id}`}>
              <Button className="bg-[#00ADB5] hover:bg-[#00ADB5]/90">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

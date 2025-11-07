import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Briefcase, CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Profile } from '@/lib/supabase';

interface ProfileCardProps {
  profile: Profile;
  onHire?: () => void;
  onMessage?: () => void;
}

export function ProfileCard({ profile, onHire, onMessage }: ProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-[#00ADB5]">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
            <AvatarFallback className="bg-[#00ADB5] text-white text-2xl">
              {getInitials(profile.full_name)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2 w-full">
            <div className="flex items-center justify-center gap-2">
              <Link
                href={`/freelancers/profile/${profile.id}`}
                className="text-xl font-semibold text-[#222831] hover:text-[#00ADB5] transition-colors"
              >
                {profile.full_name}
              </Link>
              {profile.verification_status === 'verified' && (
                <CheckCircle2 className="w-5 h-5 text-[#00ADB5]" />
              )}
            </div>

            <div className="flex items-center justify-center gap-1 text-sm text-[#393E46]">
              {profile.rating > 0 && (
                <>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{profile.rating.toFixed(1)}</span>
                  <span className="text-gray-500">
                    ({profile.completed_projects} projects)
                  </span>
                </>
              )}
            </div>

            {profile.location && (
              <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            )}

            {profile.hourly_rate && (
              <p className="text-lg font-semibold text-[#00ADB5]">
                ₹{profile.hourly_rate}/hr
              </p>
            )}

            {profile.experience_level && (
              <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span className="capitalize">{profile.experience_level}</span>
              </div>
            )}
          </div>

          {profile.bio && (
            <p className="text-sm text-[#393E46] line-clamp-3">
              {profile.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-2 justify-center">
            {profile.skills.slice(0, 5).map((skill, index) => (
              <Badge key={index} variant="outline" className="border-[#00ADB5] text-[#00ADB5]">
                {skill}
              </Badge>
            ))}
            {profile.skills.length > 5 && (
              <Badge variant="outline" className="border-gray-300">
                +{profile.skills.length - 5}
              </Badge>
            )}
          </div>

          <div className="flex gap-2 w-full pt-2">
            <Button
              className="flex-1 bg-[#00ADB5] hover:bg-[#00ADB5]/90"
              onClick={onHire}
            >
              Hire
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5] hover:text-white"
              onClick={onMessage}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

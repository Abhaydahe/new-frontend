import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, UserCircle, Building2 } from 'lucide-react';
import Link from 'next/link';

const dashboards = [
  {
    title: 'Job Seeker',
    description: 'Find jobs, track applications, and grow your career',
    icon: UserCircle,
    href: '/dashboard/jobseeker',
    color: 'bg-blue-500',
  },
  {
    title: 'Employer',
    description: 'Post jobs, manage applications, and hire talent',
    icon: Building2,
    href: '/dashboard/employer',
    color: 'bg-green-500',
  },
  {
    title: 'Freelancer',
    description: 'Find projects, submit proposals, and earn money',
    icon: Briefcase,
    href: '/dashboard/freelancer',
    color: 'bg-purple-500',
  },
  {
    title: 'Client',
    description: 'Post projects, hire freelancers, and manage work',
    icon: Users,
    href: '/dashboard/client',
    color: 'bg-orange-500',
  },
];

export default function DashboardSelector() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#222831] mb-4">
            Select Your Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Choose the dashboard that matches your role
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {dashboards.map((dashboard) => (
            <Card key={dashboard.title} className="border-2 hover:border-[#00ADB5] transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${dashboard.color} rounded-2xl flex items-center justify-center`}>
                    <dashboard.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-[#222831]">{dashboard.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  {dashboard.description}
                </p>
                <Link href={dashboard.href}>
                  <Button className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90">
                    Go to {dashboard.title} Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

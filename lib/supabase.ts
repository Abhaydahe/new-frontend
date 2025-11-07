import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Job = {
  id: string;
  employer_id: string;
  title: string;
  company_name: string;
  description: string;
  requirements: string[];
  category: string;
  job_type: string;
  experience_level: string;
  salary_min: number;
  salary_max: number;
  location: string;
  skills: string[];
  status: string;
  views: number;
  applicants_count: number;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category: string;
  budget_type: string;
  budget_min: number;
  budget_max: number;
  duration: string;
  skills: string[];
  status: string;
  views: number;
  proposals_count: number;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  skills: string[];
  hourly_rate?: number;
  experience_level?: string;
  location?: string;
  user_type: string;
  rating: number;
  completed_projects: number;
  verification_status: string;
  created_at: string;
  updated_at: string;
};

export type JobApplication = {
  id: string;
  job_id: string;
  applicant_id: string;
  cover_letter?: string;
  resume_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Proposal = {
  id: string;
  project_id: string;
  freelancer_id: string;
  cover_letter: string;
  proposed_budget: number;
  delivery_time: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  is_read: boolean;
  created_at: string;
};

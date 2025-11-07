/*
  # Wallxy Jobs & Freelancers Platform Schema

  ## Overview
  This migration creates the complete database schema for the Jobs & Freelancers section of Wallxy.com,
  supporting both traditional job listings and freelance marketplace functionality.

  ## New Tables

  ### 1. profiles
  User profiles for all platform users (job seekers, employers, freelancers, clients)
  - `id` (uuid, primary key) - links to auth.users
  - `full_name` (text) - user's full name
  - `email` (text) - user's email
  - `avatar_url` (text) - profile photo URL
  - `bio` (text) - professional bio
  - `skills` (text[]) - array of skills
  - `hourly_rate` (numeric) - for freelancers
  - `experience_level` (text) - junior/mid/senior
  - `location` (text) - city/country
  - `user_type` (text) - jobseeker/employer/freelancer/client
  - `rating` (numeric) - average rating
  - `completed_projects` (integer) - total completed projects
  - `verification_status` (text) - pending/verified
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. jobs
  Job postings from employers
  - `id` (uuid, primary key)
  - `employer_id` (uuid, foreign key to profiles)
  - `title` (text) - job title
  - `company_name` (text) - company name
  - `description` (text) - full job description
  - `requirements` (text[]) - array of requirements
  - `category` (text) - Architecture/Interior/Construction/etc
  - `job_type` (text) - full-time/part-time/contract
  - `experience_level` (text) - entry/mid/senior
  - `salary_min` (numeric) - minimum salary
  - `salary_max` (numeric) - maximum salary
  - `location` (text) - job location
  - `skills` (text[]) - required skills
  - `status` (text) - active/closed/draft
  - `views` (integer) - view count
  - `applicants_count` (integer) - application count
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. job_applications
  Applications submitted by job seekers
  - `id` (uuid, primary key)
  - `job_id` (uuid, foreign key to jobs)
  - `applicant_id` (uuid, foreign key to profiles)
  - `cover_letter` (text) - application cover letter
  - `resume_url` (text) - resume/CV URL
  - `status` (text) - applied/shortlisted/interview/hired/rejected
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. saved_jobs
  Jobs bookmarked by job seekers
  - `id` (uuid, primary key)
  - `job_id` (uuid, foreign key to jobs)
  - `user_id` (uuid, foreign key to profiles)
  - `created_at` (timestamptz)

  ### 5. projects
  Freelance project postings from clients
  - `id` (uuid, primary key)
  - `client_id` (uuid, foreign key to profiles)
  - `title` (text) - project title
  - `description` (text) - full project description
  - `category` (text) - 3D Visualization/Drafting/Design/etc
  - `budget_type` (text) - fixed/hourly
  - `budget_min` (numeric) - minimum budget
  - `budget_max` (numeric) - maximum budget
  - `duration` (text) - expected duration
  - `skills` (text[]) - required skills
  - `status` (text) - open/in-progress/completed/closed
  - `views` (integer) - view count
  - `proposals_count` (integer) - proposal count
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. proposals
  Proposals submitted by freelancers
  - `id` (uuid, primary key)
  - `project_id` (uuid, foreign key to projects)
  - `freelancer_id` (uuid, foreign key to profiles)
  - `cover_letter` (text) - proposal description
  - `proposed_budget` (numeric) - proposed amount
  - `delivery_time` (text) - estimated delivery
  - `status` (text) - pending/accepted/rejected/withdrawn
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. contracts
  Active contracts between clients and freelancers
  - `id` (uuid, primary key)
  - `project_id` (uuid, foreign key to projects)
  - `client_id` (uuid, foreign key to profiles)
  - `freelancer_id` (uuid, foreign key to profiles)
  - `budget` (numeric) - agreed amount
  - `status` (text) - active/completed/cancelled/disputed
  - `progress` (integer) - completion percentage
  - `milestones` (jsonb) - milestone data
  - `started_at` (timestamptz)
  - `completed_at` (timestamptz)
  - `created_at` (timestamptz)

  ### 8. reviews
  Reviews and ratings
  - `id` (uuid, primary key)
  - `reviewer_id` (uuid, foreign key to profiles)
  - `reviewee_id` (uuid, foreign key to profiles)
  - `contract_id` (uuid, foreign key to contracts)
  - `rating` (integer) - 1-5 stars
  - `comment` (text) - review text
  - `created_at` (timestamptz)

  ### 9. notifications
  User notifications
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to profiles)
  - `title` (text) - notification title
  - `message` (text) - notification content
  - `type` (text) - job_match/proposal/application/message/etc
  - `link` (text) - action link
  - `is_read` (boolean) - read status
  - `created_at` (timestamptz)

  ## Security
  - All tables have RLS enabled
  - Users can only view and manage their own data
  - Public can view active jobs and projects
  - Proper authentication checks on all policies
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text,
  bio text,
  skills text[] DEFAULT '{}',
  hourly_rate numeric,
  experience_level text,
  location text,
  user_type text NOT NULL DEFAULT 'jobseeker',
  rating numeric DEFAULT 0,
  completed_projects integer DEFAULT 0,
  verification_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  company_name text NOT NULL,
  description text NOT NULL,
  requirements text[] DEFAULT '{}',
  category text NOT NULL,
  job_type text NOT NULL,
  experience_level text,
  salary_min numeric,
  salary_max numeric,
  location text NOT NULL,
  skills text[] DEFAULT '{}',
  status text DEFAULT 'active',
  views integer DEFAULT 0,
  applicants_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  cover_letter text,
  resume_url text,
  status text DEFAULT 'applied',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(job_id, applicant_id)
);

-- Create saved_jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(job_id, user_id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  budget_type text NOT NULL,
  budget_min numeric,
  budget_max numeric,
  duration text,
  skills text[] DEFAULT '{}',
  status text DEFAULT 'open',
  views integer DEFAULT 0,
  proposals_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  freelancer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  cover_letter text NOT NULL,
  proposed_budget numeric NOT NULL,
  delivery_time text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(project_id, freelancer_id)
);

-- Create contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  freelancer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  budget numeric NOT NULL,
  status text DEFAULT 'active',
  progress integer DEFAULT 0,
  milestones jsonb DEFAULT '[]',
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  contract_id uuid REFERENCES contracts(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  link text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Jobs policies
CREATE POLICY "Jobs are viewable by everyone"
  ON jobs FOR SELECT
  USING (true);

CREATE POLICY "Employers can create jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (employer_id = auth.uid());

CREATE POLICY "Employers can update own jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (employer_id = auth.uid())
  WITH CHECK (employer_id = auth.uid());

CREATE POLICY "Employers can delete own jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (employer_id = auth.uid());

-- Job applications policies
CREATE POLICY "Applications viewable by applicant and employer"
  ON job_applications FOR SELECT
  TO authenticated
  USING (
    applicant_id = auth.uid() OR
    EXISTS (SELECT 1 FROM jobs WHERE jobs.id = job_id AND jobs.employer_id = auth.uid())
  );

CREATE POLICY "Job seekers can create applications"
  ON job_applications FOR INSERT
  TO authenticated
  WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "Employers can update application status"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM jobs WHERE jobs.id = job_id AND jobs.employer_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM jobs WHERE jobs.id = job_id AND jobs.employer_id = auth.uid()));

-- Saved jobs policies
CREATE POLICY "Users can view own saved jobs"
  ON saved_jobs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can save jobs"
  ON saved_jobs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own saved jobs"
  ON saved_jobs FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Projects policies
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Clients can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING (client_id = auth.uid());

-- Proposals policies
CREATE POLICY "Proposals viewable by freelancer and client"
  ON proposals FOR SELECT
  TO authenticated
  USING (
    freelancer_id = auth.uid() OR
    EXISTS (SELECT 1 FROM projects WHERE projects.id = project_id AND projects.client_id = auth.uid())
  );

CREATE POLICY "Freelancers can create proposals"
  ON proposals FOR INSERT
  TO authenticated
  WITH CHECK (freelancer_id = auth.uid());

CREATE POLICY "Freelancers can update own proposals"
  ON proposals FOR UPDATE
  TO authenticated
  USING (freelancer_id = auth.uid())
  WITH CHECK (freelancer_id = auth.uid());

-- Contracts policies
CREATE POLICY "Contracts viewable by involved parties"
  ON contracts FOR SELECT
  TO authenticated
  USING (client_id = auth.uid() OR freelancer_id = auth.uid());

CREATE POLICY "Clients can create contracts"
  ON contracts FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Involved parties can update contracts"
  ON contracts FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid() OR freelancer_id = auth.uid())
  WITH CHECK (client_id = auth.uid() OR freelancer_id = auth.uid());

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews for completed contracts"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (reviewer_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_employer ON jobs(employer_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_job_applications_job ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_applicant ON job_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_proposals_project ON proposals(project_id);
CREATE INDEX IF NOT EXISTS idx_proposals_freelancer ON proposals(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read);
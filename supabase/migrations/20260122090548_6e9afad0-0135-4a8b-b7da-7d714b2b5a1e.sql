-- Create job_postings table
CREATE TABLE public.job_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  responsibilities TEXT NOT NULL,
  salary_range TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_posting_id UUID NOT NULL REFERENCES public.job_postings(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  portfolio_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for job_postings (public read for active jobs)
CREATE POLICY "Anyone can view active job postings"
ON public.job_postings
FOR SELECT
USING (is_active = true);

-- RLS policies for job_applications (public insert, admin read)
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all applications"
ON public.job_applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update applications"
ON public.job_applications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at on job_postings
CREATE TRIGGER update_job_postings_updated_at
BEFORE UPDATE ON public.job_postings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create resumes storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true);

-- Storage policies for resumes bucket
CREATE POLICY "Anyone can upload resumes"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Anyone can view resumes"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resumes');

-- Insert sample job postings
INSERT INTO public.job_postings (title, department, location, type, description, requirements, responsibilities, salary_range)
VALUES 
(
  'Frontend Developer',
  'Engineering',
  'Remote',
  'Full-time',
  'We are looking for a skilled Frontend Developer to join our engineering team. You will be responsible for building and maintaining user interfaces for our web applications using modern technologies.',
  '• 2+ years of experience with React.js\n• Strong proficiency in TypeScript\n• Experience with Tailwind CSS or similar\n• Familiarity with REST APIs and state management\n• Good understanding of responsive design',
  '• Develop and maintain frontend applications\n• Collaborate with designers and backend developers\n• Write clean, maintainable code\n• Participate in code reviews\n• Optimize applications for performance',
  '৳40,000 - ৳60,000/month'
),
(
  'UI/UX Designer',
  'Design',
  'Dhaka, Bangladesh',
  'Full-time',
  'Join our creative team as a UI/UX Designer. You will be crafting beautiful and intuitive user experiences for our clients across web and mobile platforms.',
  '• 2+ years of UI/UX design experience\n• Proficiency in Figma or Adobe XD\n• Strong portfolio demonstrating design skills\n• Understanding of user-centered design principles\n• Basic knowledge of HTML/CSS is a plus',
  '• Create wireframes, prototypes, and high-fidelity designs\n• Conduct user research and usability testing\n• Collaborate with developers to ensure design implementation\n• Maintain design systems and style guides\n• Present design concepts to stakeholders',
  '৳35,000 - ৳50,000/month'
),
(
  'Video Editor',
  'Creative',
  'Remote',
  'Contract',
  'We are seeking a talented Video Editor to create engaging content for our clients. This is a contract position with flexible hours.',
  '• 1+ years of video editing experience\n• Proficiency in Adobe Premiere Pro or DaVinci Resolve\n• Experience with motion graphics (After Effects) is a plus\n• Strong storytelling and visual composition skills\n• Reliable internet connection for remote work',
  '• Edit promotional videos and social media content\n• Add graphics, transitions, and effects\n• Color correction and audio mixing\n• Deliver projects on time and within specifications\n• Collaborate with the creative team on concepts',
  'Project-based'
);
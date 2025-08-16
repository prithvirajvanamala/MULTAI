export type Job = {
  id: string;
  title: string;
  department?: string | null;
  location?: string | null; // "City, Country"
  work_mode?: "Remote" | "Hybrid" | "On-site" | null;
  type?: "Full-time" | "Part-time" | "Contract" | "Internship" | null;
  experience?: "Junior" | "Mid" | "Senior" | "Lead" | null;
  salary_from?: number | null;
  salary_to?: number | null;
  currency?: string | null;
  tags?: string[] | null;
  posted_at: string; // ISO
  description?: string | null;
};

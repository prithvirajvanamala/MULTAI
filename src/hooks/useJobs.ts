"use client";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import type { Job } from "@/types/job";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabaseClient();
    if (!sb) {
      setLoading(false);
      setError("Supabase is not configured (.env.local).");
      return;
    }

    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await sb
        .from("jobs")
        .select("id,title,department,location,work_mode,type,experience,salary_from,salary_to,currency,tags,posted_at,description")
        .order("posted_at", { ascending: false });

      if (error) {
        setError(error.message);
        setJobs([]);
      } else {
        setJobs((data ?? []) as Job[]);
      }
      setLoading(false);
    })();
  }, []);

  return { jobs, loading, error };
}

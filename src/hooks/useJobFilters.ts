"use client";
import { useMemo, useState } from "react";
import type { Job } from "@/types/job";
import { norm, uniq } from "@/utils/format";

type SortBy = "newest" | "salary" | "title";

export function useJobFilters(jobs: Job[]) {
  const [q, setQ] = useState("");
  const [selDepartments, setSelDepartments] = useState<string[]>([]);
  const [selLocations, setSelLocations] = useState<string[]>([]);
  const [selTypes, setSelTypes] = useState<NonNullable<Job["type"]>[]>([]);
  const [selModes, setSelModes] = useState<NonNullable<Job["work_mode"]>[]>([]);
  const [selExperiences, setSelExperiences] = useState<NonNullable<Job["experience"]>[]>([]);
  const [minSalary, setMinSalary] = useState<number>(0);
  const [selTags, setSelTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const departments = useMemo(() => uniq(jobs.map((j) => j.department)), [jobs]);
  const locations = useMemo(() => uniq(jobs.map((j) => j.location)), [jobs]);
  const jobTypes: NonNullable<Job["type"]>[] = ["Full-time", "Part-time", "Contract", "Internship"];
  const workModes: NonNullable<Job["work_mode"]>[] = ["Remote", "Hybrid", "On-site"];
  const experiences: NonNullable<Job["experience"]>[] = ["Junior", "Mid", "Senior", "Lead"];
  const allTags = useMemo(() => uniq(jobs.flatMap((j) => j.tags ?? [])), [jobs]);

  const maxSalary = useMemo(() => {
    const vals = jobs.flatMap((j) => [j.salary_to ?? 0, j.salary_from ?? 0]);
    return Math.max(0, ...vals);
  }, [jobs]);

  const filtered = useMemo(() => {
    const nq = norm(q);
    let list = jobs.filter((j) => {
      const title = norm(j.title);
      const dept = norm(j.department);
      const loc = norm(j.location);
      const desc = norm(j.description);
      const tags = (j.tags ?? []).map(norm);

      const matchesSearch = !nq || title.includes(nq) || dept.includes(nq) || desc.includes(nq) || tags.some((t) => t.includes(nq));
      const matchesDept = selDepartments.length === 0 || selDepartments.includes(j.department ?? "");
      const matchesLoc = selLocations.length === 0 || selLocations.includes(j.location ?? "");
      const matchesType = selTypes.length === 0 || selTypes.includes((j.type ?? "") as any);
      const matchesMode = selModes.length === 0 || selModes.includes((j.work_mode ?? "") as any);
      const matchesExp = selExperiences.length === 0 || selExperiences.includes((j.experience ?? "") as any);
      const upper = j.salary_to ?? j.salary_from ?? 0;
      const matchesSalary = minSalary === 0 ? true : upper >= minSalary;
      const matchesTags = selTags.length === 0 || selTags.every((t) => (j.tags ?? []).includes(t));

      return matchesSearch && matchesDept && matchesLoc && matchesType && matchesMode && matchesExp && matchesSalary && matchesTags;
    });

    if (sortBy === "newest") list = list.slice().sort((a, b) => (Date.parse(b.posted_at) || 0) - (Date.parse(a.posted_at) || 0));
    if (sortBy === "salary") {
      const top = (j: Job) => j.salary_to ?? j.salary_from ?? 0;
      list = list.slice().sort((a, b) => top(b) - top(a));
    }
    if (sortBy === "title") list = list.slice().sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [jobs, q, selDepartments, selLocations, selTypes, selModes, selExperiences, minSalary, selTags, sortBy]);

  const toggle = <T,>(v: T, list: T[], set: (x: T[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const clearAll = () => {
    setQ(""); setSelDepartments([]); setSelLocations([]); setSelTypes([]);
    setSelModes([]); setSelExperiences([]); setMinSalary(0); setSelTags([]); setSortBy("newest");
  };

  return {
    q, setQ, selDepartments, setSelDepartments, selLocations, setSelLocations,
    selTypes, setSelTypes, selModes, setSelModes, selExperiences, setSelExperiences,
    minSalary, setMinSalary, selTags, setSelTags, sortBy, setSortBy, showFilters, setShowFilters,
    departments, locations, jobTypes, workModes, experiences, allTags, maxSalary, filtered,
    toggle, clearAll,
  };
}

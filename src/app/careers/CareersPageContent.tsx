"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";

import { useJobs } from "@/hooks/useJobs";
import { useJobFilters } from "@/hooks/useJobFilters";
import { ApplyModal } from "@/components/careers/ApplyModal";
import type { Job } from "@/types/job";

import JobCard from "@/components/JobCard";
import Pill from "@/components/Pill";
import FilterGroup from "@/components/FilterGroup";
import { toCurrency } from "@/utils/format";

export default function CareersPageContent() {
  const { jobs, loading, error } = useJobs();
  const f = useJobFilters(jobs);
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  return (
    <section className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Careers at{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">MULTAI</span>
            </h1>
            <p className="mt-3 text-lg text-gray-700 max-w-3xl">
              Join a team that ships with quality, designs with taste, and moves with purpose.
            </p>
          </motion.div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={f.q}
                onChange={(e) => f.setQ(e.target.value)}
                placeholder="Search roles, skills, tags…"
                className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={f.sortBy}
                onChange={(e) => f.setSortBy(e.target.value as any)}
                className="rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="newest">Sort: Newest</option>
                <option value="salary">Sort: Salary (High → Low)</option>
                <option value="title">Sort: Title (A → Z)</option>
              </select>
              <button
                onClick={() => f.setShowFilters((s) => !s)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-sm outline-none hover:bg-gray-50 md:hidden"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              <button
                onClick={f.clearAll}
                className="hidden md:inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-sm outline-none hover:bg-gray-50"
                title="Clear all filters"
              >
                <X className="h-4 w-4" /> Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-8">
        {/* Sidebar Filters */}
        <aside className={`md:sticky md:top-4 h-max ${f.showFilters ? "" : "hidden md:block"}`}>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
              <button onClick={f.clearAll} className="text-xs text-gray-500 hover:text-gray-700">
                Reset
              </button>
            </div>

            <FilterGroup title="Department">
              <div className="flex flex-wrap gap-2">
                {f.departments.map((d) => (
                  <Pill
                    key={d}
                    active={f.selDepartments.includes(d)}
                    onClick={() => f.toggle(d, f.selDepartments, f.setSelDepartments)}
                    label={d}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Location">
              <div className="flex flex-wrap gap-2">
                {f.locations.map((loc) => (
                  <Pill
                    key={loc}
                    active={f.selLocations.includes(loc)}
                    onClick={() => f.toggle(loc, f.selLocations, f.setSelLocations)}
                    label={loc}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Job Type">
              <div className="flex flex-wrap gap-2">
                {f.jobTypes.map((t) => (
                  <Pill
                    key={t}
                    active={f.selTypes.includes(t)}
                    onClick={() => f.toggle(t, f.selTypes, f.setSelTypes)}
                    label={t}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Work Mode">
              <div className="flex flex-wrap gap-2">
                {f.workModes.map((m) => (
                  <Pill
                    key={m}
                    active={f.selModes.includes(m)}
                    onClick={() => f.toggle(m, f.selModes, f.setSelModes)}
                    label={m}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Experience">
              <div className="flex flex-wrap gap-2">
                {f.experiences.map((e) => (
                  <Pill
                    key={e}
                    active={f.selExperiences.includes(e)}
                    onClick={() => f.toggle(e, f.selExperiences, f.setSelExperiences)}
                    label={e}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Minimum Salary">
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={f.maxSalary || 100000}
                  step={1000}
                  value={f.minSalary}
                  onChange={(e) => f.setMinSalary(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-gray-600">From: {toCurrency(f.minSalary)}</div>
              </div>
            </FilterGroup>

            <FilterGroup title="Tags">
              <div className="flex flex-wrap gap-2">
                {f.allTags.map((t) => (
                  <Pill
                    key={t}
                    active={f.selTags.includes(t)}
                    onClick={() => f.toggle(t, f.selTags, f.setSelTags)}
                    label={t}
                  />
                ))}
              </div>
            </FilterGroup>

            <button
              onClick={() => f.setShowFilters(false)}
              className="mt-4 w-full md:hidden rounded-xl border border-gray-300 bg-white py-2.5 text-sm hover:bg-gray-50"
            >
              Done
            </button>
          </div>
        </aside>

        {/* Results */}
        <main>
          {loading ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
              Loading jobs…
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
              {error}
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{f.filtered.length}</span> role
                  {f.filtered.length === 1 ? "" : "s"}
                </p>
                <button
                  onClick={f.clearAll}
                  className="md:hidden inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white py-2 px-3 text-sm hover:bg-gray-50"
                  title="Clear all filters"
                >
                  <X className="h-4 w-4" /> Clear
                </button>
              </div>

              {f.filtered.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
                  No roles match those filters. Try removing a filter or broadening your search.
                </div>
              ) : (
                <ul className="grid gap-4">
                  {f.filtered.map((job) => (
                    <JobCard key={job.id} job={job} onApply={() => setApplyJob(job)} />
                  ))}
                </ul>
              )}
            </>
          )}
        </main>
      </div>

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </section>
  );
}
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client';

type Job = {
  id: number
  title: string
  role: string
  location: string
  experience: string
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [filters, setFilters] = useState({ role: '', location: '', experience: '' })


  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase.from('jobs').select('*')
      if (error) console.error('Error fetching jobs:', error)
      else {
        setJobs(data)
        setFilteredJobs(data)
      }
    }
    fetchJobs()
  }, [])

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    const filtered = jobs.filter(job => {
      return (
        (!newFilters.role || job.role.includes(newFilters.role)) &&
        (!newFilters.location || job.location.includes(newFilters.location)) &&
        (!newFilters.experience || job.experience.includes(newFilters.experience))
      )
    })
    setFilteredJobs(filtered)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Careers</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input type="text" placeholder="Role" className="border p-2" onChange={(e) => handleFilterChange('role', e.target.value)} />
        <input type="text" placeholder="Location" className="border p-2" onChange={(e) => handleFilterChange('location', e.target.value)} />
        <input type="text" placeholder="Experience" className="border p-2" onChange={(e) => handleFilterChange('experience', e.target.value)} />
      </div>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        filteredJobs.map(job => (
          <div key={job.id} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>Role: {job.role}</p>
            <p>Location: {job.location}</p>
            <p>Experience: {job.experience}</p>
            <Link href={`/careers/apply/${job.id}`}>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Apply Now</button>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

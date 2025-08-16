import { motion } from "framer-motion";
import { Clock, Briefcase, Building2, MapPin } from "lucide-react";
import { daysAgo, toCurrency } from "@/utils/format";
import type { Job } from "@/types/job";

function JobCard({ job, onApply }: { job: Job; onApply: () => void }) {
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease }}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-600">
            {job.department && (
              <span className="inline-flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" /> {job.department}
              </span>
            )}
            {job.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {job.location}
              </span>
            )}
            {(job.type || job.work_mode) && (
              <span className="inline-flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" /> {job.type ?? "—"} • {job.work_mode ?? "—"}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {daysAgo(job.posted_at)}
            </span>
          </div>
        </div>
        <div className="text-right">
          {(job.salary_from || job.salary_to) ? (
            <>
              <div className="text-sm font-semibold text-gray-900">
                {job.salary_from ? toCurrency(job.salary_from, job.currency || "GBP") : "—"}{" "}
                – {job.salary_to ? toCurrency(job.salary_to, job.currency || "GBP") : "—"}
              </div>
              <div className="text-xs text-gray-500">per year</div>
            </>
          ) : (
            <div className="text-sm text-gray-500">Competitive</div>
          )}
        </div>
      </div>
      
      {job.description && <p className="mt-3 text-sm text-gray-700">{job.description}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        {(job.tags ?? []).map((t) => (
          <span key={t} className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={onApply}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"
        >
          Apply now
        </button>
        <a
          href={`/careers/${job.id}`}
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          View role
        </a>
      </div>
    </motion.li>
  );
}

export default JobCard;
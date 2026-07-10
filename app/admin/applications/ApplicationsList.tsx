'use client';

import { useTransition } from 'react';
import { approveApplicationAction, rejectApplicationAction } from './actions';

interface Application {
  id: number;
  full_name: string;
  why_hire_you: string;
  email: string;
  phone: string;
  motivation: string;
  interested_role: string;
  status: string;
  submitted_at: Date | null;
}

interface ApplicationsListProps {
  initialApplications: Application[];
}

export default function ApplicationsList({ initialApplications }: ApplicationsListProps) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = (id: number) => {
    startTransition(async () => {
      try {
        await approveApplicationAction(id);
      } catch (err: any) {
        alert(err.message || 'Failed to approve application.');
      }
    });
  };

  const handleReject = (id: number) => {
    startTransition(async () => {
      try {
        await rejectApplicationAction(id);
      } catch (err: any) {
        alert(err.message || 'Failed to reject application.');
      }
    });
  };

  const formatDate = (dateVal: any) => {
    if (!dateVal) return 'Unknown Date';
    return new Date(dateVal).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Loading state overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 px-4 py-2 rounded border border-[#d4af37]/30 text-[#d4af37] text-xs uppercase tracking-widest animate-pulse">
            Processing Application Decision...
          </div>
        </div>
      )}

      {initialApplications.length === 0 ? (
        <div className="border border-dashed border-[#d4af37]/15 bg-black/10 py-12 text-center rounded-lg text-gray-500 italic">
          The application queue is empty. No candidates awaiting review.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {initialApplications.map((app) => (
            <div
              key={app.id}
              className="border border-[#d4af37]/20 bg-black/40 rounded-lg p-6 flex flex-col justify-between hover:border-[#d4af37]/45 transition-colors shadow-lg"
            >
              <div>
                {/* Header info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b border-gray-900">
                  <div>
                    <h2 className="text-xl font-serif text-[#d4af37]" style={{ fontFamily: 'Cinzel, serif' }}>
                      {app.full_name}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 font-mono">
                      {app.email} · {app.phone}
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-[#d4af37]/10 text-[#d4af37] px-2.5 py-0.5 rounded border border-[#d4af37]/25 font-bold">
                      {app.interested_role}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      Filed: {formatDate(app.submitted_at)}
                    </span>
                  </div>
                </div>

                {/* Question Blocks */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-[#d4af37]/80 font-semibold font-mono mb-1">
                      Statement of Qualifications:
                    </h3>
                    <p className="text-sm text-gray-300 bg-black/20 p-3 rounded border border-gray-900 leading-relaxed italic">
                      "{app.why_hire_you}"
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-[#d4af37]/80 font-semibold font-mono mb-1">
                      Paranormal Motivation:
                    </h3>
                    <p className="text-sm text-gray-300 bg-black/20 p-3 rounded border border-gray-900 leading-relaxed italic">
                      "{app.motivation}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Action triggers */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-900/60">
                <button
                  disabled={isPending}
                  onClick={() => handleReject(app.id)}
                  className="px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold bg-red-950/20 hover:bg-red-900/25 border border-red-500/30 text-red-400 hover:text-red-300 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Reject & Purge
                </button>
                <button
                  disabled={isPending}
                  onClick={() => handleApprove(app.id)}
                  className="px-4 py-2 rounded text-xs uppercase tracking-wider font-bold bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/45 text-[#d4af37] transition-all cursor-pointer shadow shadow-[#d4af37]/5 disabled:opacity-50"
                >
                  Approve Enlistment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

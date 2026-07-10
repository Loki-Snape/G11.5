'use client';

import { useState, useTransition, useEffect } from 'react';
import {
  approveCaseAction,
  deleteCaseAction,
  updateCaseStatusAction,
  updateCaseFieldsAction,
} from './actions';

interface Case {
  id: number;
  tracking_number: string;
  status: string;
  description: string | null;
  created_by: string | null;
  created_at: Date | null;
  start_date: Date | null;
  end_date: Date | null;
  threat_rating: string | null;
  location: string | null;
  case_file_link: string | null;
}

interface CasesTableProps {
  initialCases: Case[];
}

export default function CasesTable({ initialCases }: CasesTableProps) {
  const [isPending, startTransition] = useTransition();
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [closeConfirmId, setCloseConfirmId] = useState<number | null>(null);

  // Inline edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editCaseFileLink, setEditCaseFileLink] = useState('');

  // Close modal selections
  const [closeResolution, setCloseResolution] = useState<'Solved' | 'Unsolved' | ''>('');
  const [closeThreatRating, setCloseThreatRating] = useState<string>('');

  useEffect(() => {
    setCases(initialCases);
  }, [initialCases]);

  const toInputDate = (dateVal: any) => {
    if (!dateVal) return '';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateVal: any) => {
    if (!dateVal) return '-';
    return new Date(dateVal).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getThreatBadge = (rating: string | null) => {
    const norm = (rating ?? '').toLowerCase();
    if (norm === 'critical' || norm === 'high') {
      return 'bg-rose-500/15 text-rose-400 border border-rose-500/30';
    }
    if (norm === 'medium') {
      return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
    }
    return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
  };

  const getStatusBadge = (status: string) => {
    const norm = status.toLowerCase();
    if (norm === 'active') {
      return 'bg-green-500/15 text-green-400 border border-green-500/30';
    }
    if (norm === 'solved') {
      return 'bg-blue-500/15 text-blue-400 border border-blue-500/30';
    }
    if (norm === 'unsolved') {
      return 'bg-purple-500/15 text-purple-400 border border-purple-500/30';
    }
    if (norm === 'review pending') {
      return 'bg-amber-500/15 text-amber-400 border border-amber-500/30 animate-pulse';
    }
    return 'bg-gray-500/15 text-gray-400 border border-gray-500/30';
  };

  const handleApprove = (id: number) => {
    startTransition(async () => {
      await approveCaseAction(id);
    });
  };

  const handleCloseCase = (id: number, resolution: 'Solved' | 'Unsolved', threatRating: string) => {
    setCloseConfirmId(null);
    startTransition(async () => {
      await updateCaseStatusAction(id, resolution, threatRating);
    });
  };

  const handleCloseTrigger = (c: Case) => {
    setCloseConfirmId(c.id);
    setCloseResolution('');
    setCloseThreatRating(c.threat_rating || '');
  };

  const handleDeleteTrigger = (id: number) => {
    setDeleteConfirmId(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId === null) return;
    const targetId = deleteConfirmId;
    setDeleteConfirmId(null);
    startTransition(async () => {
      await deleteCaseAction(targetId);
    });
  };

  const handleEditTrigger = (c: Case) => {
    setEditingId(c.id);
    setEditStartDate(toInputDate(c.start_date));
    setEditEndDate(toInputDate(c.end_date));
    setEditCaseFileLink(c.case_file_link || '');
  };

  const handleSaveFields = (id: number) => {
    setEditingId(null);
    startTransition(async () => {
      try {
        await updateCaseFieldsAction(id, {
          start_date: editStartDate || null,
          end_date: editEndDate || null,
          case_file_link: editCaseFileLink || null,
        });
      } catch (err: any) {
        alert(err.message || 'Failed to update case fields.');
      }
    });
  };

  const closeCaseObject = cases.find((c) => c.id === closeConfirmId);

  return (
    <div className="w-full">
      {/* Loading state overlay for transitions */}
      {isPending && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 px-4 py-2 rounded border border-[#d4af37]/30 text-[#d4af37] text-xs uppercase tracking-widest animate-pulse">
            Processing Transaction...
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-[#050505] border border-red-500/30 rounded-lg p-6 shadow-2xl shadow-red-500/5">
            <h3 className="font-serif text-lg text-red-400 uppercase tracking-wider mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
              Confirm Hard Deletion
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              WARNING: This operation will permanently excise this anomaly report from the agency files. This action is irreversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded text-xs uppercase tracking-wider bg-gray-900 border border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded text-xs uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close/Resolution Confirmation Modal */}
      {closeConfirmId !== null && closeCaseObject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-[#050505] border border-[#d4af37]/35 rounded-lg p-6 shadow-2xl shadow-[#d4af37]/5">
            <h3 className="font-serif text-lg text-[#d4af37] uppercase tracking-wider mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
              Resolve Case File
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Please specify the final outcome and threat assessment for Case Anomaly: <span className="font-mono text-[#d4af37]">{closeCaseObject.tracking_number}</span>.
            </p>

            <div className="space-y-4 mb-6">
              {/* Resolution Status Select */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                  Resolution Status *
                </label>
                <select
                  value={closeResolution}
                  onChange={(e) => setCloseResolution(e.target.value as 'Solved' | 'Unsolved')}
                  className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="">-- Choose Resolution --</option>
                  <option value="Solved">Solved (Mark as Solved)</option>
                  <option value="Unsolved">Unsolved (Mark as Unsolved)</option>
                </select>
              </div>

              {/* Threat Level Select */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                  Threat Level *
                </label>
                <select
                  value={closeThreatRating}
                  onChange={(e) => setCloseThreatRating(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="">-- Choose Threat Level --</option>
                  <option value="Not Paranormal">Not Paranormal</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Extreme">Extreme</option>
                  <option value="God Level Threat">God Level Threat</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setCloseConfirmId(null)}
                className="px-4 py-2 rounded text-xs uppercase tracking-wider bg-gray-900 border border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCloseCase(closeConfirmId, closeResolution as 'Solved' | 'Unsolved', closeThreatRating)}
                disabled={!closeResolution || !closeThreatRating}
                className={`px-4 py-2 rounded text-xs uppercase tracking-wider transition-colors cursor-pointer border ${
                  (!closeResolution || !closeThreatRating)
                    ? 'bg-gray-950 border-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border-[#d4af37]/35 text-[#d4af37]'
                }`}
              >
                Confirm Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-[#d4af37]/15 bg-black/20">
        <table className="min-w-full divide-y divide-[#d4af37]/15 text-left text-sm">
          <thead className="bg-[#0c0c0c] text-xs uppercase tracking-widest text-[#d4af37]/90 font-mono">
            <tr>
              <th className="px-6 py-4">Tracking Code</th>
              <th className="px-6 py-4">File Creator</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Threat</th>
              <th className="px-6 py-4">Start Date</th>
              <th className="px-6 py-4">End Date</th>
              <th className="px-6 py-4">Case File Link</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900/60 bg-black/10">
            {cases.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-10 text-center text-gray-500 italic">
                  No active or pending cases documented.
                </td>
              </tr>
            ) : (
              cases.map((c) => {
                const isEditing = editingId === c.id;
                return (
                  <tr key={c.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[#d4af37] font-semibold">
                      {c.tracking_number}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {c.created_by || 'Field Report'}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {c.location || 'Unknown'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {c.threat_rating ? (
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${getThreatBadge(c.threat_rating)}`}>
                          {c.threat_rating}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {isEditing ? (
                        <input
                          type="date"
                          value={editStartDate}
                          onChange={(e) => setEditStartDate(e.target.value)}
                          className="bg-gray-950 border border-[#d4af37]/20 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                        />
                      ) : (
                        formatDate(c.start_date)
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {isEditing ? (
                        <input
                          type="date"
                          value={editEndDate}
                          onChange={(e) => setEditEndDate(e.target.value)}
                          className="bg-gray-950 border border-[#d4af37]/20 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                        />
                      ) : (
                        formatDate(c.end_date)
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editCaseFileLink}
                          onChange={(e) => setEditCaseFileLink(e.target.value)}
                          placeholder="https://..."
                          className="bg-gray-950 border border-[#d4af37]/20 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37] w-36"
                        />
                      ) : c.case_file_link ? (
                        <a
                          href={c.case_file_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#d4af37] hover:underline font-semibold"
                        >
                          Link
                        </a>
                      ) : (
                        <span className="text-gray-600">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSaveFields(c.id)}
                            className="px-3 py-1 bg-emerald-950/20 hover:bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-400 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          {c.status === 'Review Pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(c.id)}
                                className="px-3 py-1 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/35 text-[#d4af37] text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleDeleteTrigger(c.id)}
                                className="px-3 py-1 bg-red-950/20 hover:bg-red-900/20 border border-red-500/30 text-red-400 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {c.status === 'Active' && (
                            <>
                              <button
                                onClick={() => handleEditTrigger(c)}
                                className="px-3 py-1 bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-300 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleCloseTrigger(c)}
                                className="px-3 py-1 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/35 text-[#d4af37] text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                              >
                                Close
                              </button>
                              <button
                                onClick={() => handleDeleteTrigger(c.id)}
                                className="px-3 py-1 bg-red-950/25 hover:bg-red-950/40 border border-red-500/30 text-red-400 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </>
                          )}

                          {c.status !== 'Review Pending' && c.status !== 'Active' && (
                            <>
                              <button
                                onClick={() => handleEditTrigger(c)}
                                className="px-3 py-1 bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-300 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTrigger(c.id)}
                                className="px-3 py-1 bg-red-950/25 hover:bg-red-950/40 border border-red-500/30 text-red-400 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


'use client';

import { useState, useTransition, useEffect } from 'react';
import {
  createMemberAction,
  deleteMemberAction,
  updateMemberRoleAction,
  updateMemberTierAction,
} from './actions';

interface Member {
  id: number;
  name: string;
  slug: string;
  role: string;
  tier: string;
  clearance_level: string;
  portraitUrl: string | null;
}

interface PersonnelManagerProps {
  initialMembers: Member[];
}

export default function PersonnelManager({ initialMembers }: PersonnelManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // State to manage members roster locally
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [updatingMemberId, setUpdatingMemberId] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [role, setRole] = useState('');
  const [tier, setTier] = useState('Support Staff');
  const [clearanceLevel, setClearanceLevel] = useState('Level 1');
  const [portraitUrl, setPortraitUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Sync state with parent props
  useEffect(() => {
    setMembers(initialMembers);
  }, [initialMembers]);

  // Auto-slugify name
  useEffect(() => {
    if (!isSlugManual) {
      const generated = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generated);
    }
  }, [name, isSlugManual]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManual(true);
    setSlug(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !slug.trim() || !role.trim()) {
      setErrorMsg('Please fill in Name, Slug, and Role.');
      return;
    }

    startTransition(async () => {
      try {
        await createMemberAction({
          name,
          slug,
          role,
          tier,
          clearance_level: clearanceLevel,
          portraitUrl,
        });
        // Reset form
        setName('');
        setSlug('');
        setIsSlugManual(false);
        setRole('');
        setTier('Support Staff');
        setClearanceLevel('Level 1');
        setPortraitUrl('');
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to create member.');
      }
    });
  };

  const handleDeleteTrigger = (id: number) => {
    setDeleteConfirmId(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId === null) return;
    const targetId = deleteConfirmId;
    setDeleteConfirmId(null);
    startTransition(async () => {
      try {
        await deleteMemberAction(targetId);
      } catch (err: any) {
        alert(err.message || 'Failed to delete member.');
      }
    });
  };

  const handleRoleChange = async (id: number, newRole: string, oldRole: string) => {
    if (newRole.trim() === oldRole.trim()) return;
    if (!newRole.trim()) {
      alert('Role cannot be empty.');
      return;
    }

    setUpdatingMemberId(id);
    try {
      await updateMemberRoleAction(id, newRole.trim());
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, role: newRole.trim() } : m))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update role');
      setMembers(initialMembers);
    } finally {
      setUpdatingMemberId(null);
    }
  };

  const handleTierChange = async (id: number, newTier: string) => {
    setUpdatingMemberId(id);
    try {
      await updateMemberTierAction(id, newTier);
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, tier: newTier } : m))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update tier');
      setMembers(initialMembers);
    } finally {
      setUpdatingMemberId(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* Loading overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 px-4 py-2 rounded border border-[#d4af37]/30 text-[#d4af37] text-xs uppercase tracking-widest animate-pulse">
            Executing Command...
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-[#050505] border border-red-500/30 rounded-lg p-6 shadow-2xl shadow-red-500/5">
            <h3 className="font-serif text-lg text-red-400 uppercase tracking-wider mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
              Confirm Operative Decommission
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              WARNING: This will permanently purge this agent dossier from the personnel files. Decommissioned status is final.
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
                Decommission Agent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Agent Form */}
      <div className="border border-[#d4af37]/25 bg-black/40 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-serif text-[#d4af37] mb-4 pb-2 border-b border-[#d4af37]/15" style={{ fontFamily: 'Cinzel, serif' }}>
          Register New Operative
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="border border-red-500/35 bg-red-500/10 text-red-400 text-xs px-4 py-2 rounded">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. John Doe"
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1 flex justify-between">
                <span>Unique Slug *</span>
                {isSlugManual && (
                  <button
                    type="button"
                    onClick={() => setIsSlugManual(false)}
                    className="text-[10px] text-[#d4af37] hover:underline"
                  >
                    Auto-generate
                  </button>
                )}
              </label>
              <input
                type="text"
                value={slug}
                onChange={handleSlugChange}
                placeholder="e.g. john-doe"
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none font-mono transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Role Description *
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Occult Scholar, Field Agent"
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Rank/Tier
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none cursor-pointer transition-colors"
              >
                <option value="Founder">Founder</option>
                <option value="Core Member">Core Member</option>
                <option value="Support Staff">Support Staff</option>
                <option value="One Case Blunder">One Case Blunder</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Clearance Level
              </label>
              <select
                value={clearanceLevel}
                onChange={(e) => setClearanceLevel(e.target.value)}
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none cursor-pointer transition-colors"
              >
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
                <option value="Level 4">Level 4</option>
                <option value="Level 5">Level 5</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
              Portrait URL Path
            </label>
            <input
              type="text"
              value={portraitUrl}
              onChange={(e) => setPortraitUrl(e.target.value)}
              placeholder="e.g. /Members/Name.jpg (Leave blank for default placeholder)"
              className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/35 text-[#d4af37] text-xs uppercase tracking-widest font-semibold rounded cursor-pointer transition-all duration-300 shadow shadow-[#d4af37]/5"
          >
            {isPending ? 'TRANSMITTING REQUISITION...' : 'REGISTER AGENT'}
          </button>
        </form>
      </div>

      {/* Roster Listing */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif text-[#d4af37]" style={{ fontFamily: 'Cinzel, serif' }}>
          Active Operatives Roster
        </h2>

        <div className="overflow-x-auto rounded-lg border border-[#d4af37]/15 bg-black/20">
          <table className="min-w-full divide-y divide-[#d4af37]/15 text-left text-sm">
            <thead className="bg-[#0c0c0c] text-xs uppercase tracking-widest text-[#d4af37]/90 font-mono">
              <tr>
                <th className="px-6 py-4">Agent Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Rank / Tier</th>
                <th className="px-6 py-4">Clearance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900/60 bg-black/10">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 italic">
                    No active operatives found.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 font-serif text-[#d4af37] font-semibold tracking-wide flex items-center gap-2">
                      {member.name}
                      {updatingMemberId === member.id && (
                        <span className="text-[9px] text-[#d4af37] animate-pulse font-mono font-normal">
                          (SYNCING...)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-400">
                      {member.slug}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        defaultValue={member.role}
                        onBlur={(e) => handleRoleChange(member.id, e.target.value, member.role)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.currentTarget.blur();
                          }
                        }}
                        disabled={updatingMemberId === member.id}
                        className="bg-transparent border border-transparent hover:border-gray-800 focus:border-[#d4af37]/45 focus:bg-gray-950 px-2 py-1 rounded text-sm text-gray-300 focus:outline-none transition-colors w-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={member.tier}
                        onChange={(e) => handleTierChange(member.id, e.target.value)}
                        disabled={updatingMemberId === member.id}
                        className="px-2 py-1 bg-gray-950 text-gray-300 border border-[#d4af37]/20 rounded focus:outline-none focus:border-[#d4af37]/50 text-[10px] uppercase tracking-wider font-semibold font-mono cursor-pointer max-w-xs transition-colors"
                      >
                        <option value="Founder" className="bg-black text-gray-300">Founder</option>
                        <option value="Core Member" className="bg-black text-gray-300">Core Member</option>
                        <option value="Support Staff" className="bg-black text-gray-300">Support Staff</option>
                        <option value="One Case Blunder" className="bg-black text-gray-300">One Case Blunder</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-400">
                      {member.clearance_level}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteTrigger(member.id)}
                        className="px-3 py-1.5 bg-red-950/25 hover:bg-red-950/40 border border-red-500/30 text-red-400 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                      >
                        Decommission
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


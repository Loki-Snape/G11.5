'use client';

import { useState, useTransition } from 'react';
import { createEntityAction, deleteEntityAction } from './actions';

interface Entity {
  id: number;
  entity_name: string;
  tier: string;
  strength: string;
  weakness: string;
  identification_method: string;
  brief_bio: string;
  image_url: string | null;
}

interface EntityManagerProps {
  initialEntities: Entity[];
}

export default function EntityManager({ initialEntities }: EntityManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Form states
  const [entityName, setEntityName] = useState('');
  const [tier, setTier] = useState('');
  const [strength, setStrength] = useState('');
  const [weakness, setWeakness] = useState('');
  const [idMethod, setIdMethod] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!entityName.trim() || !tier.trim() || !strength.trim() || !weakness.trim() || !idMethod.trim() || !bio.trim()) {
      setErrorMsg('Please fill in all required fields marked with *.');
      return;
    }

    startTransition(async () => {
      try {
        await createEntityAction({
          entity_name: entityName,
          tier,
          strength,
          weakness,
          identification_method: idMethod,
          brief_bio: bio,
          image_url: imageUrl,
        });
        // Reset form
        setEntityName('');
        setTier('');
        setStrength('');
        setWeakness('');
        setIdMethod('');
        setBio('');
        setImageUrl('');
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to catalog anomaly.');
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
        await deleteEntityAction(targetId);
      } catch (err: any) {
        alert(err.message || 'Failed to purge anomaly.');
      }
    });
  };

  return (
    <div className="space-y-10">
      {/* Loading overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 px-4 py-2 rounded border border-[#d4af37]/30 text-[#d4af37] text-xs uppercase tracking-widest animate-pulse">
            Cataloging Anomaly...
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-[#050505] border border-red-500/30 rounded-lg p-6 shadow-2xl shadow-red-500/5">
            <h3 className="font-serif text-lg text-red-400 uppercase tracking-wider mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
              Confirm Anomaly Purge
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              WARNING: This will permanently expunge this entity classification and containment guide from the registry.
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
                Purge Registry Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Entity Form */}
      <div className="border border-[#d4af37]/25 bg-black/40 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-serif text-[#d4af37] mb-4 pb-2 border-b border-[#d4af37]/15" style={{ fontFamily: 'Cinzel, serif' }}>
          Catalog New Paranormal Entity
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
                Entity Name *
              </label>
              <input
                type="text"
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                placeholder="e.g. The Ignis Tulpa"
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Threat Tier / Classification *
              </label>
              <input
                type="text"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                placeholder="e.g. Class V Manifestation"
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Strengths / Powers *
              </label>
              <textarea
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                placeholder="Describe capabilities..."
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none h-20 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Weaknesses / Countermeasures *
              </label>
              <textarea
                value={weakness}
                onChange={(e) => setWeakness(e.target.value)}
                placeholder="Describe containment counters..."
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none h-20 transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Identification Method *
              </label>
              <input
                type="text"
                value={idMethod}
                onChange={(e) => setIdMethod(e.target.value)}
                placeholder="e.g. Sudden localized temperature drops"
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Entity Image Path
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="e.g. /Entities/Ignis Tulpa.png"
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
              Brief Biography / Lore *
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Provide historical context and documented behaviors..."
              className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none h-24 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/35 text-[#d4af37] text-xs uppercase tracking-widest font-semibold rounded cursor-pointer transition-all duration-300 shadow shadow-[#d4af37]/5"
          >
            {isPending ? 'CATALOGING ANOMALY...' : 'CATALOG ENTITY'}
          </button>
        </form>
      </div>

      {/* Catalog Registry List */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif text-[#d4af37]" style={{ fontFamily: 'Cinzel, serif' }}>
          Registered Entities Index
        </h2>

        <div className="overflow-x-auto rounded-lg border border-[#d4af37]/15 bg-black/20">
          <table className="min-w-full divide-y divide-[#d4af37]/15 text-left text-sm">
            <thead className="bg-[#0c0c0c] text-xs uppercase tracking-widest text-[#d4af37]/90 font-mono">
              <tr>
                <th className="px-6 py-4">Entity Name</th>
                <th className="px-6 py-4">Classification</th>
                <th className="px-6 py-4">Identification</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900/60 bg-black/10">
              {initialEntities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">
                    No entities cataloged in the registry.
                  </td>
                </tr>
              ) : (
                initialEntities.map((entity) => (
                  <tr key={entity.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 font-serif text-[#d4af37] font-semibold tracking-wide">
                      {entity.entity_name}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-400">
                      {entity.tier}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {entity.identification_method}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteTrigger(entity.id)}
                        className="px-3 py-1.5 bg-red-950/25 hover:bg-red-950/40 border border-red-500/30 text-red-400 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                      >
                        Purge
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

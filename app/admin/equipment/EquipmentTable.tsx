'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  updateEquipmentStatusAction,
  createEquipmentAction,
  deleteEquipmentAction,
} from './actions';

interface EquipmentItem {
  id: number;
  gear_name: string;
  classification: string;
  status: string;
}

interface EquipmentTableProps {
  initialEquipment: EquipmentItem[];
}

export default function EquipmentTable({ initialEquipment }: EquipmentTableProps) {
  // Store equipment items in state to support updates
  const [items, setItems] = useState<EquipmentItem[]>(initialEquipment);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [gearName, setGearName] = useState('');
  const [classification, setClassification] = useState('');
  const [status, setStatus] = useState('At HQ');
  const [errorMsg, setErrorMsg] = useState('');

  // Delete modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  useEffect(() => {
    setItems(initialEquipment);
  }, [initialEquipment]);

  const getStatusClass = (status: string) => {
    const norm = status.toLowerCase();
    if (norm === 'at hq') {
      return 'text-green-400 border-green-500/20 bg-green-500/5';
    }
    if (norm === 'deployed') {
      return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
    }
    return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    const originalItems = [...items];

    // Optimistic Update: immediately change local state
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setUpdatingId(id);

    try {
      await updateEquipmentStatusAction(id, newStatus);
    } catch (error) {
      // Revert if database save fails
      setItems(originalItems);
      alert('Authentication/Connection error. Could not commit status change.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!gearName.trim() || !classification.trim()) {
      setErrorMsg('Please fill in both Gear Name and Classification.');
      return;
    }

    startTransition(async () => {
      try {
        await createEquipmentAction({
          gear_name: gearName.trim(),
          classification: classification.trim(),
          status,
        });
        // Reset form
        setGearName('');
        setClassification('');
        setStatus('At HQ');
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to create equipment.');
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
        await deleteEquipmentAction(targetId);
      } catch (err: any) {
        alert(err.message || 'Failed to delete equipment.');
      }
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Loading state overlay for transitions */}
      {isPending && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 px-4 py-2 rounded border border-[#d4af37]/30 text-[#d4af37] text-xs uppercase tracking-widest animate-pulse">
            Processing Transaction...
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-[#050505] border border-red-500/30 rounded-lg p-6 shadow-2xl shadow-red-500/5">
            <h3 className="font-serif text-lg text-red-400 uppercase tracking-wider mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
              Confirm Gear Disposal
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              WARNING: This will permanently excise this equipment item from the agency inventory files. Disposal is final.
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
                Remove Equipment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Equipment Form */}
      <div className="border border-[#d4af37]/25 bg-black/40 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-serif text-[#d4af37] mb-4 pb-2 border-b border-[#d4af37]/15" style={{ fontFamily: 'Cinzel, serif' }}>
          Register New Equipment
        </h2>

        <form onSubmit={handleCreateEquipment} className="space-y-4">
          {errorMsg && (
            <div className="border border-red-500/35 bg-red-500/10 text-red-400 text-xs px-4 py-2 rounded">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Gear Name *
              </label>
              <input
                type="text"
                value={gearName}
                onChange={(e) => setGearName(e.target.value)}
                placeholder="e.g. Spectral Snare"
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Classification *
              </label>
              <input
                type="text"
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                placeholder="e.g. Capture Device"
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37]/75 font-semibold mb-1">
                Current Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-gray-950 border border-[#d4af37]/15 focus:border-[#d4af37]/50 rounded text-sm text-white focus:outline-none cursor-pointer transition-colors"
              >
                <option value="At HQ">At HQ</option>
                <option value="Deployed">Deployed</option>
                <option value="Under Calibration">Under Calibration</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/35 text-[#d4af37] text-xs uppercase tracking-widest font-semibold rounded cursor-pointer transition-all duration-300 shadow shadow-[#d4af37]/5"
          >
            {isPending ? 'REGISTERING INVENTORY...' : 'REGISTER EQUIPMENT'}
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#d4af37]/15 bg-black/20">
        <table className="min-w-full divide-y divide-[#d4af37]/15 text-left text-sm">
          <thead className="bg-[#0c0c0c] text-xs uppercase tracking-widest text-[#d4af37]/90 font-mono">
            <tr>
              <th className="px-6 py-4">Gear Name</th>
              <th className="px-6 py-4">Classification</th>
              <th className="px-6 py-4">Current Status</th>
              <th className="px-6 py-4">Update Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900/60 bg-black/10">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">
                  No containment equipment registered in agency inventory.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4 font-serif text-[#d4af37] font-medium tracking-wide">
                    {item.gear_name}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {item.classification}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] uppercase tracking-widest font-mono font-semibold px-2.5 py-1 rounded border ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                    {updatingId === item.id && (
                      <span className="ml-3 text-[10px] text-[#d4af37] animate-pulse font-mono">
                        SYNCING...
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      disabled={updatingId === item.id}
                      className="px-3 py-1.5 bg-gray-900 text-gray-300 border border-[#d4af37]/20 rounded focus:outline-none focus:border-[#d4af37]/50 text-xs uppercase tracking-wider font-semibold cursor-pointer max-w-xs transition-colors"
                    >
                      <option value="At HQ" className="bg-black text-gray-300">At HQ</option>
                      <option value="Deployed" className="bg-black text-gray-300">Deployed</option>
                      <option value="Under Calibration" className="bg-black text-gray-300">Under Calibration</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteTrigger(item.id)}
                      className="px-3 py-1.5 bg-red-950/25 hover:bg-red-950/40 border border-red-500/30 text-red-400 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


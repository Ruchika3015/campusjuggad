import { LED, Rivet } from '@/components/primitives/Details';
import { useAuth } from '@/context/AuthContext';
import { backpackUser } from '@/data/backpackMockData';
import { Star } from 'lucide-react';

export function StudentID({ open, onClose }) {
  const { user: authUser } = useAuth();
  if (!open) return null;

  const profile = { ...backpackUser, ...(authUser || {}) };
  const avatar = profile.name?.slice(0, 2).toUpperCase() || backpackUser.avatar;

  return (
    <div className="workshop-overlay" onClick={onClose}>
      <div className="workshop-panel relative w-full max-w-sm mx-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {/* Lanyard going up */}
        <div className="bp-lanyard w-1.5 h-8 mb-0" />
        {/* Clip */}
        <div className="w-4 h-3 rounded-sm surface-metal mb-1" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />

        {/* ID Card */}
        <div className="relative rounded-2xl overflow-hidden anim-badge-settle w-full" style={{ background: 'linear-gradient(160deg, #2a2218 0%, #1c1610 100%)', border: '2px solid var(--metal-2)', boxShadow: '0 30px 60px -16px rgba(0,0,0,0.9), inset 0 2px 0 rgba(255,200,150,0.06)' }}>
          <Rivet size={7} className="absolute top-2 left-2" />
          <Rivet size={7} className="absolute top-2 right-2" />
          <Rivet size={7} className="absolute bottom-2 left-2" />
          <Rivet size={7} className="absolute bottom-2 right-2" />

          {/* shine effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-y-0 w-1/3 anim-id-shine" style={{ background: 'linear-gradient(90deg, transparent, rgba(214,138,60,0.08), transparent)' }} />
          </div>

          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-metal-2/40">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-6 h-6 rounded" style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))' }}>
                <span className="font-display text-bg-0 text-[10px] leading-none">J</span>
              </span>
              <span className="font-technical text-[7px] text-ink-2">CAMPUSJUGAAD</span>
            </div>
            <span className="font-technical text-[7px] text-ink-3">STUDENT ID</span>
          </div>

          {/* Card body */}
          <div className="px-5 py-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="grid place-items-center w-16 h-16 rounded-xl font-display text-bg-0 text-xl shrink-0" style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))', boxShadow: 'var(--glow-amber)' }}>
                {avatar}
              </div>
              <div>
                <h3 className="font-display text-base text-ink-0 leading-tight">{profile.name}</h3>
                <p className="font-mono text-[9px] text-ink-2 mt-1">{profile.college}</p>
                <p className="font-mono text-[9px] text-ink-3">{profile.branch}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div className="rounded-lg p-3" style={{ background: 'rgba(214,138,60,0.06)', border: '1px solid rgba(214,138,60,0.15)' }}>
                <p className="font-technical text-[6px] text-ink-3">JUGAAD SCORE</p>
                <p className="font-display text-xl text-amber mt-0.5">{profile.jugaadScore}</p>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(93,184,154,0.06)', border: '1px solid rgba(93,184,154,0.15)' }}>
                <p className="font-technical text-[6px] text-ink-3">RATING</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={14} className="text-amber fill-amber" />
                  <p className="font-display text-xl text-ink-0">{profile.rating}</p>
                </div>
              </div>
            </div>

            {/* Status strip */}
            <div className="flex items-center justify-between rounded-lg px-3 py-2" style={{ background: 'var(--bg-1)', border: '1px solid var(--metal-1)' }}>
              <div className="flex items-center gap-2">
                <LED color="mint" pulse size={4} />
                <span className="font-technical text-[7px] text-mint">VERIFIED STUDENT</span>
              </div>
              <span className="font-mono text-[7px] text-ink-3">ID: CJ-2024-RC</span>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="absolute -top-2 -right-2 grid place-items-center w-7 h-7 rounded-full surface-metal text-ink-2 hover:text-ink-0 text-xs z-10" aria-label="Close">✕</button>
      </div>
    </div>
  );
}

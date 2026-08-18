import { LED, Rivet } from '@/components/primitives/Details';
import { backpackEarnings } from '@/data/backpackMockData';
import { Wallet, IndianRupee } from 'lucide-react';

export function EarningsWallet({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="workshop-overlay" onClick={onClose}>
      {/* Wallet — physical leather wallet opened */}
      <div
        className="workshop-panel anim-wallet-open relative w-full max-w-md mx-4 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(160deg, #3a2614 0%, #221610 100%)',
          boxShadow: '0 30px 60px -16px rgba(0,0,0,0.9), inset 0 2px 0 rgba(255,200,150,0.08)',
          border: '2px solid var(--metal-2)',
        }}
      >
        <Rivet size={8} className="absolute top-3 left-3" />
        <Rivet size={8} className="absolute top-3 right-3" />
        <Rivet size={8} className="absolute bottom-3 left-3" />
        <Rivet size={8} className="absolute bottom-3 right-3" />

        {/* Stitching border */}
        <div className="absolute inset-3 bp-stitch rounded-lg pointer-events-none opacity-40" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-4 border-b border-metal-2/40">
          <div className="flex items-center gap-2">
            <Wallet size={14} className="text-amber" />
            <span className="font-technical text-[9px] text-ink-1">EARNINGS — WALLET</span>
          </div>
          <span className="font-mono text-[7px] text-ink-3">CJ-BP-EARN</span>
        </div>

        <div className="relative p-6">
          {/* Cash pocket — total */}
          <div className="rounded-xl p-5 mb-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(214,138,60,0.10), rgba(214,138,60,0.02))', border: '1px solid rgba(214,138,60,0.2)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(214,138,60,0.08), transparent 70%)' }} />
            <p className="font-technical text-[8px] text-ink-3 relative">TOTAL IN WALLET</p>
            <div className="flex items-center gap-1 mt-1 relative">
              <IndianRupee size={28} className="text-amber" />
              <p className="font-display text-4xl text-amber">{backpackEarnings.totalEarned.toLocaleString()}</p>
            </div>
            <div className="mt-2 flex items-center gap-2 relative">
              <LED color="amber" pulse size={5} />
              <span className="font-mono text-[9px] text-ink-2">stored in front pocket</span>
            </div>
          </div>

          {/* Card slots — this month + completed */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="rounded-xl p-4 relative overflow-hidden" style={{ background: 'rgba(93,184,154,0.06)', border: '1px solid rgba(93,184,154,0.18)' }}>
              <p className="font-technical text-[6px] text-ink-3">THIS MONTH</p>
              <div className="flex items-center gap-0.5 mt-1">
                <IndianRupee size={18} className="text-mint" />
                <p className="font-display text-2xl text-mint">{backpackEarnings.thisMonth}</p>
              </div>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--metal-1)' }}>
              <p className="font-technical text-[6px] text-ink-3">COMPLETED</p>
              <p className="font-display text-2xl text-ink-0 mt-1">{backpackEarnings.completedJugaads}</p>
            </div>
          </div>

          {/* Receipt slips */}
          <div className="mb-2 flex items-center gap-2">
            <span className="font-technical text-[7px] text-ink-3">RECEIPTS</span>
            <span className="h-px flex-1 bg-metal-1" />
          </div>
          <div className="space-y-2">
            {backpackEarnings.history.map((entry, i) => (
              <div
                key={entry.id}
                className="surface-paper paper-fiber relative rounded-sm px-3 py-2.5 flex items-center gap-3 anim-reveal"
                style={{ animationDelay: `${i * 0.06}s`, transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)`, clipPath: 'polygon(0 0, 100% 0, 100% 92%, 96% 100%, 0 100%)' }}
              >
                {/* Perforated edge */}
                <div className="absolute right-1.5 top-0 bottom-0 w-0.5" style={{ background: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(42,36,24,0.3) 2px 3px)' }} />
                <span className="text-sm">{entry.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-paper-ink truncate">{entry.text}</p>
                  <p className="font-mono text-[8px] text-paper-ink/50">{entry.date}</p>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <IndianRupee size={11} className="text-mint-deep" />
                  <p className="font-display text-sm text-mint-deep">{entry.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onClose} className="absolute -top-2 -right-2 grid place-items-center w-7 h-7 rounded-full surface-metal text-ink-2 hover:text-ink-0 text-xs z-10" aria-label="Close">✕</button>
      </div>
    </div>
  );
}

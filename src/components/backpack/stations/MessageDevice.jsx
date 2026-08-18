import { useState } from 'react';
import { LED, Rivet, Screen } from '@/components/primitives/Details';
import { backpackMessages } from '@/data/backpackMockData';
import { MessageSquare, ArrowLeft } from 'lucide-react';

export function MessageDevice({ open, onClose }) {
  const [selected, setSelected] = useState(null);
  if (!open) return null;

  const unreadCount = backpackMessages.filter((m) => m.unread).length;

  return (
    <div className="workshop-overlay" onClick={onClose}>
      <div className="workshop-panel relative w-full max-w-sm mx-4 rounded-3xl p-2 anim-phone-on" onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(160deg, var(--metal-1), var(--metal-0))', boxShadow: '0 30px 60px -16px rgba(0,0,0,0.9), inset 0 2px 0 rgba(255,255,255,0.08)' }}>
        <Rivet size={6} className="absolute top-1.5 left-1.5" />
        <Rivet size={6} className="absolute top-1.5 right-1.5" />
        {/* phone screen */}
        <Screen tone="dark" className="rounded-[20px] min-h-[420px] flex flex-col" flicker>
          {/* status bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-metal-2/40">
            <div className="flex items-center gap-2">
              <LED color="mint" pulse size={4} />
              <span className="font-mono text-[7px] text-mint">CJ-DEVICE</span>
            </div>
            <span className="font-mono text-[7px] text-ink-3">{unreadCount} NEW</span>
          </div>

          {!selected ? (
            <>
              <div className="px-4 py-3 border-b border-metal-2/30">
                <div className="flex items-center gap-2">
                  <MessageSquare size={12} className="text-amber" />
                  <span className="font-technical text-[8px] text-ink-1">MESSAGES — PHONE</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {backpackMessages.map((msg, i) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelected(msg)}
                    className="w-full text-left px-4 py-3 border-b border-metal-2/20 hover:bg-white/5 transition-colors anim-reveal"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="grid place-items-center w-9 h-9 rounded-full font-display text-bg-0 text-[10px] shrink-0"
                        style={{
                          background: msg.accent === 'mint' ? 'linear-gradient(135deg, var(--mint), var(--mint-deep))'
                            : msg.accent === 'coral' ? 'linear-gradient(135deg, var(--coral), #a04040)'
                            : 'linear-gradient(135deg, var(--amber), var(--amber-deep))',
                        }}
                      >
                        {msg.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-mono text-xs text-ink-0">{msg.from}</p>
                          <span className="font-mono text-[7px] text-ink-3 shrink-0">{msg.time}</span>
                        </div>
                        <p className="font-mono text-[10px] text-ink-2 truncate mt-0.5">{msg.preview}</p>
                      </div>
                      {msg.unread && <LED color="amber" size={4} className="shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col anim-reveal">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-metal-2/30">
                <button onClick={() => setSelected(null)} className="text-ink-3 hover:text-ink-0 transition-colors">
                  <ArrowLeft size={14} />
                </button>
                <div className="grid place-items-center w-8 h-8 rounded-full font-display text-bg-0 text-[9px]" style={{ background: selected.accent === 'mint' ? 'var(--mint)' : selected.accent === 'coral' ? 'var(--coral)' : 'var(--amber)' }}>
                  {selected.initials}
                </div>
                <div>
                  <p className="font-mono text-xs text-ink-0">{selected.from}</p>
                  <p className="font-mono text-[7px] text-mint">ONLINE</p>
                </div>
              </div>
              <div className="flex-1 px-4 py-4 space-y-3">
                <div className="max-w-[80%] surface-panel rounded-2xl rounded-tl-sm px-3 py-2.5">
                  <p className="font-mono text-[11px] text-ink-1 leading-relaxed">{selected.preview}</p>
                  <p className="font-mono text-[7px] text-ink-3 mt-1.5">{selected.time}</p>
                </div>
                <div className="max-w-[80%] ml-auto rounded-2xl rounded-tr-sm px-3 py-2.5" style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))' }}>
                  <p className="font-mono text-[11px] text-bg-0 leading-relaxed">Got it, thanks! Let me check and get back to you.</p>
                  <p className="font-mono text-[7px] text-bg-0/60 mt-1.5">just now</p>
                </div>
                <div className="max-w-[80%] surface-panel rounded-2xl rounded-tl-sm px-3 py-2.5">
                  <p className="font-mono text-[11px] text-ink-1 leading-relaxed">No rush. Whenever you're ready! 🎬</p>
                  <p className="font-mono text-[7px] text-ink-3 mt-1.5">just now</p>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-metal-2/30">
                <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: 'var(--bg-1)', border: '1px solid var(--metal-1)' }}>
                  <input type="text" placeholder="Type a reply..." className="flex-1 bg-transparent font-mono text-[10px] text-ink-0 placeholder:text-ink-3/50 outline-none" />
                  <button className="font-technical text-[8px] text-amber">SEND</button>
                </div>
              </div>
            </div>
          )}
        </Screen>
        <button onClick={onClose} className="absolute -top-2 -right-2 grid place-items-center w-7 h-7 rounded-full surface-metal text-ink-2 hover:text-ink-0 text-xs z-10" aria-label="Close">✕</button>
      </div>
    </div>
  );
}

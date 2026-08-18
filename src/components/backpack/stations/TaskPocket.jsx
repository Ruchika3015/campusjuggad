import { useState } from 'react';
import { LED, Rivet, Sticker } from '@/components/primitives/Details';
import { backpackTasks } from '@/data/backpackMockData';
import { ClipboardList, Clock, CheckCircle2, AlertCircle, Loader2, BookOpen } from 'lucide-react';

const STATUS_CONFIG = {
  urgent: { color: 'coral', label: 'DUE TOMORROW', icon: AlertCircle },
  open: { color: 'amber', label: 'OPEN', icon: Clock },
  'in-progress': { color: 'amber', label: 'IN PROGRESS', icon: Loader2 },
  completed: { color: 'mint', label: 'COMPLETED', icon: CheckCircle2 },
};

export function TaskPocket({ open, onClose }) {
  const [selected, setSelected] = useState(null);
  if (!open) return null;

  const activeCount = backpackTasks.filter((t) => t.status !== 'completed').length;

  return (
    <div className="workshop-overlay" onClick={onClose}>
      {/* Notebook — physical open book */}
      <div
        className="workshop-panel anim-page-turn relative w-full max-w-xl mx-4 rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(90deg, #ede4cf 0%, #e8dec5 50%, #ede4cf 100%)',
          boxShadow: '0 30px 60px -16px rgba(0,0,0,0.85), inset 0 2px 0 rgba(255,255,255,0.5)',
          border: '1px solid rgba(42,36,24,0.2)',
        }}
      >
        {/* Spiral binding center */}
        <div className="bp-spiral absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-3 opacity-60" />

        {/* Paper texture overlay */}
        <div className="paper-fiber absolute inset-0 rounded-lg pointer-events-none" />

        {/* Header — left page */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 min-h-[420px] max-h-[85vh]">
          {/* Left page — task list */}
          <div className="p-6 sm:p-7 sm:border-r border-dashed border-paper-ink/15 overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-paper-ink/15">
              <div className="flex items-center gap-2">
                <BookOpen size={14} style={{ color: 'var(--amber-deep)' }} />
                <span className="font-technical text-[9px]" style={{ color: 'var(--paper-ink)' }}>NOTEBOOK — TASKS</span>
              </div>
              <span className="font-mono text-[8px] text-paper-ink/50">{activeCount} active</span>
            </div>

            {!selected ? (
              <div className="space-y-3">
                {backpackTasks.map((task, i) => {
                  const cfg = STATUS_CONFIG[task.status];
                  return (
                    <button
                      key={task.id}
                      onClick={() => setSelected(task)}
                      className="w-full text-left relative anim-reveal hover:translate-x-1 transition-transform"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <div className="relative pl-7 pr-2 py-2" style={{ transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)` }}>
                        {/* Bullet hole punch */}
                        <span className="absolute left-1 top-3 w-2.5 h-2.5 rounded-full border" style={{ borderColor: 'var(--paper-ink)', background: 'var(--paper)' }} />
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-1.5 flex-1">
                            <span className="text-sm leading-none mt-0.5">{task.emoji}</span>
                            <div>
                              <p className="font-editorial text-sm leading-snug" style={{ color: 'var(--paper-ink)' }}>{task.text}</p>
                              <p className="font-mono text-[8px] text-paper-ink/50 mt-0.5">{task.sub}</p>
                            </div>
                          </div>
                          <Sticker color={cfg.color === 'coral' ? 'coral' : cfg.color === 'amber' ? 'amber' : 'mint'} rotate={-2}>{cfg.label}</Sticker>
                        </div>
                      </div>
                      <div className="h-px bg-paper-ink/15 ml-7" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="anim-reveal">
                <button onClick={() => setSelected(null)} className="font-mono text-[9px] text-paper-ink/60 hover:text-paper-ink transition-colors mb-4">← back to tasks</button>
                <div className="text-3xl mb-2">{selected.emoji}</div>
                <h3 className="font-display text-xl" style={{ color: 'var(--paper-ink)' }}>{selected.text}</h3>
                <p className="font-mono text-[10px] text-paper-ink/60 mt-2">{selected.detail}</p>
                <div className="mt-4 inline-flex">
                  <Sticker color={STATUS_CONFIG[selected.status].color === 'coral' ? 'coral' : STATUS_CONFIG[selected.status].color === 'amber' ? 'amber' : 'mint'} rotate={-2}>
                    {STATUS_CONFIG[selected.status].label}
                  </Sticker>
                </div>
              </div>
            )}
          </div>

          {/* Right page — deadlines / notes */}
          <div className="hidden sm:block p-6 sm:p-7 bg-paper-line/5 overflow-y-auto" style={{ background: 'linear-gradient(160deg, rgba(212,202,176,0.08), transparent)' }}>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-paper-ink/15">
              <Clock size={14} style={{ color: 'var(--amber-deep)' }} />
              <span className="font-technical text-[9px]" style={{ color: 'var(--paper-ink)' }}>DEADLINES</span>
            </div>
            <div className="space-y-3">
              {backpackTasks.filter((t) => t.status !== 'completed').map((task, i) => (
                <div key={task.id} className="flex items-center gap-3 anim-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="font-display text-lg" style={{ color: 'var(--amber-deep)' }}>0{i + 1}</span>
                  <div className="flex-1">
                    <p className="font-editorial text-xs" style={{ color: 'var(--paper-ink)' }}>{task.text}</p>
                    <p className="font-mono text-[8px] text-paper-ink/50">{task.sub}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full" style={{ background: task.status === 'urgent' ? 'var(--coral)' : 'var(--amber)' }} />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-paper-ink/15">
              <p className="font-editorial text-[11px] text-paper-ink/50 italic">"Don't forget: DBMS due tomorrow!"</p>
              <p className="font-mono text-[7px] text-paper-ink/40 mt-1">— sticky note, desk</p>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="absolute -top-2 -right-2 grid place-items-center w-7 h-7 rounded-full surface-metal text-ink-2 hover:text-ink-0 text-xs z-10" aria-label="Close">✕</button>
      </div>
    </div>
  );
}

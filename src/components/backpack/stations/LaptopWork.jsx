import { useState } from 'react';
import { LED, Rivet, Screen } from '@/components/primitives/Details';
import { backpackProjects } from '@/data/backpackMockData';
import { Laptop, Clock, IndianRupee, ChevronRight } from 'lucide-react';

const STATUS_STYLES = {
  'in-progress': { color: 'amber', label: 'IN PROGRESS' },
  completed: { color: 'mint', label: 'COMPLETED' },
  paused: { color: 'coral', label: 'PAUSED' },
};

export function LaptopWork({ open, onClose }) {
  const [selected, setSelected] = useState(null);
  if (!open) return null;

  return (
    <div className="workshop-overlay" onClick={onClose}>
      {/* Laptop — physical device with screen */}
      <div
        className="workshop-panel anim-laptop-power relative w-full max-w-2xl mx-4 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(160deg, var(--metal-1), var(--metal-0))',
          boxShadow: '0 30px 60px -16px rgba(0,0,0,0.9), inset 0 2px 0 rgba(255,255,255,0.08)',
          border: '1px solid var(--metal-2)',
        }}
      >
        <Rivet size={7} className="absolute top-2 left-2 z-20" />
        <Rivet size={7} className="absolute top-2 right-10 z-20" />

        {/* Screen bezel */}
        <div className="p-3 sm:p-4">
          <Screen tone="dark" className="rounded-lg min-h-[380px] flex flex-col" flicker>
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-metal-2/40">
              <div className="flex items-center gap-2">
                <Laptop size={12} className="text-mint" />
                <span className="font-technical text-[8px] text-ink-1">CURRENT WORK — LAPTOP</span>
              </div>
              <div className="flex items-center gap-2">
                <LED color="mint" pulse size={4} />
                <span className="font-mono text-[7px] text-mint">CJ-LAPTOP-02</span>
              </div>
            </div>

            {!selected ? (
              <div className="flex-1 p-4 overflow-y-auto">
                <p className="font-mono text-[9px] text-ink-3 mb-3">{backpackProjects.length} active projects</p>
                <div className="space-y-3">
                  {backpackProjects.map((project, i) => {
                    const st = STATUS_STYLES[project.status] || STATUS_STYLES['in-progress'];
                    return (
                      <button
                        key={project.id}
                        onClick={() => setSelected(project)}
                        className="w-full text-left surface-panel rounded-xl p-4 anim-reveal group hover:border-mint/30"
                        style={{ animationDelay: `${i * 0.1}s`, border: '1px solid var(--metal-1)' }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="grid place-items-center w-10 h-10 rounded-lg shrink-0" style={{ background: 'rgba(93,184,154,0.08)', border: '1px solid rgba(93,184,154,0.2)' }}>
                            <span className="text-lg">{project.emoji}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-display text-sm text-ink-0">{project.title}</p>
                              <ChevronRight size={14} className="text-ink-3 group-hover:text-mint transition-colors shrink-0" />
                            </div>
                            <p className="font-mono text-[9px] text-ink-3 mt-0.5">for {project.client}</p>
                            {/* Progress bar */}
                            <div className="mt-2.5">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-technical text-[6px] text-ink-3">PROGRESS</span>
                                <span className="font-mono text-[8px] text-mint">{project.progress}%</span>
                              </div>
                              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-1)' }}>
                                <div
                                  className="h-full rounded-full anim-meter-fill"
                                  style={{ width: `${project.progress}%`, background: 'linear-gradient(90deg, var(--mint), var(--mint-deep))', boxShadow: '0 0 6px rgba(93,184,154,0.4)' }}
                                />
                              </div>
                            </div>
                            <div className="mt-2.5 flex items-center gap-3">
                              <span className="inline-flex items-center gap-1 font-mono text-[8px] text-ink-3">
                                <Clock size={9} /> {project.deadline}
                              </span>
                              <span className="inline-flex items-center gap-1 font-mono text-[8px] text-amber" style={{ color: 'var(--amber)' }}>
                                <IndianRupee size={9} /> {project.budget.replace('₹', '')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex-1 p-4 anim-reveal overflow-y-auto">
                <button onClick={() => setSelected(null)} className="font-mono text-[9px] text-ink-3 hover:text-ink-0 transition-colors mb-4 flex items-center gap-1">
                  ← back to projects
                </button>
                <div className="text-4xl mb-2">{selected.emoji}</div>
                <h3 className="font-display text-xl text-ink-0">{selected.title}</h3>
                <p className="font-mono text-[10px] text-ink-2 mt-1">for {selected.client}</p>
                <p className="font-mono text-xs text-ink-1 mt-3 leading-relaxed">{selected.desc}</p>

                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  <DetailBlock label="PROGRESS" value={`${selected.progress}%`} color="mint" />
                  <DetailBlock label="DEADLINE" value={selected.deadline} color="amber" />
                  <DetailBlock label="BUDGET" value={selected.budget} color="amber" />
                </div>

                <div className="mt-4 rounded-xl p-4" style={{ background: 'rgba(93,184,154,0.05)', border: '1px solid rgba(93,184,154,0.15)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-technical text-[7px] text-ink-3">COMPLETION</span>
                    <span className="font-mono text-[9px] text-mint">{selected.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-1)' }}>
                    <div className="h-full rounded-full" style={{ width: `${selected.progress}%`, background: 'linear-gradient(90deg, var(--mint), var(--mint-deep))', boxShadow: '0 0 8px rgba(93,184,154,0.4)' }} />
                  </div>
                </div>
              </div>
            )}
          </Screen>
        </div>

        {/* Laptop base / keyboard hint */}
        <div className="h-3 surface-metal-brushed border-t border-metal-2/40" />

        <button onClick={onClose} className="absolute -top-2 -right-2 grid place-items-center w-7 h-7 rounded-full surface-metal text-ink-2 hover:text-ink-0 text-xs z-20" aria-label="Close">✕</button>
      </div>
    </div>
  );
}

function DetailBlock({ label, value, color }) {
  return (
    <div className="surface-panel rounded-xl p-3 text-center">
      <p className="font-display text-base" style={{ color: `var(--${color})` }}>{value}</p>
      <p className="font-technical text-[6px] text-ink-3 mt-0.5">{label}</p>
    </div>
  );
}

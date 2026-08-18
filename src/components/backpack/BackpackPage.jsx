import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { BackpackNav } from '@/components/backpack/BackpackNav';
import { LED, Rivet } from '@/components/primitives/Details';
import {
  backpackProjects, backpackTasks, backpackMessages,
  backpackEarnings, backpackUser,
} from '@/data/backpackMockData';
import { mockSkills, mockAchievements } from '@/data/workshopMockData';
import {
  Zap, Backpack as BackpackIcon, X, Clock, IndianRupee,
  Star, Award, Wrench, CheckCircle2, AlertCircle, Plus, Trash2,
} from 'lucide-react';

export function BackpackPage() {
  const { isDemoMode } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeObject, setActiveObject] = useState(null);

  const handleOpen = async () => {
    if (isOpen || opening) return;
    setOpening(true);
    await new Promise((r) => setTimeout(r, 1100));
    setIsOpen(true);
    setOpening(false);
  };

  const handleClose = async () => {
    if (!isOpen || closing) return;
    setActiveObject(null);
    setClosing(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsOpen(false);
    setClosing(false);
  };

  return (
    <div className="min-h-screen bg-bg-0 text-ink-0 overflow-x-hidden">
      <div className="fixed inset-0 dorm-wall pointer-events-none" />
      <div className="fixed inset-0 haze pointer-events-none" />
      <div className="bg-lettering fixed">BACKPACK</div>

      <BackpackNav />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <section className="pt-10 sm:pt-14 pb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <LED color="amber" pulse size={7} />
            <span className="font-technical text-[9px] text-ink-2">02 — THE STUDENT BACKPACK</span>
            <span className="h-px w-10 bg-metal-2" />
            <span className="font-technical text-[9px] text-ink-3">WHAT YOU CARRY</span>
            {isDemoMode && (
              <span className="font-technical text-[7px] text-amber/60 px-2 py-0.5 rounded" style={{ border: '1px solid rgba(214,138,60,0.2)', background: 'rgba(214,138,60,0.04)' }}>
                DEMO MODE
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink-0 anim-reveal">
            EVERYTHING<br />
            <span className="text-amber">YOU CARRY.</span>
          </h1>
          <p className="mt-4 max-w-md mx-auto text-sm text-ink-2 leading-relaxed anim-reveal" style={{ animationDelay: '0.2s' }}>
            Your work, messages, earnings and everything you carry through campus.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 anim-reveal" style={{ animationDelay: '0.3s' }}>
            <LED color={isOpen ? 'mint' : 'amber'} pulse size={4} />
            <span className="font-technical text-[8px] text-ink-3">
              BACKPACK STATUS // {isOpen ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </section>

        {/* === THE SCENE === */}
        <section className="relative min-h-[680px] sm:min-h-[780px] flex items-end justify-center">
          {/* Desk lamp glow */}
          <div className="desk-lamp-glow absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[460px]" />

          {/* Wall shadow */}
          <div
            className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[480px] h-[280px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5), transparent 70%)', filter: 'blur(28px)' }}
          />

          {/* Desk surface */}
          <div className="absolute bottom-0 inset-x-0 h-28 desk-wood rounded-t-2xl" />

          {/* === THE BACKPACK === */}
          <div className="relative z-10 mb-24" style={{ perspective: '1400px' }}>
            {/* Ambient glow */}
            <div
              className={`absolute inset-0 rounded-full compartment-glow ${isOpen ? 'compartment-glow--visible' : ''}`}
              style={{
                background: 'radial-gradient(ellipse at center, rgba(214,138,60,0.18), transparent 60%)',
                filter: 'blur(70px)',
                transform: 'scale(2.2)',
              }}
            />

            {/* Backpack body */}
            <div
              className={`bp-body relative w-[22rem] sm:w-[28rem] lg:w-[32rem] h-[38rem] sm:h-[44rem] lg:h-[48rem] bp-fabric rounded-b-[56px] rounded-t-[36px] preserve-3d ${isOpen ? 'bp-body--open' : ''} ${closing ? 'bp-body--closing' : ''}`}
            >
              {/* Rivets */}
              <Rivet size={12} className="absolute bottom-6 left-6" />
              <Rivet size={12} className="absolute bottom-6 right-6" />
              <Rivet size={10} className="absolute top-28 left-6" />
              <Rivet size={10} className="absolute top-28 right-6" />

              {/* Top handle */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-32 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, var(--metal-2), var(--metal-0))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 8px rgba(0,0,0,0.5)' }} />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-2.5 rounded-full" style={{ background: 'linear-gradient(180deg, #3a2614, #221610)', boxShadow: 'inset 0 1px 0 rgba(255,200,150,0.1)' }} />

              {/* CampusJugaad badge */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20">
                <span className="grid place-items-center w-12 h-12 rounded-xl" style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))', boxShadow: 'var(--glow-amber), 0 4px 12px -2px rgba(0,0,0,0.6)' }}>
                  <span className="font-display text-bg-0 text-sm leading-none">J</span>
                </span>
                <span className="font-technical text-[6px] text-amber/50">CAMPUSJUGAAD</span>
              </div>

              {/* Worn stickers */}
              <div className="bp-sticker absolute top-32 left-4" style={{ background: 'linear-gradient(135deg, var(--mint), var(--mint-deep))', transform: 'rotate(-6deg)', color: 'var(--bg-0)' }}>
                CSE-AI
              </div>
              <div className="bp-sticker absolute top-40 right-4 text-bg-0" style={{ background: 'linear-gradient(135deg, var(--coral), #a04040)', transform: 'rotate(8deg)' }}>
                2024
              </div>

              {/* === Flap === */}
              <div
                className={`bp-flap absolute top-0 inset-x-0 h-[42%] rounded-t-[36px] bp-fabric z-30 ${isOpen ? 'bp-flap--open' : ''} ${closing ? 'bp-flap--closing' : ''}`}
                style={{ borderBottom: '2px solid rgba(0,0,0,0.4)' }}
              >
                <div className="absolute inset-3 bp-stitch rounded-[20px]" />

                {/* Zipper track */}
                <div className="absolute bottom-0 inset-x-5 flex items-center">
                  <div className="flex-1 zipper-teeth" style={{ height: '6px' }} />
                </div>

                {/* Zipper pull */}
                <div
                  className="absolute bottom-[-3px] right-8 z-40"
                  style={{
                    transform: isOpen ? 'translateX(-360%)' : 'translateX(0)',
                    transition: 'transform 1s cubic-bezier(0.34, 1.2, 0.64, 1)',
                  }}
                >
                  <div className="relative">
                    <div className="w-5 h-7 rounded-sm" style={{ background: 'var(--metal-edge)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 6px rgba(0,0,0,0.6)' }} />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: 'var(--metal-edge)', background: 'var(--metal-0)' }} />
                  </div>
                </div>

                {/* Keychain */}
                <div className="absolute -bottom-5 right-12 flex flex-col items-center pointer-events-none">
                  <div className="w-0.5 h-6 bg-metal-2" />
                  <div className="w-5 h-5 rounded-full" style={{ background: 'var(--amber)', boxShadow: 'var(--glow-amber)' }} />
                </div>
              </div>

              {/* === Interior compartment === */}
              <div className={`absolute top-[42%] inset-x-0 h-[42%] px-4 sm:px-6 pt-3 bp-content ${isOpen ? 'bp-content--visible' : ''}`}>
                <div className="h-full bp-fabric-inner rounded-2xl p-4 relative overflow-visible">
                  {/* Interior warm light */}
                  <div className="absolute inset-0 bp-interior-light rounded-2xl" style={{ opacity: isOpen ? 1 : 0 }} />
                  <div className="absolute inset-3 bp-stitch rounded-xl opacity-30" />

                  {/* === LAPTOP — center, rises from main compartment === */}
                  {isOpen && !closing && (
                    <button
                      onClick={() => setActiveObject('laptop')}
                      className="bp-object bp-object--emerge absolute left-1/2 -translate-x-1/2 top-2 z-20"
                      style={{ animationDelay: '0.3s' }}
                    >
                      <LaptopObject />
                      <span className="bp-obj-label" style={{ bottom: '-26px', left: '50%', transform: 'translateX(-50%) translateY(4px)' }}>MY WORK</span>
                    </button>
                  )}

                  {/* === NOTEBOOK — left, slides from front pocket === */}
                  {isOpen && !closing && (
                    <button
                      onClick={() => setActiveObject('tasks')}
                      className="bp-object bp-object--emerge absolute left-0 -top-3 z-30"
                      style={{ animationDelay: '0.5s' }}
                    >
                      <NotebookObject />
                      <span className="bp-obj-label" style={{ bottom: '-26px', left: '50%', transform: 'translateX(-50%) translateY(4px)' }}>MY NOTES</span>
                    </button>
                  )}

                  {/* === PHONE — right side pocket === */}
                  {isOpen && !closing && (
                    <div className="absolute right-2 top-3 bottom-3 w-16 bp-fabric rounded-lg flex items-center justify-center z-10" style={{ borderLeft: '2px solid rgba(0,0,0,0.3)', boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.4)' }}>
                      <button
                        onClick={() => setActiveObject('messages')}
                        className="bp-object bp-object--emerge"
                        style={{ animationDelay: '0.7s' }}
                      >
                        <PhoneObject />
                        <span className="bp-obj-label" style={{ bottom: '-26px', left: '50%', transform: 'translateX(-50%) translateY(4px)' }}>MESSAGES</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* === Front pocket — Wallet === */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 sm:w-72 h-28 sm:h-32 bp-fabric-inner rounded-2xl z-10" style={{ borderTop: '2px solid rgba(0,0,0,0.25)' }}>
                <div className="absolute top-2 inset-x-5 zipper-teeth" style={{ height: '4px' }} />
                <div className="absolute top-0.5 right-8 w-3 h-4 rounded-sm" style={{ background: 'var(--metal-edge)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.5)' }} />
                <div className="absolute inset-3 bp-stitch rounded-xl opacity-30" />

                {isOpen && !closing && (
                  <button
                    onClick={() => setActiveObject('earnings')}
                    className="bp-object bp-object--emerge absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20"
                    style={{ animationDelay: '0.6s' }}
                  >
                    <WalletObject />
                    <span className="bp-obj-label" style={{ bottom: '-26px', left: '50%', transform: 'translateX(-50%) translateY(4px)' }}>EARNINGS</span>
                  </button>
                )}
              </div>

              {/* === Student ID — hanging from right side === */}
              {isOpen && !closing && (
                <button
                  onClick={() => setActiveObject('id')}
                  className="bp-object bp-object--swing bp-object--emerge absolute top-4 -right-8 z-40"
                  style={{ animationDelay: '0.9s' }}
                >
                  <IDObject />
                  <span className="bp-obj-label" style={{ top: '-24px', right: '0', transform: 'translateY(4px)' }}>PROFILE</span>
                </button>
              )}

              {/* Straps */}
              <div className="bp-strap absolute -top-3 left-12 w-5 h-56 rounded-full opacity-70" style={{ transform: 'rotate(-10deg)' }} />
              <div className="bp-strap absolute -top-3 right-12 w-5 h-56 rounded-full opacity-70" style={{ transform: 'rotate(10deg)' }} />
              <div className="absolute top-20 left-11 w-6 h-3.5 rounded-sm surface-metal" style={{ transform: 'rotate(-10deg)' }} />
              <div className="absolute top-20 right-11 w-6 h-3.5 rounded-sm surface-metal" style={{ transform: 'rotate(10deg)' }} />
            </div>

            {/* Open / Close button */}
            {!isOpen ? (
              <div className="mt-12 text-center anim-reveal">
                <button
                  onClick={handleOpen}
                  disabled={opening}
                  className={`machine-control machine-control--primary anim-open-pulse ${opening ? 'opacity-70' : ''}`}
                  style={{ padding: '16px 30px' }}
                >
                  <span className="ctrl-led" />
                  <span className="flex items-center gap-2">
                    {opening ? (<><Zap size={14} /> OPENING...</>) : (<><BackpackIcon size={14} /> OPEN BACKPACK</>)}
                  </span>
                </button>
              </div>
            ) : (
              <div className="mt-10 text-center">
                <button
                  onClick={handleClose}
                  disabled={closing}
                  className={`machine-control machine-control--ghost ${closing ? 'opacity-70' : ''}`}
                  style={{ padding: '12px 24px' }}
                >
                  <span className="ctrl-led" />
                  <span className="flex items-center gap-2">
                    <BackpackIcon size={14} /> {closing ? 'CLOSING...' : 'CLOSE BACKPACK'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-metal-2/50" />
          <span className="font-editorial text-sm text-ink-3">everything you carry</span>
          <span className="h-px w-16 bg-metal-2/50" />
        </div>
      </main>

      {/* === 3D Flip Card overlays === */}
      {activeObject && (
        <FlipCard type={activeObject} onClose={() => setActiveObject(null)} />
      )}
    </div>
  );
}

/* ================ 3D FLIP CARD ================ */

function FlipCard({ type, onClose }) {
  const [flipped, setFlipped] = useState(false);

  const config = {
    laptop: { title: 'MY WORK', icon: <LaptopIcon />, color: 'mint', accent: 'rgba(93,184,154,0.2)' },
    tasks: { title: 'MY NOTES', icon: <NotebookIcon />, color: 'amber', accent: 'rgba(214,138,60,0.2)' },
    messages: { title: 'MESSAGES', icon: <PhoneIcon />, color: 'amber', accent: 'rgba(214,138,60,0.2)' },
    earnings: { title: 'EARNINGS', icon: <WalletIcon />, color: 'amber', accent: 'rgba(214,138,60,0.2)' },
    id: { title: 'PROFILE', icon: <IDIcon />, color: 'amber', accent: 'rgba(214,138,60,0.2)' },
  };

  const cfg = config[type];

  return (
    <div className="workshop-overlay" onClick={onClose}>
      <div
        className="workshop-panel relative w-full max-w-lg mx-4"
        style={{ perspective: '1600px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full transition-transform duration-700 preserve-3d"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* === FRONT === */}
          <div
            className="absolute inset-0 surface-metal-brushed rounded-2xl p-8 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', border: `1px solid ${cfg.accent}` }}
          >
            <Rivet size={9} className="absolute top-3 left-3" />
            <Rivet size={9} className="absolute top-3 right-3" />
            <Rivet size={9} className="absolute bottom-3 left-3" />
            <Rivet size={9} className="absolute bottom-3 right-3" />

            <div className="mb-6">{cfg.icon}</div>
            <h2 className="font-display text-2xl text-ink-0 mb-2">{cfg.title}</h2>
            <p className="font-mono text-[10px] text-ink-3 mb-6">click to open</p>
            <button
              onClick={() => setFlipped(true)}
              className="machine-control machine-control--primary"
              style={{ padding: '12px 24px' }}
            >
              <span className="ctrl-led" />
              <span className="flex items-center gap-2">OPEN</span>
            </button>
          </div>

          {/* === BACK === */}
          <div
            className="absolute inset-0 surface-panel rounded-2xl p-6 overflow-y-auto max-h-[85vh]"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', border: `1px solid ${cfg.accent}` }}
          >
            <Rivet size={9} className="absolute top-3 left-3" />
            <Rivet size={9} className="absolute top-3 right-3" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-metal-2/30">
              <span className="font-technical text-[10px] text-ink-0">{cfg.title}</span>
              <div className="flex items-center gap-2">
                <LED color={cfg.color} pulse size={4} />
                <button
                  onClick={() => setFlipped(false)}
                  className="font-technical text-[8px] text-ink-2 hover:text-ink-0 transition-colors"
                >
                  ← BACK
                </button>
              </div>
            </div>

            {/* Content */}
            {type === 'laptop' && <LaptopContent />}
            {type === 'tasks' && <TasksContent />}
            {type === 'messages' && <MessagesContent />}
            {type === 'earnings' && <EarningsContent />}
            {type === 'id' && <ProfileContent />}

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 grid place-items-center w-8 h-8 rounded-full surface-metal text-ink-1 hover:text-ink-0 text-sm font-bold z-30"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Spacer to give the absolute-positioned card height */}
        <div style={{ minHeight: '420px' }} />
      </div>
    </div>
  );
}

/* ================ CARD CONTENTS ================ */

function LaptopContent() {
  const [selected, setSelected] = useState(null);
  if (selected) {
    return (
      <div className="anim-reveal">
        <button onClick={() => setSelected(null)} className="font-mono text-[9px] text-ink-3 hover:text-ink-0 transition-colors mb-4">← back to projects</button>
        <div className="text-4xl mb-2">{selected.emoji}</div>
        <h3 className="font-display text-xl text-ink-0">{selected.title}</h3>
        <p className="font-mono text-[10px] text-ink-2 mt-1">for {selected.client}</p>
        <p className="font-mono text-xs text-ink-1 mt-3 leading-relaxed">{selected.desc}</p>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <div className="surface-panel rounded-xl p-3 text-center">
            <p className="font-display text-base text-mint">{selected.progress}%</p>
            <p className="font-technical text-[6px] text-ink-3 mt-0.5">PROGRESS</p>
          </div>
          <div className="surface-panel rounded-xl p-3 text-center">
            <p className="font-display text-base text-amber">{selected.deadline}</p>
            <p className="font-technical text-[6px] text-ink-3 mt-0.5">DEADLINE</p>
          </div>
          <div className="surface-panel rounded-xl p-3 text-center">
            <p className="font-display text-base text-amber">{selected.budget}</p>
            <p className="font-technical text-[6px] text-ink-3 mt-0.5">BUDGET</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p className="font-mono text-[9px] text-ink-3 mb-3">{backpackProjects.length} active projects</p>
      <div className="space-y-3">
        {backpackProjects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="w-full text-left surface-panel rounded-xl p-4 anim-reveal hover:border-mint/30"
            style={{ animationDelay: `${i * 0.1}s`, border: '1px solid var(--metal-1)' }}
          >
            <div className="flex items-start gap-3">
              <div className="grid place-items-center w-10 h-10 rounded-lg shrink-0" style={{ background: 'rgba(93,184,154,0.08)', border: '1px solid rgba(93,184,154,0.2)' }}>
                <span className="text-lg">{p.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm text-ink-0">{p.title}</p>
                <p className="font-mono text-[9px] text-ink-3 mt-0.5">for {p.client}</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-technical text-[6px] text-ink-3">PROGRESS</span>
                    <span className="font-mono text-[8px] text-mint">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-1)' }}>
                    <div className="h-full rounded-full anim-meter-fill" style={{ width: `${p.progress}%`, background: 'linear-gradient(90deg, var(--mint), var(--mint-deep))' }} />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 font-mono text-[8px] text-ink-3"><Clock size={9} /> {p.deadline}</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[8px] text-amber"><IndianRupee size={9} /> {p.budget.replace('₹', '')}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TasksContent() {
  const [selected, setSelected] = useState(null);
  const STATUS = {
    urgent: { color: 'coral', label: 'DUE SOON', icon: AlertCircle },
    open: { color: 'amber', label: 'OPEN', icon: Clock },
    'in-progress': { color: 'amber', label: 'IN PROGRESS', icon: Clock },
    completed: { color: 'mint', label: 'DONE', icon: CheckCircle2 },
  };
  if (selected) {
    const cfg = STATUS[selected.status];
    return (
      <div className="anim-reveal">
        <button onClick={() => setSelected(null)} className="font-mono text-[9px] text-ink-3 hover:text-ink-0 transition-colors mb-4">← back to tasks</button>
        <div className="text-3xl mb-2">{selected.emoji}</div>
        <h3 className="font-display text-xl text-ink-0">{selected.text}</h3>
        <p className="font-mono text-[10px] text-ink-2 mt-2">{selected.detail}</p>
        <div className="mt-4 inline-flex items-center gap-2 surface-panel rounded-lg px-3 py-2">
          <LED color={cfg.color} size={4} />
          <span className="font-technical text-[8px] text-ink-1">{cfg.label}</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p className="font-mono text-[9px] text-ink-3 mb-3">{backpackTasks.filter((t) => t.status !== 'completed').length} active tasks</p>
      <div className="space-y-2.5">
        {backpackTasks.map((task, i) => {
          const cfg = STATUS[task.status];
          return (
            <button
              key={task.id}
              onClick={() => setSelected(task)}
              className="w-full text-left surface-panel rounded-lg p-3 anim-reveal hover:border-amber/30 transition-colors"
              style={{ animationDelay: `${i * 0.08}s`, border: '1px solid var(--metal-1)' }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{task.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-editorial text-sm text-ink-0">{task.text}</p>
                  <p className="font-mono text-[8px] text-ink-3 mt-0.5">{task.sub}</p>
                </div>
                <span className="font-technical text-[7px] px-2 py-1 rounded" style={{ background: `color-mix(in srgb, var(--${cfg.color}) 15%, transparent)`, color: `var(--${cfg.color})` }}>
                  {cfg.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MessagesContent() {
  const [selected, setSelected] = useState(null);
  if (selected) {
    return (
      <div className="anim-reveal">
        <button onClick={() => setSelected(null)} className="font-mono text-[9px] text-ink-3 hover:text-ink-0 transition-colors mb-4">← back to messages</button>
        <div className="flex items-center gap-3 mb-4">
          <div className="grid place-items-center w-10 h-10 rounded-full font-display text-bg-0 text-xs" style={{ background: selected.accent === 'mint' ? 'var(--mint)' : selected.accent === 'coral' ? 'var(--coral)' : 'var(--amber)' }}>
            {selected.initials}
          </div>
          <div>
            <p className="font-mono text-sm text-ink-0">{selected.from}</p>
            <p className="font-mono text-[8px] text-mint">ONLINE</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="max-w-[80%] surface-panel rounded-2xl rounded-tl-sm px-3 py-2.5">
            <p className="font-mono text-[11px] text-ink-1 leading-relaxed">{selected.preview}</p>
          </div>
          <div className="max-w-[80%] ml-auto rounded-2xl rounded-tr-sm px-3 py-2.5" style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))' }}>
            <p className="font-mono text-[11px] text-bg-0 leading-relaxed">Got it, thanks! Let me check and get back to you.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p className="font-mono text-[9px] text-ink-3 mb-3">{backpackMessages.filter((m) => m.unread).length} unread</p>
      <div className="space-y-2">
        {backpackMessages.map((msg, i) => (
          <button
            key={msg.id}
            onClick={() => setSelected(msg)}
            className="w-full text-left surface-panel rounded-lg p-3 anim-reveal hover:border-amber/30 transition-colors"
            style={{ animationDelay: `${i * 0.06}s`, border: '1px solid var(--metal-1)' }}
          >
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-9 h-9 rounded-full font-display text-bg-0 text-[10px] shrink-0" style={{ background: msg.accent === 'mint' ? 'var(--mint)' : msg.accent === 'coral' ? 'var(--coral)' : 'var(--amber)' }}>
                {msg.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-ink-0">{msg.from}</p>
                <p className="font-mono text-[10px] text-ink-2 truncate">{msg.preview}</p>
              </div>
              <span className="font-mono text-[7px] text-ink-3 shrink-0">{msg.time}</span>
              {msg.unread && <span className="w-2 h-2 rounded-full bg-amber shrink-0" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function EarningsContent() {
  return (
    <div>
      <div className="rounded-xl p-5 mb-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(214,138,60,0.10), rgba(214,138,60,0.02))', border: '1px solid rgba(214,138,60,0.2)' }}>
        <p className="font-technical text-[8px] text-ink-2">TOTAL EARNED</p>
        <div className="flex items-center gap-1 mt-1">
          <IndianRupee size={28} className="text-amber" />
          <p className="font-display text-4xl text-amber">{backpackEarnings.totalEarned.toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="surface-panel rounded-xl p-4">
          <p className="font-technical text-[7px] text-ink-3">THIS MONTH</p>
          <div className="flex items-center gap-0.5 mt-1">
            <IndianRupee size={18} className="text-mint" />
            <p className="font-display text-2xl text-mint">{backpackEarnings.thisMonth}</p>
          </div>
        </div>
        <div className="surface-panel rounded-xl p-4">
          <p className="font-technical text-[7px] text-ink-3">COMPLETED</p>
          <p className="font-display text-2xl text-ink-0 mt-1">{backpackEarnings.completedJugaads}</p>
        </div>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <span className="font-technical text-[7px] text-ink-3">RECENT</span>
        <span className="h-px flex-1 bg-metal-1" />
      </div>
      <div className="space-y-2">
        {backpackEarnings.history.map((e, i) => (
          <div key={e.id} className="surface-panel rounded-lg px-3 py-2.5 flex items-center gap-3 anim-reveal" style={{ animationDelay: `${i * 0.06}s` }}>
            <span className="text-sm">{e.emoji}</span>
            <span className="font-mono text-[10px] text-ink-1 flex-1">{e.text}</span>
            <span className="font-mono text-[10px] text-mint">+₹{e.amount}</span>
            <span className="font-mono text-[8px] text-ink-3">{e.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileContent() {
  const { user: authUser } = useAuth();
  const profile = { ...backpackUser, ...(authUser || {}) };
  const avatar = profile.name?.slice(0, 2).toUpperCase() || backpackUser.avatar;

  return (
    <div>
      {/* Personal info */}
      <div className="flex items-center gap-4 mb-5">
        <div className="grid place-items-center w-14 h-14 rounded-xl font-display text-bg-0 text-lg shrink-0" style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))', boxShadow: 'var(--glow-amber)' }}>
          {avatar}
        </div>
        <div>
          <h3 className="font-display text-base text-ink-0">{profile.name}</h3>
          <p className="font-mono text-[9px] text-ink-2 mt-0.5">{profile.college}</p>
          <p className="font-mono text-[9px] text-ink-3">{profile.branch}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <div className="surface-panel rounded-lg p-3">
          <p className="font-technical text-[6px] text-ink-3">JUGAAD SCORE</p>
          <p className="font-display text-lg text-amber mt-0.5">{profile.jugaadScore}</p>
        </div>
        <div className="surface-panel rounded-lg p-3">
          <p className="font-technical text-[6px] text-ink-3">RATING</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={12} className="text-amber fill-amber" />
            <p className="font-display text-lg text-ink-0">{profile.rating}</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex items-center gap-2 mb-2">
        <Wrench size={11} className="text-amber" />
        <span className="font-technical text-[8px] text-ink-0">SKILLS</span>
        <span className="h-px flex-1 bg-metal-1/30" />
      </div>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {mockSkills.map((s) => (
          <span key={s.id} className="font-mono text-[9px] text-ink-1 px-2.5 py-1.5 rounded-md" style={{ background: 'var(--bg-2)', border: '1px solid var(--metal-1)' }}>
            {s.name}
          </span>
        ))}
      </div>

      {/* Achievements */}
      <div className="flex items-center gap-2 mb-2">
        <Award size={11} className="text-amber" />
        <span className="font-technical text-[8px] text-ink-0">ACHIEVEMENTS</span>
        <span className="h-px flex-1 bg-metal-1/30" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {mockAchievements.filter((a) => a.unlocked).map((a) => (
          <div key={a.id} className="surface-panel rounded-lg p-2.5 flex items-center gap-2">
            <span className="text-base">{a.emoji}</span>
            <span className="font-technical text-[8px] text-ink-1">{a.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================ PHYSICAL OBJECT VISUALS ================ */

function LaptopObject() {
  return (
    <div className="relative w-36 sm:w-40" style={{ transform: 'perspective(240px) rotateX(20deg)' }}>
      <div className="bp-laptop-screen relative w-full rounded-t-lg surface-panel overflow-hidden" style={{ border: '1px solid var(--metal-2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)', height: '6rem' }}>
        <div className="absolute inset-1.5 rounded-md" style={{ background: 'linear-gradient(180deg, rgba(93,184,154,0.18), rgba(93,184,154,0.06))' }}>
          <div className="h-2 bg-mint/30 mt-3 mx-2.5 rounded-sm" />
          <div className="h-1.5 bg-mint/20 mt-2 mx-2.5 rounded-sm w-3/4" />
          <div className="h-1.5 bg-mint/20 mt-1.5 mx-2.5 rounded-sm w-1/2" />
          <div className="absolute bottom-2 right-2.5 w-2 h-2 rounded-full bg-mint/60" style={{ boxShadow: '0 0 6px rgba(93,184,154,0.5)' }} />
        </div>
      </div>
      <div className="w-full h-3 rounded-b-lg surface-metal-brushed" />
      <div className="w-full h-0.5 bg-metal-0" />
    </div>
  );
}

function NotebookObject() {
  return (
    <div className="relative" style={{ transform: 'rotate(-6deg)', width: '5.5rem', height: '7rem' }}>
      <div className="absolute inset-0 rounded-sm surface-paper paper-fiber" style={{ clipPath: 'polygon(0 4%, 100% 0, 100% 96%, 0 100%)' }}>
        <div className="bp-spiral absolute top-1.5 bottom-1.5 left-1.5 w-2.5" />
        <div className="ml-6 mt-4">
          <div className="h-px bg-paper-ink/25" />
          <div className="h-px bg-paper-ink/25 mt-2.5" />
          <div className="h-px bg-paper-ink/25 mt-2.5" />
          <div className="h-px bg-paper-ink/25 mt-2.5 w-2/3" />
        </div>
      </div>
      <div className="absolute -bottom-3 right-2.5 w-2 h-7 bg-coral rounded-sm opacity-80" />
    </div>
  );
}

function WalletObject() {
  return (
    <div className="relative w-20 h-14 rounded-lg" style={{ background: 'linear-gradient(160deg, #3a2614 0%, #221610 100%)', border: '1px solid var(--metal-2)', boxShadow: 'inset 0 1px 0 rgba(255,200,150,0.1), 0 6px 12px -3px rgba(0,0,0,0.7)' }}>
      <div className="absolute inset-1.5 bp-stitch rounded-md" />
      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full" style={{ background: 'var(--metal-1)', border: '1px solid var(--metal-2)' }} />
      <div className="absolute -top-1.5 left-3 w-9 h-3 rounded-sm" style={{ background: 'var(--amber)', boxShadow: '0 1px 2px rgba(0,0,0,0.4)' }} />
    </div>
  );
}

function PhoneObject() {
  return (
    <div className="relative w-14 h-24 rounded-xl surface-metal" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 12px -3px rgba(0,0,0,0.7)' }}>
      <div className="bp-phone-screen absolute inset-1 rounded-lg surface-panel overflow-hidden flex flex-col">
        <div className="h-1.5 bg-bg-0/60 rounded-t-md" />
        <div className="flex-1 px-1.5 py-1">
          <div className="h-1 bg-amber/40 rounded-sm" />
          <div className="h-1 bg-ink-2/30 rounded-sm mt-1 w-3/4" />
          <div className="h-1 bg-mint/40 rounded-sm mt-1.5" />
          <div className="h-1 bg-ink-2/30 rounded-sm mt-1 w-2/3" />
          <div className="h-1 bg-amber/40 rounded-sm mt-1.5 w-1/2" />
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-bg-0 rounded-b-sm" />
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber" style={{ boxShadow: 'var(--glow-amber)' }} />
    </div>
  );
}

function IDObject() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="bp-lanyard w-1 h-9 -mb-1" />
      <div className="w-4 h-3 rounded-sm surface-metal mb-1.5" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />
      <div className="relative w-16 rounded-lg" style={{ background: 'linear-gradient(160deg, #2a2218 0%, #1c1610 100%)', border: '1.5px solid var(--metal-2)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.7)', height: '5.5rem' }}>
        <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded bg-amber" style={{ boxShadow: 'var(--glow-amber)' }} />
        <div className="absolute top-2 right-1.5 w-6 h-0.5 bg-paper/25" />
        <div className="absolute top-3.5 right-1.5 w-4 h-0.5 bg-paper/15" />
        <div className="absolute bottom-2 left-1.5 right-1.5">
          <div className="h-0.5 bg-paper/20 rounded-sm" />
          <div className="h-0.5 bg-paper/15 rounded-sm mt-1 w-2/3" />
        </div>
        <div className="absolute top-2.5 right-2 font-technical text-[5px] text-amber/40">ID</div>
      </div>
    </div>
  );
}

/* ================ CARD FRONT ICONS (large) ================ */

function LaptopIcon() {
  return (
    <div className="relative w-24 h-20" style={{ transform: 'perspective(300px) rotateX(15deg)' }}>
      <div className="absolute inset-0 rounded-t-lg surface-panel" style={{ border: '1px solid var(--metal-2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-2 rounded-md" style={{ background: 'linear-gradient(180deg, rgba(93,184,154,0.15), rgba(93,184,154,0.04))' }}>
          <div className="h-3 bg-mint/25 mt-4 mx-3 rounded-sm" />
          <div className="h-2 bg-mint/15 mt-2.5 mx-3 rounded-sm w-3/4" />
          <div className="h-2 bg-mint/15 mt-2 mx-3 rounded-sm w-1/2" />
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-2.5 rounded-b-lg surface-metal-brushed" />
    </div>
  );
}

function NotebookIcon() {
  return (
    <div className="relative w-16 h-20 surface-paper paper-fiber rounded-sm" style={{ transform: 'rotate(-4deg)', clipPath: 'polygon(0 3%, 100% 0, 100% 97%, 0 100%)' }}>
      <div className="bp-spiral absolute top-2 bottom-2 left-1.5 w-2.5" />
      <div className="ml-6 mt-5">
        <div className="h-0.5 bg-paper-ink/25" />
        <div className="h-0.5 bg-paper-ink/25 mt-3" />
        <div className="h-0.5 bg-paper-ink/25 mt-3" />
        <div className="h-0.5 bg-paper-ink/25 mt-3 w-2/3" />
      </div>
      <div className="absolute -bottom-2 right-2 w-1.5 h-5 bg-coral rounded-sm opacity-80" />
    </div>
  );
}

function PhoneIcon() {
  return (
    <div className="relative w-16 h-24 rounded-xl surface-metal" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 12px -3px rgba(0,0,0,0.7)' }}>
      <div className="absolute inset-1.5 rounded-lg surface-panel overflow-hidden flex flex-col">
        <div className="h-2 bg-bg-0/60 rounded-t-md" />
        <div className="flex-1 px-2 py-2">
          <div className="h-1.5 bg-amber/40 rounded-sm" />
          <div className="h-1.5 bg-ink-2/30 rounded-sm mt-2 w-3/4" />
          <div className="h-1.5 bg-mint/40 rounded-sm mt-2.5" />
          <div className="h-1.5 bg-ink-2/30 rounded-sm mt-2 w-2/3" />
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-2 bg-bg-0 rounded-b-sm" />
    </div>
  );
}

function WalletIcon() {
  return (
    <div className="relative w-24 h-16 rounded-lg" style={{ background: 'linear-gradient(160deg, #3a2614 0%, #221610 100%)', border: '1px solid var(--metal-2)', boxShadow: 'inset 0 1px 0 rgba(255,200,150,0.1), 0 6px 12px -3px rgba(0,0,0,0.7)' }}>
      <div className="absolute inset-2 bp-stitch rounded-md" />
      <div className="absolute top-2 right-2 w-6 h-6 rounded-full" style={{ background: 'var(--metal-1)', border: '1px solid var(--metal-2)' }} />
      <div className="absolute -top-2 left-4 w-12 h-4 rounded-sm" style={{ background: 'var(--amber)', boxShadow: '0 1px 2px rgba(0,0,0,0.4)' }} />
    </div>
  );
}

function IDIcon() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="bp-lanyard w-1.5 h-8 -mb-1" />
      <div className="w-5 h-3.5 rounded-sm surface-metal mb-1" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />
      <div className="relative w-20 h-24 rounded-lg" style={{ background: 'linear-gradient(160deg, #2a2218 0%, #1c1610 100%)', border: '2px solid var(--metal-2)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.7)' }}>
        <div className="absolute top-2 left-2 w-6 h-6 rounded bg-amber" style={{ boxShadow: 'var(--glow-amber)' }} />
        <div className="absolute top-3 right-2 w-8 h-1 bg-paper/25" />
        <div className="absolute top-5 right-2 w-6 h-1 bg-paper/15" />
        <div className="absolute bottom-3 left-2 right-2">
          <div className="h-1 bg-paper/20 rounded-sm" />
          <div className="h-1 bg-paper/15 rounded-sm mt-1.5 w-2/3" />
        </div>
      </div>
    </div>
  );
}

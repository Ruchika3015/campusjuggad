import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LED, Rivet } from '@/components/primitives/Details';
import { mockNotifications, mockConversations } from '@/data/workshopMockData';
import { WORLD_NAV } from '@/data/backpackMockData';
import {
  Home, Search, Plus, ClipboardList, User, LogOut, Menu, X,
  Bell, MessageSquare, Backpack as BackpackIcon,
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', icon: Home },
  { id: 'find', label: 'FIND A JUGAAD', icon: Search },
  { id: 'post', label: 'POST A JUGAAD', icon: Plus },
  { id: 'jugaads', label: 'MY JUGAADS', icon: ClipboardList },
  { id: 'profile', label: 'PROFILE', icon: User },
];

export function WorkshopNav({ active, onSelect }) {
  const { user, logout, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);

  const unreadNotifs = mockNotifications.filter((n) => n.unread).length;
  const unreadMsgs = mockConversations.filter((c) => c.unread).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleClick = (id) => {
    onSelect?.(id);
    setMobileOpen(false);
    setNotifOpen(false);
    setMsgOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 px-4 pt-4">
        <nav className="surface-metal-brushed metal-scratches relative max-w-7xl mx-auto rounded-2xl px-4 sm:px-5 py-2.5 flex items-center justify-between gap-2">
          <Rivet size={7} className="absolute top-2 left-2" />
          <Rivet size={7} className="absolute top-2 right-2" />
          <Rivet size={7} className="absolute bottom-2 left-2" />
          <Rivet size={7} className="absolute bottom-2 right-2" />

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <span
              className="grid place-items-center w-7 h-7 rounded-lg"
              style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))' }}
            >
              <span className="font-display text-bg-0 text-xs leading-none">J</span>
            </span>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-xs tracking-tight text-ink-0">
                CAMPUS<span className="text-amber">JUGAAD</span>
              </span>
              <span className="font-technical text-[6px] text-ink-3 mt-0.5">WORKSHOP</span>
            </div>
          </Link>

          {/* Desktop nav items */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`group relative flex items-center gap-1.5 px-2.5 py-2 rounded-lg transition-colors ${isActive ? 'text-amber-soft' : 'text-ink-2 hover:text-ink-0'}`}
                >
                  {item.icon && <item.icon size={12} />}
                  <span className="font-technical text-[8px]">{item.label}</span>
                  {isActive && <LED color="amber" size={4} className="absolute -top-0.5 left-1/2 -translate-x-1/2" />}
                </button>
              );
            })}
          </div>

          {/* Right — notifications, messages, backpack, user, logout */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            {/* Notifications */}
            <button
              onClick={() => { setNotifOpen((v) => !v); setMsgOpen(false); }}
              className="relative grid place-items-center w-8 h-8 rounded-lg text-ink-2 hover:text-ink-0 transition-colors"
              style={{ background: notifOpen ? 'rgba(214,138,60,0.08)' : 'rgba(255,255,255,0.03)' }}
              aria-label="Notifications"
            >
              <Bell size={14} />
              {unreadNotifs > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid place-items-center w-3.5 h-3.5 rounded-full text-[7px] font-bold text-bg-0" style={{ background: 'var(--coral)' }}>
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Messages */}
            <button
              onClick={() => { setMsgOpen((v) => !v); setNotifOpen(false); }}
              className="relative grid place-items-center w-8 h-8 rounded-lg text-ink-2 hover:text-ink-0 transition-colors"
              style={{ background: msgOpen ? 'rgba(214,138,60,0.08)' : 'rgba(255,255,255,0.03)' }}
              aria-label="Messages"
            >
              <MessageSquare size={14} />
              {unreadMsgs > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid place-items-center w-3.5 h-3.5 rounded-full text-[7px] font-bold text-bg-0" style={{ background: 'var(--mint)' }}>
                  {unreadMsgs}
                </span>
              )}
            </button>

            <div className="w-px h-5 bg-metal-1/40 mx-0.5" />

            {/* Backpack link */}
            <Link
              to="/backpack"
              className="grid place-items-center w-8 h-8 rounded-lg text-ink-2 hover:text-amber-soft transition-colors"
              style={{ background: 'rgba(255,255,255,0.03)' }}
              aria-label="Backpack"
              title="Backpack"
            >
              <BackpackIcon size={14} />
            </Link>

            {/* User */}
            <button
              onClick={() => handleClick('profile')}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors"
              style={{ background: active === 'profile' ? 'rgba(214,138,60,0.08)' : 'rgba(255,255,255,0.03)' }}
            >
              <span className="grid place-items-center w-6 h-6 rounded-full text-bg-0 font-display text-[9px]" style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))' }}>
                {user?.name?.slice(0, 2).toUpperCase() || 'RC'}
              </span>
              <span className="font-mono text-[9px] text-ink-1 max-w-[80px] truncate">{user?.name || 'Operator'}</span>
              {isDemoMode && (
                <span className="font-technical text-[6px] text-amber/50 px-1 py-0.5 rounded" style={{ border: '1px solid rgba(214,138,60,0.15)' }}>
                  DEMO
                </span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="grid place-items-center w-8 h-8 rounded-lg text-ink-3 hover:text-coral-soft transition-colors"
              style={{ background: 'rgba(255,255,255,0.03)' }}
              aria-label="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden grid place-items-center w-8 h-8 rounded-lg text-ink-0"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(107,118,137,0.4)' }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close' : 'Open menu'}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>

        {/* Notifications panel */}
        {notifOpen && (
          <div className="hidden lg:block absolute top-full right-20 mt-2 w-80 surface-panel rounded-2xl p-4 anim-reveal z-50 shadow-2xl">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-metal-2/30">
              <div className="flex items-center gap-2">
                <Bell size={13} className="text-amber" />
                <span className="font-technical text-[9px] text-ink-0">NOTIFICATIONS</span>
              </div>
              <button className="font-technical text-[7px] text-mint hover:text-mint-soft transition-colors" onClick={() => setNotifOpen(false)}>
                MARK ALL READ
              </button>
            </div>
            <div className="space-y-2.5 max-h-64 overflow-y-auto">
              {mockNotifications.map((n) => (
                <div key={n.id} className="flex items-start gap-2.5 surface-metal rounded-lg p-2.5">
                  <span className="text-sm leading-none mt-0.5">{n.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-ink-1 leading-snug">{n.text}</p>
                    <p className="font-mono text-[8px] text-ink-3 mt-0.5">{n.time}</p>
                  </div>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-coral shrink-0 mt-1" />}
                </div>
              ))}
            </div>
            <button onClick={() => setNotifOpen(false)} className="absolute -top-2 -right-2 grid place-items-center w-7 h-7 rounded-full surface-metal text-ink-2 hover:text-ink-0 text-xs" aria-label="Close">✕</button>
          </div>
        )}

        {/* Messages panel */}
        {msgOpen && (
          <div className="hidden lg:block absolute top-full right-20 mt-2 w-80 surface-panel rounded-2xl p-4 anim-reveal z-50 shadow-2xl">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-metal-2/30">
              <div className="flex items-center gap-2">
                <MessageSquare size={13} className="text-mint" />
                <span className="font-technical text-[9px] text-ink-0">MESSAGES</span>
              </div>
              <span className="font-mono text-[8px] text-ink-3">{unreadMsgs} unread</span>
            </div>
            <div className="space-y-2.5 max-h-64 overflow-y-auto">
              {mockConversations.map((c) => (
                <div key={c.id} className="flex items-center gap-2.5 surface-metal rounded-lg p-2.5">
                  <span className="grid place-items-center w-8 h-8 rounded-full text-bg-0 font-display text-[10px] shrink-0" style={{ background: `var(--${c.accent})` }}>
                    {c.initials}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-ink-0">{c.from}</p>
                    <p className="font-mono text-[9px] text-ink-2 truncate">{c.preview}</p>
                  </div>
                  <span className="font-mono text-[8px] text-ink-3 shrink-0">{c.time}</span>
                  {c.unread && <span className="w-2 h-2 rounded-full bg-mint shrink-0" />}
                </div>
              ))}
            </div>
            <button onClick={() => setMsgOpen(false)} className="absolute -top-2 -right-2 grid place-items-center w-7 h-7 rounded-full surface-metal text-ink-2 hover:text-ink-0 text-xs" aria-label="Close">✕</button>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-4 right-4 mt-2 surface-panel rounded-2xl p-4 flex flex-col gap-1 anim-reveal z-50">
            <span className="font-technical text-[7px] text-ink-3 px-3 pt-1 pb-0.5">WORKSHOP</span>
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'text-amber-soft bg-white/5' : 'text-ink-1 hover:text-ink-0'}`}
                >
                  {item.icon && <item.icon size={14} />}
                  <span className="font-technical text-[10px]">{item.label}</span>
                  {isActive && <LED color="amber" size={4} />}
                </button>
              );
            })}
            <div className="h-px bg-metal-1 my-1" />
            <span className="font-technical text-[7px] text-ink-3 px-3 pt-1 pb-0.5">PERSONAL</span>
            <Link
              to="/backpack"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-ink-1 hover:text-ink-0 transition-colors"
            >
              <BackpackIcon size={14} />
              <span className="font-technical text-[10px]">BACKPACK</span>
            </Link>
            <div className="h-px bg-metal-1 my-1" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-ink-3 hover:text-coral-soft transition-colors"
            >
              <LogOut size={14} />
              <span className="font-technical text-[10px]">EXIT WORKSHOP</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
}

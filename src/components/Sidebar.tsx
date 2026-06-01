import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SidebarProgress } from './SidebarProgress';
import { LayoutDashboard, Calendar, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Task } from '../types';
import '../styles/sidebar.css';

interface SidebarProps {
  tasks: Task[];
}

export function Sidebar({ tasks }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const initials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  const currentPath = location.pathname;

  return (
    <aside
      className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}
      aria-label="Sidebar de navegação"
    >
      {/* ── Brand ── */}
      <div className="sidebar__brand">
        <div className="sidebar__brand-logo">
          <span className="sidebar__brand-icon">OG</span>
        </div>
        {!isCollapsed && (
          <div className="sidebar__brand-text">
            <span className="sidebar__brand-name">Organize.</span>
            <span className="sidebar__brand-sub">Me</span>
          </div>
        )}
        <button
          className="sidebar__toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir' : 'Recolher'}
          type="button"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* ── User Profile (clickable) ── */}
      <button
        className="sidebar__profile"
        onClick={() => navigate('/profile')}
        title="Meu perfil"
        type="button"
        style={{ cursor: 'pointer', border: 'none', width: '100%', textAlign: 'left' }}
      >
        <div className="sidebar__avatar">
          <span>{initials}</span>
        </div>
        {!isCollapsed && (
          <div className="sidebar__profile-info">
            <span className="sidebar__profile-name">{user?.name}</span>
            <span className="sidebar__profile-email">{user?.email}</span>
          </div>
        )}
      </button>

      {/* ── Divider ── */}
      <div className="sidebar__divider" />

      {/* ── Navigation ── */}
      <nav className="sidebar__nav" aria-label="Menu principal">
        <span className="sidebar__nav-label">Menu</span>

        <button
          className={`sidebar__item ${currentPath === '/dashboard' ? 'sidebar__item--active' : ''}`}
          onClick={() => navigate('/dashboard')}
          title="Dashboard"
          type="button"
        >
          <span className={`sidebar__item-icon ${currentPath === '/dashboard' ? 'sidebar__item-icon--active' : ''}`}>
            <LayoutDashboard size={18} strokeWidth={2} />
          </span>
          {!isCollapsed && <span className="sidebar__item-label">Dashboard</span>}
          {currentPath === '/dashboard' && !isCollapsed && <span className="sidebar__item-indicator" />}
        </button>

        <button
          className={`sidebar__item ${currentPath === '/calendar' ? 'sidebar__item--active' : ''}`}
          onClick={() => navigate('/calendar')}
          title="Calendário"
          type="button"
        >
          <span className={`sidebar__item-icon ${currentPath === '/calendar' ? 'sidebar__item-icon--active' : ''}`}>
            <Calendar size={18} strokeWidth={2} />
          </span>
          {!isCollapsed && <span className="sidebar__item-label">Calendário</span>}
          {currentPath === '/calendar' && !isCollapsed && <span className="sidebar__item-indicator" />}
        </button>
      </nav>

      {/* ── Divider ── */}
      <div className="sidebar__divider" />

      {/* ── Progress ── */}
      {!isCollapsed && <SidebarProgress tasks={tasks} />}

      {/* ── Bottom Section ── */}
      <div className="sidebar__bottom">
        <div className="sidebar__divider" />

        <button
          className="sidebar__logout"
          onClick={logout}
          type="button"
          title="Sair da conta"
        >
          <LogOut size={18} strokeWidth={2} />
          {!isCollapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
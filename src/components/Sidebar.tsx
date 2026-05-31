import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { SidebarProgress } from './SidebarProgress';
import { LayoutDashboard, CheckSquare, Calendar, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import type { Task } from '../types';
import '../styles/sidebar.css';

interface SidebarProps {
  tasks: Task[];
}

export function Sidebar({ tasks }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const { user, logout } = useAuth();

  const initials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tarefas', icon: CheckSquare },
    { id: 'calendar', label: 'Calendário', icon: Calendar },
    { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

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

      {/* ── Search (only when expanded) ── */}
      {!isCollapsed && (
        <div className="sidebar__search">
          <Search size={16} className="sidebar__search-icon" />
          <input
            type="text"
            placeholder="Buscar..."
            className="sidebar__search-input"
          />
        </div>
      )}

      {/* ── User Profile ── */}
      <div className="sidebar__profile">
        <div className="sidebar__avatar">
          <span>{initials}</span>
        </div>
        {!isCollapsed && (
          <div className="sidebar__profile-info">
            <span className="sidebar__profile-name">{user?.name}</span>
            <span className="sidebar__profile-email">{user?.email}</span>
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="sidebar__divider" />

      {/* ── Navigation ── */}
      <nav className="sidebar__nav" aria-label="Menu principal">
        <span className="sidebar__nav-label">Menu</span>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}
              onClick={() => setActiveItem(item.id)}
              title={item.label}
              type="button"
            >
              <span className={`sidebar__item-icon ${isActive ? 'sidebar__item-icon--active' : ''}`}>
                <Icon size={18} strokeWidth={2} />
              </span>
              {!isCollapsed && <span className="sidebar__item-label">{item.label}</span>}
              {isActive && !isCollapsed && <span className="sidebar__item-indicator" />}
            </button>
          );
        })}
      </nav>

      {/* ── Divider ── */}
      <div className="sidebar__divider" />

      {/* ── Progress ── */}
      {!isCollapsed && <SidebarProgress tasks={tasks} />}

      {/* ── Bottom Section ── */}
      <div className="sidebar__bottom">
        <div className="sidebar__divider" />

        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar__item ${activeItem === item.id ? 'sidebar__item--active' : ''}`}
              onClick={() => setActiveItem(item.id)}
              title={item.label}
              type="button"
            >
              <span className={`sidebar__item-icon ${activeItem === item.id ? 'sidebar__item-icon--active' : ''}`}>
                <Icon size={18} strokeWidth={2} />
              </span>
              {!isCollapsed && <span className="sidebar__item-label">{item.label}</span>}
            </button>
          );
        })}

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
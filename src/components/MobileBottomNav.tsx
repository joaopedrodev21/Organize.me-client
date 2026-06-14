import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, Calendar, User, LogOut } from 'lucide-react';

export function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const currentPath = location.pathname;

  return (
    <nav className="mobile-bottom-nav" aria-label="Navegação mobile">
      <button
        className={`mobile-bottom-nav__item ${currentPath === '/dashboard' ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => navigate('/dashboard')}
        type="button"
        aria-label="Dashboard"
      >
        <LayoutDashboard size={20} strokeWidth={2} />
        <span>Dashboard</span>
      </button>

      <button
        className={`mobile-bottom-nav__item ${currentPath === '/calendar' ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => navigate('/calendar')}
        type="button"
        aria-label="Calendário"
      >
        <Calendar size={20} strokeWidth={2} />
        <span>Calendário</span>
      </button>

      <button
        className={`mobile-bottom-nav__item ${currentPath === '/profile' ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => navigate('/profile')}
        type="button"
        aria-label="Perfil"
      >
        <User size={20} strokeWidth={2} />
        <span>Perfil</span>
      </button>

      <button
        className="mobile-bottom-nav__item mobile-bottom-nav__item--danger"
        onClick={logout}
        type="button"
        aria-label="Sair"
      >
        <LogOut size={20} strokeWidth={2} />
        <span>Sair</span>
      </button>
    </nav>
  );
}
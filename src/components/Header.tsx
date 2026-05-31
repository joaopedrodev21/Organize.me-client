import { useAuth } from '../hooks/useAuth';
import { LogOut } from 'lucide-react';

export function Header() {
    const { user, logout } = useAuth();

    const initials = user?.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || '?';

    return (
        <header className="hidden">
            <h2>📋 Manager Tasks</h2>
            <div className="flex items-center gap-4 flex-wrap text-white">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 border border-brand-500/30 text-sm font-bold text-brand-200"
                        title={user?.name}
                    >
                        {initials}
                    </div>
                    <span className="text-sm font-semibold">Olá, {user?.name}</span>
                </div>
                <button
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
                    onClick={logout}
                >
                    <LogOut size={14} strokeWidth={2} />
                    Sair
                </button>
            </div>
        </header>
    );
}
import { LogOut } from 'lucide-react';

const roleStyles = {
  manager: 'bg-blue-100 text-blue-700',
  hr: 'bg-purple-100 text-purple-700',
};

function Navbar({ user, onLogout }) {
  const roleLabel = user.role === 'hr' ? 'HR Admin' : 'Manager';

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-xl">
            🔥
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Burnout Copilot</h1>
            <p className="text-xs font-medium text-slate-500">Employee wellbeing intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 px-3 py-2 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {user.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${roleStyles[user.role]}`}>
                {roleLabel}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2 text-center text-xs font-medium text-slate-500">
        AI decision-support only — not a substitute for managerial judgment
      </div>
    </header>
  );
}

export default Navbar;

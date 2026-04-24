import { useState } from 'react';
import { MOCK_USERS } from '../data/employees';

const demoAccounts = [
  { label: 'Manager A', email: 'manager@company.com', password: 'demo123' },
  { label: 'Manager B', email: 'manager2@company.com', password: 'demo123' },
  { label: 'HR Admin', email: 'hr@company.com', password: 'demo123' },
];

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = MOCK_USERS.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.trim().toLowerCase() &&
        candidate.password === password,
    );

    if (!user) {
      setError('Invalid email or password. Try one of the demo accounts below.');
      return;
    }

    setError('');
    onLogin(user);
  };

  const fillDemoAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 px-4 py-8 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="w-full rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-4xl shadow-inner">
              🔥
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Burnout Copilot</h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              AI-powered Employee Wellbeing System
            </p>
          </div>

          <form className="mx-auto mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="manager@company.com"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Password</span>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="demo123"
                required
              />
            </label>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <button
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Demo Accounts
              </h2>
              <span className="text-xs font-medium text-slate-400">Click to auto-fill</span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {demoAccounts.map((account) => (
                <button
                  className="rounded-xl border border-white bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100"
                  key={account.email}
                  onClick={() => fillDemoAccount(account)}
                  type="button"
                >
                  <p className="font-semibold text-slate-900">{account.label}</p>
                  <p className="mt-1 text-xs text-slate-500">{account.email}</p>
                  <p className="mt-2 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {account.password}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;

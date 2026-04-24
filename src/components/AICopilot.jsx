import { useState } from 'react';

const API_KEY = 'YOUR_API_KEY';

const formatClaudeResponse = (payload) => {
  const firstBlock = payload?.content?.[0];
  if (firstBlock?.text) {
    return firstBlock.text;
  }
  return 'No suggestions were returned. Please try again.';
};

function AICopilot({ employee }) {
  const [status, setStatus] = useState('idle');
  const [suggestions, setSuggestions] = useState('');
  const [error, setError] = useState('');

  const generateSuggestions = async () => {
    setStatus('loading');
    setError('');
    setSuggestions('');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          system: `You are a compassionate HR advisor helping managers 
             support employees showing early burnout signals. 
             Given an employee's risk data, provide exactly 3 
             specific, empathetic, actionable suggestions a manager 
             can take this week. Format as a numbered list.
             Rules:
             - Never say the employee IS burned out
             - Frame everything as early signals
             - Be specific not generic
             - Keep each suggestion to 2 sentences max
             - End with one sentence of encouragement for the manager`,
          messages: [
            {
              role: 'user',
              content: 'Employee data: ' + JSON.stringify(employee),
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(
          API_KEY === 'YOUR_API_KEY'
            ? 'Add an Anthropic API key in AICopilot.jsx to generate live suggestions.'
            : `Anthropic request failed with status ${response.status}.`,
        );
      }

      const payload = await response.json();
      setSuggestions(formatClaudeResponse(payload));
      setStatus('success');
    } catch (requestError) {
      setError(requestError.message || 'Unable to generate suggestions right now.');
      setStatus('error');
    }
  };

  if (status === 'loading') {
    return (
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-blue-800">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-300 border-t-blue-700" />
          <p className="font-semibold">Analyzing risk profile...</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="mb-3 text-lg font-bold text-blue-900">✨ Suggested next steps</div>
        <div className="whitespace-pre-line text-sm leading-6 text-slate-700">{suggestions}</div>
        <p className="mt-4 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-blue-700">
          Advisory only. Manager judgment prevails.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <p className="mb-4 text-sm font-semibold text-red-700">{error}</p>
        <button
          type="button"
          onClick={generateSuggestions}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={generateSuggestions}
      className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
    >
      Generate Manager Suggestions
    </button>
  );
}

export default AICopilot;

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { riskBarColor, riskDotClass } from '../utils'

function TeamTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const employee = payload[0].payload

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
      <p className="font-semibold text-gray-900">{employee.name}</p>
      <p className="mt-1 text-sm text-gray-600">Score: {employee.burnout.score}</p>
      <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className={`h-2.5 w-2.5 rounded-full ${riskDotClass(employee.burnout.riskLevel)}`} />
        {employee.burnout.riskLevel} risk
      </p>
    </div>
  )
}

export default function TeamRiskChart({ employees }) {
  const data = employees.map((employee) => ({
    ...employee,
    firstName: employee.name.split(' ')[0],
    score: employee.burnout.score,
  }))

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="firstName" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip content={<TeamTooltip />} cursor={{ fill: '#f8fafc' }} />
            <ReferenceLine y={40} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Low threshold', fill: '#16a34a', fontSize: 12 }} />
            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'High threshold', fill: '#dc2626', fontSize: 12 }} />
            <Bar dataKey="score" radius={[10, 10, 0, 0]}>
              {data.map((employee) => (
                <Cell key={employee.id} fill={riskBarColor(employee.burnout.riskLevel)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

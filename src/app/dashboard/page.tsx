'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';
import { StatusBadge } from '@/components/StatusBadge';
import { dashboardStats, chartData, events, formatCLP } from '@/lib/mock-data';
import { Download, Search, Clock, Send, Building2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

const COLORS = {
  liquidado: '#22c55e',
  pagado: '#3b82f6',
  expirado: '#ef4444',
  enviado: '#eab308',
  generado: '#9ca3af',
  anulado: '#d1d5db',
};

const pieData = [
  { name: 'Enviado', value: dashboardStats.enviados.count, color: '#eab308' },
  { name: 'Pagado', value: dashboardStats.pagados.count, color: '#3b82f6' },
];

type ViewMode = 'TOTALES' | 'COMISIONES' | 'CANTIDAD';

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('CANTIDAD');
  const [searchEvents, setSearchEvents] = useState('');
  const [filters, setFilters] = useState({
    reajustes: true,
    renovaciones: true,
    vouchers: false,
    recordatorios: true,
  });

  const filteredEvents = events.filter((e) => {
    if (!filters.reajustes && e.type === 'reajuste') return false;
    if (!filters.renovaciones && e.type === 'renovacion') return false;
    if (!filters.vouchers && e.type === 'voucher') return false;
    if (!filters.recordatorios && e.type === 'recordatorio') return false;
    if (searchEvents && !e.propertyAddress.toLowerCase().includes(searchEvents.toLowerCase())) return false;
    return true;
  });

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 text-sm">Revisa tus indicadores y vouchers</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
              <Download className="w-4 h-4" />
              Descargar
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Resumen por periodo</h2>
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value as ViewMode)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700"
                  >
                    <option value="TOTALES">Totales</option>
                    <option value="COMISIONES">Comisiones</option>
                    <option value="CANTIDAD">Cantidad</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="liquidado" name="Liquidado" fill={COLORS.liquidado} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="pagado" name="Pagado" fill={COLORS.pagado} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="expirado" name="Expirado" fill={COLORS.expirado} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="enviado" name="Enviado" fill={COLORS.enviado} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="generado" name="Generado" fill={COLORS.generado} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Resumen Vouchers</h2>
                    <span className="text-sm text-gray-500">Jul. 2026</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-40 h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={70}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={index} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalVouchers}</p>
                      <p className="text-sm text-gray-500">Total</p>
                      <div className="mt-3 space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                          <span className="text-gray-600">Enviado</span>
                          <span className="ml-auto font-medium">{dashboardStats.enviados.count}</span>
                          <span className="text-gray-400">{dashboardStats.enviados.percentage}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                          <span className="text-gray-600">Pagado</span>
                          <span className="ml-auto font-medium">{dashboardStats.pagados.count}</span>
                          <span className="text-gray-400">{dashboardStats.pagados.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* General summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Resumen General</h2>
                  <p className="text-xs text-gray-500 mb-4">Resumen de tus métricas mensuales</p>
                  <p className="text-xs text-gray-600 mb-4">
                    El mes anterior generaste <strong>50</strong> vouchers, de los cuales <strong>49</strong> se pagaron y <strong>1</strong> están pendientes
                  </p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 uppercase mb-1">
                        <Send className="w-3.5 h-3.5 text-blue-500" />
                        Vouchers enviados
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{formatCLP(dashboardStats.vouchersEnviados.amount)}</span>
                        <span className="text-sm text-gray-500">{dashboardStats.vouchersEnviados.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${dashboardStats.vouchersEnviados.percentage}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 uppercase mb-1">
                        <span className="w-3.5 h-3.5 text-green-500">✓</span>
                        Vouchers pagados
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{formatCLP(dashboardStats.vouchersPagados.amount)}</span>
                        <span className="text-sm text-gray-500">{dashboardStats.vouchersPagados.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${dashboardStats.vouchersPagados.percentage}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 uppercase mb-1">
                        <span className="w-3.5 h-3.5 text-red-500">⚠</span>
                        Vouchers expirados
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{formatCLP(dashboardStats.vouchersExpirados.amount)}</span>
                        <span className="text-sm text-gray-500">{dashboardStats.vouchersExpirados.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                        <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${dashboardStats.vouchersExpirados.percentage}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 uppercase mb-1">
                        <Building2 className="w-3.5 h-3.5 text-blue-500" />
                        Propiedades activas
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{dashboardStats.propiedadesActivas.count} / {dashboardStats.propiedadesActivas.total}</span>
                        <span className="text-sm text-gray-500">{dashboardStats.propiedadesActivas.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${dashboardStats.propiedadesActivas.percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Events sidebar */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
              <h2 className="text-lg font-bold text-gray-900">Próximos eventos</h2>
              <p className="text-sm text-gray-500 mb-4">Eventos relevantes de tus contratos y vouchers</p>

              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchEvents}
                  onChange={(e) => setSearchEvents(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Clock className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                {(['reajustes', 'renovaciones', 'vouchers', 'recordatorios'] as const).map((key) => (
                  <label key={key} className="flex items-center gap-1.5 text-xs">
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={() => setFilters(f => ({ ...f, [key]: !f[key] }))}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600"
                    />
                    <span className="capitalize text-gray-600">{key}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{event.propertyAddress}</p>
                      {event.description.split('\n').map((line, i) => (
                        <p key={i} className="text-xs text-gray-500">{line}</p>
                      ))}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-0.5">
                        Enviar <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

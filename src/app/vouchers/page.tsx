'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';
import { StatusBadge } from '@/components/StatusBadge';
import { vouchers, formatCLP } from '@/lib/mock-data';
import { Search, Download, Send, MoreVertical, Settings } from 'lucide-react';

export default function VouchersPage() {
  const [search, setSearch] = useState('');
  const pendingCount = vouchers.filter(v => v.status === 'ENVIADO').length;

  const filtered = vouchers.filter(v =>
    v.property.toLowerCase().includes(search.toLowerCase()) ||
    v.owner.name.toLowerCase().includes(search.toLowerCase()) ||
    v.tenant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vouchers</h1>
              <p className="text-sm text-gray-500">
                Tienes <span className="font-semibold">{vouchers.length}</span> vouchers, de los cuales <span className="font-semibold">{pendingCount}</span> estan pendientes
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <span>Vouchers desde <span className="text-blue-600 font-medium">mayo 2026</span> hasta <span className="text-blue-600 font-medium">julio 2026</span></span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" /> Exportar
              </button>
              <button className="flex items-center gap-1.5 text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                <Send className="w-4 h-4" /> Enviar
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50">
                <MoreVertical className="w-4 h-4" /> Acciones
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50">
              <Settings className="w-4 h-4" /> 16 / 17 columnas
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="w-10 px-4 py-3"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /></th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Periodo</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propiedad</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comuna</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dueno</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Arrendatario</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">F. Envio</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">F. Expiracion</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">F. Pago</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto Dueno</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto Admin</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Multas</th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-4 py-3"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /></td>
                    <td className="px-3 py-3 text-sm text-gray-900 font-medium">{v.period}</td>
                    <td className="px-3 py-3">
                      <Link href={`/vouchers/${v.id}`} className="text-sm text-gray-900 hover:text-blue-600">
                        {v.property}
                      </Link>
                      <p className="text-xs text-gray-500">{v.commune}</p>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-600">{v.commune}</td>
                    <td className="px-3 py-3">
                      <p className="text-sm text-gray-900">{v.owner.name}</p>
                      <p className="text-xs text-gray-500">{v.owner.rut}</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-sm text-gray-900">{v.tenant.name}</p>
                      <p className="text-xs text-gray-500">{v.tenant.rut}</p>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-600">{v.sentDate}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{v.expirationDate}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{v.paymentDate || '-'}</td>
                    <td className="px-3 py-3 text-sm text-right font-medium">{formatCLP(v.amount)}</td>
                    <td className="px-3 py-3 text-sm text-right">{formatCLP(v.ownerAmount)}</td>
                    <td className="px-3 py-3 text-sm text-right">{formatCLP(v.adminAmount)}</td>
                    <td className="px-3 py-3 text-sm text-right">{formatCLP(v.fines)}</td>
                    <td className="px-3 py-3 text-center"><StatusBadge status={v.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

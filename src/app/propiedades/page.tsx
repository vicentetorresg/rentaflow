'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';
import { StatusBadge } from '@/components/StatusBadge';
import { properties, formatCLP } from '@/lib/mock-data';
import { Search, Plus, Tag, Share2, Archive, Settings, Building2, FileText, User } from 'lucide-react';

export default function PropiedadesPage() {
  const [search, setSearch] = useState('');
  const activeCount = properties.filter(p => p.contract).length;

  const filtered = properties.filter(p =>
    p.address.toLowerCase().includes(search.toLowerCase()) ||
    p.owner.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.tenant && p.tenant.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Propiedades</h1>
              <p className="text-sm text-gray-500">
                Tienes <span className="text-blue-600 font-semibold">{properties.length}</span> propiedades, de las cuales <span className="font-semibold">{activeCount}</span> tienen contratos activos
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-56"
                />
              </div>
              <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50">
                <Settings className="w-4 h-4" /> 7 / 30 columnas
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50">
                <Archive className="w-4 h-4" /> Archivar
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50">
                <Tag className="w-4 h-4" /> Etiquetas
              </button>
              <button className="flex items-center gap-1.5 text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" /> Agregar
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dirección</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dueño</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Arrendatario</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((prop) => (
                  <tr key={prop.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/propiedades/${prop.id}`} className="hover:text-blue-600">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{prop.address}</p>
                            <p className="text-xs text-gray-500">{prop.commune}, {prop.region}</p>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900">{prop.owner.name}</p>
                          <p className="text-xs text-gray-500">{prop.owner.rut}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {prop.tenant ? (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-400" />
                          <div>
                            <p className="text-sm text-gray-900">{prop.tenant.name}</p>
                            <p className="text-xs text-gray-500">{prop.tenant.rut}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Sin arrendatario</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-medium text-gray-900">{formatCLP(prop.rent)}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={prop.status} />
                    </td>
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

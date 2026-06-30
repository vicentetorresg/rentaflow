'use client';

import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';
import { Plus } from 'lucide-react';

export default function OtrasDeudasPage() {
  const deudas = [
    { id: 1, property: 'Santa Clara 360, Depto. 104', concept: 'Reparacion bano', amount: 85000, tenant: 'Valentina Restrepo', status: 'Pendiente', date: '15/06/2026' },
    { id: 2, property: 'Av Los Libertadores 6170, Depto. 3604', concept: 'Pintura departamento', amount: 120000, tenant: 'Javiera Rodriguez', status: 'Pagado', date: '10/06/2026' },
    { id: 3, property: 'Av Los Libertadores 6170, Depto. 2501', concept: 'Cambio cerradura', amount: 45000, tenant: 'Claudia Carolina Blanco', status: 'Pendiente', date: '20/06/2026' },
    { id: 4, property: 'Camino Vecinal 1636, Depto. 238', concept: 'Gastos comunes extra', amount: 32000, tenant: 'Jose Luis Quintero', status: 'Pagado', date: '01/06/2026' },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Otras deudas</h1>
              <p className="text-sm text-gray-500">Gestiona cargos adicionales fuera de los arriendos</p>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" /> Agregar deuda
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propiedad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Concepto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Arrendatario</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody>
                {deudas.map((d) => (
                  <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{d.property}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{d.concept}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{d.tenant}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium">${d.amount.toLocaleString('es-CL')}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{d.date}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        d.status === 'Pagado' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${d.status === 'Pagado' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                        {d.status}
                      </span>
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

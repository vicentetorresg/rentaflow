'use client';

import { use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';
import { StatusBadge } from '@/components/StatusBadge';
import { vouchers, properties, formatCLP } from '@/lib/mock-data';
import { ArrowLeft, FileSpreadsheet, Zap, List } from 'lucide-react';

export default function VoucherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const voucher = vouchers.find(v => v.id === id);

  if (!voucher) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-[1200px] mx-auto px-6 py-12 text-center">
            <p className="text-gray-500">Voucher no encontrado</p>
            <Link href="/vouchers" className="text-blue-600 hover:underline mt-2 inline-block">Volver a vouchers</Link>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const property = properties.find(p => p.id === voucher.propertyId);
  const ownerPercentage = voucher.adminAmount > 0 ? ((voucher.amount - voucher.adminAmount) / voucher.amount * 100).toFixed(2) : '100';
  const adminPercentage = voucher.adminAmount > 0 ? (voucher.adminAmount / voucher.amount * 100).toFixed(2) : '0';
  const ivaAdmin = Math.round(voucher.adminAmount * 0.19);
  const leasityFee = Math.round(voucher.amount * 0.00316);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-[1000px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Link href="/vouchers" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">Voucher {voucher.period.split(' ')[0]}</h1>
                  <StatusBadge status={voucher.status} />
                </div>
                <p className="text-sm text-gray-500">{voucher.property}</p>
                {property && (
                  <Link href={`/propiedades/${property.id}`} className="text-sm text-blue-600 hover:underline">
                    Ir a la propiedad
                  </Link>
                )}
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
              <FileSpreadsheet className="w-4 h-4" /> Documentos
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vista arrendatario */}
              <div className="md:border-r md:pr-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Vista del Arrendatario</h3>
                {voucher.paymentDate && (
                  <p className="text-sm text-green-600 mb-4">Fecha de pago: {voucher.paymentDate}</p>
                )}
                <table className="w-full mt-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left text-xs font-medium text-gray-500 pb-2">Concepto</th>
                      <th className="text-right text-xs font-medium text-gray-500 pb-2">Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 text-sm text-gray-900">ARRIENDO</td>
                      <td className="py-3 text-sm text-right font-medium">{formatCLP(voucher.amount)}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t">
                      <td className="pt-3 text-sm font-bold text-gray-900">TOTAL</td>
                      <td className="pt-3 text-sm text-right font-bold">{formatCLP(voucher.amount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Vista detalle */}
              <div className="md:border-r md:pr-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Vista Detalle</h3>
                <p className="text-sm text-gray-500 mb-4">Fecha de envio: {voucher.sentDate}</p>
                <table className="w-full mt-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left text-xs font-medium text-gray-500 pb-2">Concepto</th>
                      <th className="text-right text-xs font-medium text-gray-500 pb-2">Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 text-sm text-blue-600">ARRIENDO DUENO ({ownerPercentage}%)</td>
                      <td className="py-2 text-sm text-right">{formatCLP(voucher.ownerAmount)}</td>
                    </tr>
                    {voucher.adminAmount > 0 && (
                      <>
                        <tr>
                          <td className="py-2 text-sm text-gray-700">COMISION ADMINISTRACION ({adminPercentage}%)*</td>
                          <td className="py-2 text-sm text-right">{formatCLP(voucher.adminAmount)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-sm text-gray-700">IVA COMISION ADMINISTRACION</td>
                          <td className="py-2 text-sm text-right">{formatCLP(ivaAdmin)}</td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td className="py-2 text-sm text-gray-500">RENTAFLOW</td>
                      <td className="py-2 text-sm text-right">{formatCLP(leasityFee)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Arrendatario info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Arrendatario</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{voucher.tenant.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{voucher.tenant.name}</p>
                    <p className="text-xs text-gray-500">{voucher.tenant.rut}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">Fecha limite de liquidacion estandar: <strong>01/07/2026</strong></p>
            <div className="flex gap-3">
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                <Zap className="w-4 h-4" /> Acelerar Liquidacion
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                <List className="w-4 h-4" /> Previsualizar Totales
              </button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

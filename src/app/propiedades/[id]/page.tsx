'use client';

import { use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';
import { StatusBadge } from '@/components/StatusBadge';
import { properties, vouchers, formatCLP } from '@/lib/mock-data';
import {
  ArrowLeft, Share2, Pencil, Bell, Shield, FileSignature, Users, BarChart3, BookOpen,
  MoreVertical, Bed, Bath, Maximize2, Car, Package, Droplets, Zap, Building2
} from 'lucide-react';

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find(p => p.id === id);
  const propertyVouchers = vouchers.filter(v => v.propertyId === id);

  if (!property) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-[1200px] mx-auto px-6 py-12 text-center">
            <p className="text-gray-500">Propiedad no encontrada</p>
            <Link href="/propiedades" className="text-blue-600 hover:underline mt-2 inline-block">
              Volver a propiedades
            </Link>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const lastVoucher = propertyVouchers[0];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-[1200px] mx-auto px-6 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Link href="/propiedades" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Propiedad</h1>
              <StatusBadge status={property.status} />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                <Bell className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                <Shield className="w-4 h-4" /> Sin seguro
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                <FileSignature className="w-4 h-4" /> Firmas
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                <Users className="w-4 h-4" /> Directorio
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                <BarChart3 className="w-4 h-4" /> Indicadores
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                <BookOpen className="w-4 h-4" /> Bitácora
              </button>
            </div>
          </div>

          {/* Property detail card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex gap-6">
              <div className="w-80 h-52 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-16 h-16 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Detalle de la propiedad</h2>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                      <Share2 className="w-4 h-4" /> Compartir
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                      <Pencil className="w-4 h-4" /> Editar
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Tipo de propiedad</p>
                    <p className="text-sm text-gray-900">{property.type}</p>
                    <p className="text-xs text-blue-600 font-semibold uppercase mt-3 mb-1">Dirección</p>
                    <p className="text-sm text-gray-900">{property.address}</p>
                    <p className="text-xs text-gray-500">{property.commune}, {property.region}</p>
                    <p className="text-xs text-blue-600 font-semibold uppercase mt-3 mb-1">Características</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                      {property.bedrooms > 0 && (
                        <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.bedrooms} Dormitorio{property.bedrooms > 1 ? 's' : ''}</span>
                      )}
                      {property.bathrooms > 0 && (
                        <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.bathrooms} Baño{property.bathrooms > 1 ? 's' : ''}</span>
                      )}
                      <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {property.area} m² Totales</span>
                      {property.parking > 0 && (
                        <span className="flex items-center gap-1"><Car className="w-4 h-4" /> {property.parking} Estacionamiento</span>
                      )}
                      {property.storage > 0 && (
                        <span className="flex items-center gap-1"><Package className="w-4 h-4" /> {property.storage} Bodega</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Dueño</p>
                    <p className="text-sm text-gray-900">{property.owner.name}</p>
                    <p className="text-xs text-gray-500">{property.owner.rut}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Servicios Básicos</p>
                    {property.utilities.length > 0 ? (
                      <div className="space-y-2">
                        {property.utilities.map((u, i) => (
                          <div key={i} className="flex items-center gap-2">
                            {u.name.includes('Agua') ? (
                              <Droplets className="w-4 h-4 text-blue-400" />
                            ) : (
                              <Zap className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className="text-sm text-gray-700">{u.name}</span>
                            {u.amount ? (
                              <span className="text-sm font-medium text-gray-900">{formatCLP(u.amount)}</span>
                            ) : (
                              <span className="text-sm text-green-600">{u.status}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Sin servicios registrados</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contract + Current Voucher */}
          {property.contract && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Contrato de arriendo</h3>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                      <Pencil className="w-4 h-4" /> Editar
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Monto actual de arriendo</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCLP(property.rent)}
                      <span className="text-sm font-normal text-blue-600 ml-2">{property.rentUF} UF</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">Reajuste {property.contract.adjustmentType}</p>
                  <p className="text-sm text-gray-500">Próximo reajuste: {property.contract.nextAdjustment}</p>
                  <p className="text-sm text-gray-500">Fecha de inicio: {property.contract.startDate}</p>
                  <p className="text-sm text-gray-500">Fecha de término: {property.contract.endDate || 'contrato indefinido'}</p>
                  {property.contract.commission > 0 && (
                    <p className="text-sm text-gray-500">Comisión de administración: {property.contract.commission}%</p>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <p className="text-sm font-medium"><strong>Próximo voucher:</strong> {property.contract.nextVoucher}</p>
                    <p className="text-sm"><strong>Día límite de pago:</strong> {property.contract.paymentDay}to día del mes</p>
                    <p className="text-sm"><strong>Multa por retraso:</strong> {property.contract.lateFee}</p>
                  </div>
                  {property.tenant && (
                    <div className="border-t pt-3 mt-3">
                      <p className="text-xs text-gray-500 uppercase mb-1">Arrendatario</p>
                      <p className="text-sm font-medium">{property.tenant.name}</p>
                      <p className="text-xs text-gray-500">{property.tenant.rut}</p>
                    </div>
                  )}
                  <div className="flex gap-3 mt-4">
                    <button className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50">Suspender</button>
                    <button className="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">Marcar como vacante</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Voucher Actual</h3>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                      <Pencil className="w-4 h-4" /> Editar
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </div>
                {lastVoucher ? (
                  <div className="space-y-3">
                    <StatusBadge status={lastVoucher.status} />
                    <div>
                      <p className="text-xs text-gray-500">Monto del voucher</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCLP(lastVoucher.amount)}</p>
                    </div>
                    {lastVoucher.paymentDate && (
                      <p className="text-sm text-gray-500">Fecha de pago: {lastVoucher.paymentDate}</p>
                    )}
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500 uppercase mb-1">Arrendatario</p>
                      <p className="text-sm font-medium">{lastVoucher.tenant.name}</p>
                      <p className="text-xs text-gray-500">{lastVoucher.tenant.rut}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Sin vouchers generados</p>
                )}
              </div>
            </div>
          )}

          {/* Voucher history */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Historial De Vouchers</h3>
                <p className="text-sm text-gray-500">
                  {propertyVouchers.filter(v => v.status === 'ENVIADO').length} pendiente{propertyVouchers.filter(v => v.status === 'ENVIADO').length !== 1 ? 's' : ''}, {propertyVouchers.filter(v => v.status === 'EXPIRADO').length} expirados
                </p>
              </div>
            </div>
            {propertyVouchers.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Arrendatario</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha envío</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha expiración</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha pago</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyVouchers.map((v) => (
                    <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <Link href={`/vouchers/${v.id}`} className="hover:text-blue-600">
                          {v.period}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-900">{v.tenant.name}</p>
                        <p className="text-xs text-gray-500">{v.tenant.rut}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium">{formatCLP(v.amount)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Arriendo</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.sentDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.expirationDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.paymentDate || '-'}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge status={v.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">Sin historial de vouchers</p>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

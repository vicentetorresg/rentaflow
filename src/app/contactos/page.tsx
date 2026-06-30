'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';
import { contacts } from '@/lib/mock-data';
import { Search, Plus, Mail, Phone, Building2, User, Tag } from 'lucide-react';

export default function ContactosPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'owner' | 'tenant'>('all');

  const filtered = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.rut.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || c.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contactos</h1>
              <p className="text-sm text-gray-500">{contacts.length} contactos registrados</p>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" /> Agregar contacto
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, RUT o email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              {([
                { value: 'all' as const, label: 'Todos' },
                { value: 'owner' as const, label: 'Duenos' },
                { value: 'tenant' as const, label: 'Arrendatarios' },
              ]).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilterType(opt.value)}
                  className={`px-4 py-2 text-sm font-medium ${
                    filterType === opt.value
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((contact) => (
              <div key={contact.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    contact.type === 'owner' ? 'bg-purple-100' : 'bg-blue-100'
                  }`}>
                    {contact.type === 'owner' ? (
                      <Building2 className="w-5 h-5 text-purple-600" />
                    ) : (
                      <User className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-xs text-gray-500">{contact.rut}</p>
                    <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs ${
                      contact.type === 'owner' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      <Tag className="w-3 h-3" />
                      {contact.type === 'owner' ? 'Propietario' : 'Arrendatario'}
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {contact.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {contact.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    {contact.properties.length} propiedad{contact.properties.length > 1 ? 'es' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

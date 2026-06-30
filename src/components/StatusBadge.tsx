export function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    AL_DIA: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', label: 'AL DÍA' },
    PAGO_PENDIENTE: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', label: 'PAGO PENDIENTE' },
    VACANTE: { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500', label: 'VACANTE' },
    ENVIADO: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', label: 'ENVIADO' },
    PAGADO: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', label: 'PAGADO' },
    LIQUIDADO: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', label: 'LIQUIDADO' },
    EXPIRADO: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', label: 'EXPIRADO' },
    GENERADO: { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-400', label: 'GENERADO' },
    ANULADO: { bg: 'bg-gray-50', text: 'text-gray-500', dot: 'bg-gray-400', label: 'ANULADO' },
  };

  const c = config[status] || config.GENERADO;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-2 h-2 rounded-full ${c.dot}`}></span>
      {c.label}
    </span>
  );
}

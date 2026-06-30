export interface Property {
  id: string;
  address: string;
  commune: string;
  region: string;
  type: 'Departamento' | 'Casa' | 'Bodega' | 'Estacionamiento' | 'Local';
  owner: { name: string; rut: string };
  tenant: { name: string; rut: string } | null;
  rent: number;
  rentUF: number;
  status: 'AL_DIA' | 'PAGO_PENDIENTE' | 'VACANTE' | 'PAGADO';
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  storage: number;
  image: string;
  contract: {
    startDate: string;
    endDate: string | null;
    adjustmentType: 'Semestral' | 'Anual';
    nextAdjustment: string;
    lateFee: string;
    paymentDay: number;
    nextVoucher: string;
    commission: number;
  } | null;
  utilities: { name: string; amount: number | null; status: string }[];
}

export interface Voucher {
  id: string;
  period: string;
  propertyId: string;
  property: string;
  commune: string;
  region: string;
  owner: { name: string; rut: string };
  tenant: { name: string; rut: string };
  sentDate: string;
  expirationDate: string;
  paymentDate: string | null;
  settlementDate: string | null;
  amount: number;
  ownerAmount: number;
  adminAmount: number;
  fines: number;
  status: 'ENVIADO' | 'PAGADO' | 'LIQUIDADO' | 'EXPIRADO' | 'GENERADO' | 'ANULADO';
}

export interface Contact {
  id: string;
  name: string;
  rut: string;
  email: string;
  phone: string;
  type: 'owner' | 'tenant';
  properties: string[];
}

export interface DashboardStats {
  vouchersEnviados: { amount: number; percentage: number };
  vouchersPagados: { amount: number; percentage: number };
  vouchersExpirados: { amount: number; percentage: number };
  propiedadesActivas: { count: number; total: number; percentage: number };
  totalVouchers: number;
  enviados: { count: number; percentage: number };
  pagados: { count: number; percentage: number };
}

export interface ChartData {
  month: string;
  liquidado: number;
  pagado: number;
  expirado: number;
  enviado: number;
  generado: number;
  anulado: number;
}

export interface Event {
  id: string;
  propertyAddress: string;
  description: string;
  type: 'reajuste' | 'renovacion' | 'voucher' | 'recordatorio';
  date: string;
}


export enum Gender {
  LakiLaki = 'Laki-laki',
  Perempuan = 'Perempuan'
}

export enum Religion {
  Katolik = 'Katolik',
  Protestan = 'Protestan',
  Islam = 'Islam',
  Hindu = 'Hindu',
  Budha = 'Budha'
}

export enum Education {
  TidakSekolah = 'Tidak/Belum Sekolah',
  SD = 'SD',
  SMP = 'SMP',
  SMA = 'SMA/SMK',
  Diploma = 'Diploma',
  Sarjana = 'S1/S2/S3'
}

export interface Resident {
  id: string;
  nik: string;
  fullName: string;
  birthPlace: string;
  birthDate: string;
  gender: Gender;
  address: string;
  village: string; 
  dusun: string;
  rt: string;
  rw: string;
  religion: Religion;
  occupation: string;
  education: Education;
  status: 'Hidup' | 'Meninggal' | 'Pindah';
  bansosType?: 'PKH' | 'BPNT' | 'BLT-DD' | 'None';
  isStuntingRisk?: boolean;
  agriCommodity?: string;
  deathDate?: string;
  deathCause?: string;
}

export type LetterType = 'SKU' | 'SKTM' | 'DOMISILI';

export interface LetterRecord {
  id: string;
  residentId: string;
  type: LetterType;
  date: string;
  refNo: string;
  qrCode: string;
}

export type ViewType = 'dashboard' | 'list' | 'add' | 'events' | 'letters' | 'social' | 'health' | 'agri' | 'ai-insight' | 'data-mgmt';

export const VILLAGES = [
  'Nualain', 'Lakmaras', 'Henes', 'Loonuna', 'Lutharato', 'Ekin', 'Sisi Fatuberal', 'Debululik', 'Majorato'
];

export const DUSUN_LIST = [
  'Dusun Halibete', 'Dusun Lakmaras A', 'Dusun Lakmaras B', 'Dusun Makir Tengah', 'Dusun Henes Utara', 'Dusun Debululik A'
];

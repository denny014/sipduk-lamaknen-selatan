
import { Resident, Gender, Religion, Education } from './types';

export const MOCK_RESIDENTS: Resident[] = [
  {
    id: '1',
    nik: '5304010101900001',
    fullName: 'Antonius Bere',
    birthPlace: 'Eban',
    birthDate: '1990-05-12',
    gender: Gender.LakiLaki,
    address: 'Dusun Halibete',
    village: 'Eban',
    dusun: 'Dusun Halibete',
    rt: '001',
    rw: '001',
    religion: Religion.Katolik,
    occupation: 'Petani',
    education: Education.SMA,
    status: 'Hidup',
    agriCommodity: 'Kopi Lululik',
    bansosType: 'PKH'
  },
  {
    id: '2',
    nik: '5304014206950002',
    fullName: 'Maria Mau',
    birthPlace: 'Lakmaras',
    birthDate: '1995-06-22',
    gender: Gender.Perempuan,
    address: 'Dusun Lakmaras B',
    village: 'Lakmaras',
    dusun: 'Dusun Lakmaras B',
    rt: '003',
    rw: '001',
    religion: Religion.Katolik,
    occupation: 'Tenaga Pengajar',
    education: Education.Sarjana,
    status: 'Hidup'
  },
  {
    id: '3',
    nik: '5304012010210003',
    fullName: 'Kecil Mali',
    birthPlace: 'Makir',
    birthDate: '2021-08-05',
    gender: Gender.LakiLaki,
    address: 'Dusun Makir Tengah',
    village: 'Makir',
    dusun: 'Dusun Makir Tengah',
    rt: '002',
    rw: '004',
    religion: Religion.Katolik,
    occupation: 'Belum Bekerja',
    education: Education.TidakSekolah,
    status: 'Hidup',
    isStuntingRisk: true
  }
];

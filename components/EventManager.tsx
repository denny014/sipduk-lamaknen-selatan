
import React, { useState } from 'react';
import { Resident, VILLAGES, DUSUN_LIST, Gender, Religion, Education } from '../types';

interface EventManagerProps {
  residents: Resident[];
  onBirth: (newResident: Resident) => void;
  onDeath: (id: string, date: string, cause: string) => void;
}

const EventManager: React.FC<EventManagerProps> = ({ residents, onBirth, onDeath }) => {
  const [activeTab, setActiveTab] = useState<'birth' | 'death'>('birth');
  
  // Birth States
  const [babyName, setBabyName] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.LakiLaki);
  const [village, setVillage] = useState(VILLAGES[0]);
  const [dusun, setDusun] = useState(DUSUN_LIST[0]);

  // Death States
  const [selectedId, setSelectedId] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [deathCause, setDeathCause] = useState('');

  const handleBirthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fix: Added missing 'dusun' property to satisfy the Resident interface
    const newResident: Resident = {
      id: Math.random().toString(36).substr(2, 9),
      nik: 'PENDING-' + Date.now().toString().slice(-6),
      fullName: babyName,
      birthPlace: village,
      birthDate: birthDate,
      gender: gender,
      address: `Anak dari Bpk ${father} & Ibu ${mother}`,
      village: village,
      dusun: dusun,
      rt: '001',
      rw: '001',
      religion: Religion.Katolik,
      occupation: 'Belum Bekerja',
      education: Education.TidakSekolah,
      status: 'Hidup'
    };
    onBirth(newResident);
    alert('Kelahiran berhasil dicatat dan ditambahkan ke database penduduk.');
    setBabyName('');
  };

  const handleDeathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    onDeath(selectedId, deathDate, deathCause);
    alert('Data kematian berhasil diperbarui.');
    setSelectedId('');
  };

  const aliveResidents = residents.filter(r => r.status === 'Hidup');

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden max-w-4xl mx-auto">
      <div className="flex border-b">
        <button 
          onClick={() => setActiveTab('birth')}
          className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'birth' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Pencatatan Kelahiran
        </button>
        <button 
          onClick={() => setActiveTab('death')}
          className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'death' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
          Pencatatan Kematian
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'birth' ? (
          <form onSubmit={handleBirthSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Nama Bayi</label>
                <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={babyName} onChange={e => setBabyName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                <input required type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Nama Ayah</label>
                <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={father} onChange={e => setFather(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Nama Ibu</label>
                <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={mother} onChange={e => setMother(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Desa Kelahiran</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={village} onChange={e => setVillage(e.target.value)}>
                  {VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Dusun</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={dusun} onChange={e => setDusun(e.target.value)}>
                  {DUSUN_LIST.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                <div className="flex gap-4 p-2">
                  {Object.values(Gender).map(g => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input type="radio" checked={gender === g} onChange={() => setGender(g)} /> {g}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all">Simpan Laporan Kelahiran</button>
          </form>
        ) : (
          <form onSubmit={handleDeathSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Cari & Pilih Penduduk</label>
              <select required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
                <option value="">-- Pilih Penduduk --</option>
                {aliveResidents.map(r => (
                  <option key={r.id} value={r.id}>{r.fullName} ({r.nik}) - Desa {r.village}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Tanggal Kematian</label>
                <input required type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" value={deathDate} onChange={e => setDeathDate(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Penyebab (Opsional)</label>
                <input type="text" placeholder="Sakit/Lansia/Kecelakaan" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" value={deathCause} onChange={e => setDeathCause(e.target.value)} />
              </div>
            </div>
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-xs text-red-600 font-medium">Perhatian: Menandai penduduk sebagai 'Meninggal' akan menghapus mereka dari statistik penduduk aktif tetapi data riwayat tetap tersimpan.</p>
            </div>
            <button type="submit" className="w-full py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all">Laporkan Kematian</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventManager;

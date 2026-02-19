
import React, { useState } from 'react';
import { Resident, VILLAGES, DUSUN_LIST, Gender, Religion, Education } from '../types';

interface ResidentFormProps {
  onSubmit: (data: Resident) => void;
}

const ResidentForm: React.FC<ResidentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Resident>>({
    fullName: '',
    nik: '',
    village: VILLAGES[0],
    dusun: DUSUN_LIST[0],
    gender: Gender.LakiLaki,
    birthPlace: '',
    birthDate: '',
    religion: Religion.Katolik,
    education: Education.SD,
    occupation: '',
    address: '',
    rt: '001',
    rw: '001',
    status: 'Hidup'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.nik) {
      // Fix: Ensured 'dusun' is included in the submitted data
      onSubmit({
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as Resident);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">NIK (16 Digit)</label>
            <input 
              required
              maxLength={16}
              type="text" 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              value={formData.nik}
              onChange={e => setFormData({...formData, nik: e.target.value.replace(/\D/g, '')})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Desa</label>
            <select 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.village}
              onChange={e => setFormData({...formData, village: e.target.value})}
            >
              {VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Dusun</label>
            <select 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.dusun}
              onChange={e => setFormData({...formData, dusun: e.target.value})}
            >
              {DUSUN_LIST.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Jenis Kelamin</label>
            <div className="flex gap-4 p-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={formData.gender === Gender.LakiLaki} onChange={() => setFormData({...formData, gender: Gender.LakiLaki})} />
                <span className="text-sm">Laki-laki</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={formData.gender === Gender.Perempuan} onChange={() => setFormData({...formData, gender: Gender.Perempuan})} />
                <span className="text-sm">Perempuan</span>
              </label>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Tempat Lahir</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.birthPlace}
              onChange={e => setFormData({...formData, birthPlace: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Tanggal Lahir</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.birthDate}
              onChange={e => setFormData({...formData, birthDate: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">Alamat Lengkap</label>
          <textarea 
            rows={2}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button type="reset" className="px-6 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded-lg transition-all">Reset</button>
          <button type="submit" className="px-6 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all">Simpan Data</button>
        </div>
      </form>
    </div>
  );
};

export default ResidentForm;


import React from 'react';
import { Resident } from '../types';

interface AgriModuleProps {
  residents: Resident[];
  onUpdate: (r: Resident) => void;
}

const AgriModule: React.FC<AgriModuleProps> = ({ residents, onUpdate }) => {
  const commodities = ['Kopi Lululik', 'Jagung', 'Padi Gogo', 'Sapi', 'Babi', 'Lainnya'];

  const handleAgriChange = (resId: string, val: string) => {
    const resident = residents.find(r => r.id === resId);
    if (resident) {
      onUpdate({ ...resident, agriCommodity: val });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-3">
          <h3 className="text-xl font-black text-amber-900">Pemetaan Potensi Pertanian</h3>
          <p className="text-sm text-amber-800/80 leading-relaxed">
            Data ini digunakan untuk perencanaan distribusi pupuk bersubsidi dan bantuan bibit dari Dinas Pertanian Kabupaten Belu.
          </p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-amber-200 text-center">
              <p className="text-[10px] font-bold text-amber-600 uppercase">Total Petani</p>
              <p className="text-2xl font-black text-amber-900">{residents.filter(r => r.occupation === 'Petani').length}</p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Kepala Keluarga / Warga</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Dusun</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Komoditas Utama</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase text-right">Update Lahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {residents.filter(r => r.status === 'Hidup' && (r.occupation === 'Petani' || r.occupation === 'Peternak')).map(r => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{r.fullName}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{r.dusun}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase rounded-lg border border-amber-100">
                      {r.agriCommodity || 'Belum Terdata'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select 
                      className="text-[10px] font-bold bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-amber-500"
                      value={r.agriCommodity || ''}
                      onChange={(e) => handleAgriChange(r.id, e.target.value)}
                    >
                      <option value="">-- Pilih --</option>
                      {commodities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgriModule;

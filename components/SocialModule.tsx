
import React from 'react';
import { Resident } from '../types';

interface SocialModuleProps {
  residents: Resident[];
  onUpdate: (r: Resident) => void;
}

const SocialModule: React.FC<SocialModuleProps> = ({ residents, onUpdate }) => {
  const bansosStats = {
    PKH: residents.filter(r => r.bansosType === 'PKH').length,
    BPNT: residents.filter(r => r.bansosType === 'BPNT').length,
    BLT: residents.filter(r => r.bansosType === 'BLT-DD').length,
    None: residents.filter(r => !r.bansosType || r.bansosType === 'None').length
  };

  const handleBansosChange = (resId: string, type: any) => {
    const resident = residents.find(r => r.id === resId);
    if (resident) {
      onUpdate({ ...resident, bansosType: type });
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Penerima PKH', count: bansosStats.PKH, color: 'bg-blue-600' },
          { label: 'Penerima BPNT', count: bansosStats.BPNT, color: 'bg-indigo-600' },
          { label: 'Penerima BLT-DD', count: bansosStats.BLT, color: 'bg-emerald-600' },
          { label: 'Belum Tercover', count: bansosStats.None, color: 'bg-slate-400' }
        ].map(s => (
          <div key={s.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-slate-800">{s.count}</span>
              <div className={`w-2 h-8 rounded-full ${s.color}`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Manajemen Penerima Bansos (DTKS)</h3>
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">Terintegrasi Kemensos</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Nama Warga</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Dusun</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Status Bantuan</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {residents.filter(r => r.status === 'Hidup').map(r => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{r.fullName}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{r.dusun}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      r.bansosType && r.bansosType !== 'None' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {r.bansosType || 'Belum Ada'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select 
                      className="text-[10px] font-bold bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={r.bansosType || 'None'}
                      onChange={(e) => handleBansosChange(r.id, e.target.value)}
                    >
                      <option value="None">None</option>
                      <option value="PKH">PKH</option>
                      <option value="BPNT">BPNT</option>
                      <option value="BLT-DD">BLT-DD</option>
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

export default SocialModule;

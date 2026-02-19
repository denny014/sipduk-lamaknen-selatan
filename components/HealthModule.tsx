
import React from 'react';
import { Resident } from '../types';

interface HealthModuleProps {
  residents: Resident[];
  onUpdate: (r: Resident) => void;
}

const HealthModule: React.FC<HealthModuleProps> = ({ residents, onUpdate }) => {
  const stuntingCount = residents.filter(r => r.isStuntingRisk).length;
  
  const toggleStunting = (resId: string) => {
    const resident = residents.find(r => r.id === resId);
    if (resident) {
      onUpdate({ ...resident, isStuntingRisk: !resident.isStuntingRisk });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 rounded-3xl text-white shadow-lg flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-black italic">Modul Tracing Stunting</h2>
          <p className="text-sm text-emerald-100">Monitoring tumbuh kembang balita per dusun untuk penanganan gizi spesifik.</p>
        </div>
        <div className="text-center bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/30">
          <p className="text-[10px] font-bold uppercase tracking-widest">Waspada Stunting</p>
          <p className="text-4xl font-black">{stuntingCount}</p>
          <p className="text-[10px] font-bold">BALITA</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Nama Balita</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Usia (Bulan)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase text-center">Indikator Resiko</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {residents.filter(r => {
                const age = new Date().getFullYear() - new Date(r.birthDate).getFullYear();
                return age <= 5 && r.status === 'Hidup';
              }).map(r => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{r.fullName}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {(new Date().getFullYear() - new Date(r.birthDate).getFullYear()) * 12} Bln
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto ${r.isStuntingRisk ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toggleStunting(r.id)}
                      className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${
                        r.isStuntingRisk ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      {r.isStuntingRisk ? 'Clear Risk' : 'Mark as Risk'}
                    </button>
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

export default HealthModule;

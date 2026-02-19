
import React from 'react';
import { Resident } from '../types';

interface ResidentListProps {
  residents: Resident[];
  onDelete: (id: string) => void;
  onAddClick?: () => void;
}

const ResidentList: React.FC<ResidentListProps> = ({ residents, onDelete, onAddClick }) => {
  return (
    <div className="space-y-4">
      {onAddClick && (
        <div className="flex justify-end">
          <button 
            onClick={onAddClick}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Warga Baru
          </button>
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama & Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">NIK</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Desa</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pekerjaan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {residents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <p>Tidak ada data penduduk ditemukan</p>
                  </td>
                </tr>
              ) : (
                residents.map((r) => (
                  <tr key={r.id} className={`hover:bg-slate-50 transition-colors ${r.status === 'Meninggal' ? 'bg-red-50/30' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${r.status === 'Hidup' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}></div>
                        <div>
                          <div className={`text-sm font-semibold ${r.status === 'Meninggal' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                            {r.fullName}
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">{r.gender} • {r.status}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono tracking-tight">{r.nik}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-[10px] font-bold uppercase bg-blue-50 text-blue-600 rounded">
                        {r.village}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{r.status === 'Meninggal' ? '-' : r.occupation}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onDelete(r.id)}
                        className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResidentList;

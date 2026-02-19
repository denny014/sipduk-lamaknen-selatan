
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { Resident, Gender, Religion, Education } from '../types';

interface DataManagementProps {
  residents: Resident[];
  onImport: (newResidents: Resident[]) => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ residents, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleExportExcel = () => {
    setIsExporting(true);
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(residents);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Penduduk");
      XLSX.writeFile(workbook, `Data_Penduduk_LamaknenSelatan_${new Date().toISOString().split('T')[0]}.xlsx`);
      setIsExporting(false);
    }, 1000);
  };

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws) as any[];

      const formattedData: Resident[] = data.map((item, index) => ({
        id: item.id || Math.random().toString(36).substr(2, 9),
        nik: String(item.nik || ''),
        fullName: item.fullName || 'Tanpa Nama',
        birthPlace: item.birthPlace || '',
        birthDate: item.birthDate || '1990-01-01',
        gender: item.gender || Gender.LakiLaki,
        address: item.address || '',
        village: item.village || '',
        dusun: item.dusun || '',
        rt: String(item.rt || '001'),
        rw: String(item.rw || '001'),
        religion: item.religion || Religion.Katolik,
        occupation: item.occupation || 'Lainnya',
        education: item.education || Education.SD,
        status: item.status || 'Hidup',
        bansosType: item.bansosType || 'None'
      }));

      onImport(formattedData);
      alert(`${formattedData.length} data berhasil diimpor!`);
    };
    reader.readAsBinaryString(file);
  };

  const handleGoogleSheetsSync = () => {
    setIsSyncing(true);
    // Simulating cloud sync
    setTimeout(() => {
      setIsSyncing(false);
      alert("Sinkronisasi dengan Google Sheets Berhasil! (Simulasi Cloud Push)");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Export Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">Ekspor Basis Data</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Unduh seluruh data penduduk ke format Microsoft Excel (.xlsx) untuk kebutuhan backup atau laporan fisik ke Kantor Kecamatan.
          </p>
          <button 
            onClick={handleExportExcel}
            disabled={isExporting}
            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isExporting ? 'Memproses...' : 'Unduh File Excel (.xlsx)'}
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">Impor Data Massal</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Migrasi data dari Excel lama atau Buku Induk Penduduk. Pastikan format kolom sesuai dengan template sistem agar data terbaca sempurna.
          </p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportExcel} 
            className="hidden" 
            accept=".xlsx, .xls, .csv" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            Pilih & Unggah File Excel
          </button>
        </div>
      </div>

      {/* Google Sheets Integration Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-3xl shadow-xl text-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                 <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3M19,19H5V5H19V19M17,11H13V7H11V11H7V13H11V17H13V13H17V11Z" />
                 </svg>
               </div>
               <h3 className="text-xl font-bold">Sinkronisasi Google Sheets</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Hubungkan sistem SIPDUK dengan Google Sheets untuk akses data real-time bagi kolaborasi antar perangkat desa di Lamaknen Selatan. Data akan di-push otomatis ke spreadsheet yang ditentukan.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={handleGoogleSheetsSync}
                disabled={isSyncing}
                className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSyncing ? (
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent animate-spin rounded-full"></div>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
                )}
                Sinkronkan Sekarang
              </button>
              <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/10">
                Hubungkan Spreadsheet ID
              </button>
            </div>
          </div>
          <div className="hidden lg:block w-64 opacity-30">
             <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
               <rect x="40" y="40" width="120" height="120" rx="20" fill="white" fillOpacity="0.1"/>
               <path d="M70 100H130M100 70V130" stroke="white" strokeWidth="8" strokeLinecap="round"/>
             </svg>
          </div>
        </div>
      </div>

      {/* Import Instructions */}
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
        <h4 className="text-amber-800 font-bold text-sm mb-2 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Petunjuk Impor Data
        </h4>
        <ul className="text-xs text-amber-700 space-y-1 list-disc ml-4 font-medium">
          <li>Pastikan format NIK terdiri dari 16 digit angka.</li>
          <li>Kolom wajib: NIK, fullName, village, dusun, gender (Laki-laki/Perempuan).</li>
          <li>Gunakan format tanggal YYYY-MM-DD (contoh: 1995-12-31).</li>
          <li>Data dengan NIK yang sudah ada di sistem tidak akan diduplikat (skip).</li>
        </ul>
      </div>
    </div>
  );
};

export default DataManagement;

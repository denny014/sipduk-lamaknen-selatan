
import React, { useState } from 'react';
import { Resident, LetterRecord, LetterType } from '../types';

interface PublicServiceProps {
  residents: Resident[];
  onGenerate: (record: LetterRecord) => void;
}

const PublicService: React.FC<PublicServiceProps> = ({ residents, onGenerate }) => {
  const [selectedResId, setSelectedResId] = useState('');
  const [type, setType] = useState<LetterType>('SKU');
  const [preview, setPreview] = useState<LetterRecord | null>(null);

  const handleCreate = () => {
    if (!selectedResId) return;
    const resident = residents.find(r => r.id === selectedResId);
    if (!resident) return;

    const newRecord: LetterRecord = {
      id: Math.random().toString(36).substr(2, 9),
      residentId: selectedResId,
      type: type,
      date: new Date().toISOString().split('T')[0],
      refNo: `${type}/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
      qrCode: `https://verifikasi.desa.id/check/${Math.random().toString(36).substr(2, 9)}`
    };

    onGenerate(newRecord);
    setPreview(newRecord);
  };

  const selectedResident = residents.find(r => r.id === selectedResId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <h3 className="text-xl font-bold text-slate-800">Cetak Surat Keterangan Otomatis</h3>
        <p className="text-sm text-slate-500">Pilih warga dan jenis surat untuk pembuatan dokumen resmi desa secara instan.</p>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Cari Nama/NIK Warga</label>
            <select 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={selectedResId}
              onChange={(e) => setSelectedResId(e.target.value)}
            >
              <option value="">-- Pilih Warga --</option>
              {residents.filter(r => r.status === 'Hidup').map(r => (
                <option key={r.id} value={r.id}>{r.fullName} ({r.nik})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Jenis Surat</label>
            <div className="grid grid-cols-3 gap-3">
              {(['SKU', 'SKTM', 'DOMISILI'] as LetterType[]).map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                    type === t ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleCreate}
            disabled={!selectedResId}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all disabled:opacity-30 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Proses & Lihat Preview
          </button>
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        {preview && selectedResident ? (
          <div className="bg-white w-full max-w-md shadow-2xl rounded-lg p-10 space-y-8 relative overflow-hidden border border-slate-100">
             <div className="text-center border-b-2 border-black pb-4">
                <h4 className="font-bold text-sm uppercase">Pemerintah Kabupaten Belu</h4>
                <h4 className="font-bold text-sm uppercase tracking-wider">Kecamatan Lamaknen Selatan</h4>
                <h5 className="font-black text-md uppercase">Kantor Desa {selectedResident.village}</h5>
                <p className="text-[9px] mt-1">Alamat: {selectedResident.village}, Kec. Lamaknen Selatan, Kab. Belu, NTT</p>
             </div>
             
             <div className="space-y-4 text-[11px]">
                <div className="text-center underline font-bold text-xs">
                  SURAT KETERANGAN {type === 'SKU' ? 'USAHA' : type === 'SKTM' ? 'TIDAK MAMPU' : 'DOMISILI'}
                </div>
                <div className="text-center -mt-3">Nomor: {preview.refNo}</div>
                
                <p className="leading-relaxed">
                  Yang bertanda tangan di bawah ini, Kepala Desa {selectedResident.village}, menerangkan bahwa:
                </p>
                
                <table className="w-full">
                   <tbody>
                      <tr><td className="w-32 py-1">Nama</td><td>: <strong>{selectedResident.fullName}</strong></td></tr>
                      <tr><td className="py-1">NIK</td><td>: {selectedResident.nik}</td></tr>
                      <tr><td className="py-1 text-top">Alamat</td><td>: {selectedResident.address}, RT/RW {selectedResident.rt}/{selectedResident.rw}, {selectedResident.dusun}</td></tr>
                      <tr><td className="py-1">Pekerjaan</td><td>: {selectedResident.occupation}</td></tr>
                   </tbody>
                </table>
                
                <p className="leading-relaxed">
                  Adalah benar penduduk yang berdomisili di wilayah kami dan memiliki catatan berkelakuan baik. Surat keterangan ini dipergunakan untuk keperluan administrasi sebagaimana mestinya.
                </p>
             </div>

             <div className="flex justify-between items-end pt-8">
                <div className="w-16 h-16 bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-[7px] text-center font-bold">
                   <div className="w-12 h-12 bg-black flex items-center justify-center mb-1">
                      <div className="w-8 h-8 bg-white"></div>
                   </div>
                   VERIFIED QR
                </div>
                <div className="text-center space-y-1">
                   <p className="text-[10px]">{selectedResident.village}, {preview.date}</p>
                   <p className="text-[10px] font-bold">Kepala Desa {selectedResident.village}</p>
                   <div className="h-12"></div>
                   <p className="text-[10px] font-bold underline">(..........................................)</p>
                </div>
             </div>
          </div>
        ) : (
          <div className="text-center space-y-3">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
               <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
             </div>
             <p className="text-sm font-medium text-slate-400 italic">Preview surat akan muncul di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicService;


import React, { useState } from 'react';
import { geminiService } from '../geminiService';
import { Resident } from '../types';

interface AIInsightProps {
  residents: Resident[];
}

const AIInsight: React.FC<AIInsightProps> = ({ residents }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await geminiService.analyzePopulation(residents);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">Asisten Analisis Cerdas (AI)</h2>
            <p className="text-blue-100 leading-relaxed">
              Gunakan kecerdasan buatan untuk menganalisis data kependudukan Kecamatan Lamaknen Selatan secara mendalam. AI akan memproses data demografi, pendidikan, dan pekerjaan untuk memberikan wawasan strategis.
            </p>
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menganalisis...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Mulai Analisis Sekarang
                </>
              )}
            </button>
          </div>
          <div className="w-full md:w-64 flex justify-center opacity-20">
             <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.53 4.47a1 1 0 10-1.414 1.414 3 3 0 004.242 0 1 1 0 00-1.414-1.414 1 1 0 01-1.414 0z" clipRule="evenodd" />
             </svg>
          </div>
        </div>
      </div>

      {analysis && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Hasil Analisis Cerdas
          </h3>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
            {analysis}
          </div>
          <div className="mt-8 pt-6 border-t flex flex-wrap gap-4">
             <div className="bg-blue-50 px-4 py-2 rounded-lg text-xs font-semibold text-blue-700">Gemini 3 Flash Pro</div>
             <div className="bg-slate-50 px-4 py-2 rounded-lg text-xs font-semibold text-slate-500">Real-time Data Sync</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsight;

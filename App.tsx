
import React, { useState, useMemo, useEffect } from 'react';
import { ViewType, Resident, LetterRecord } from './types';
import { MOCK_RESIDENTS } from './constants';
import Dashboard from './components/Dashboard';
import ResidentList from './components/ResidentList';
import ResidentForm from './components/ResidentForm';
import AIInsight from './components/AIInsight';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EventManager from './components/EventManager';
import PublicService from './components/PublicService';
import SocialModule from './components/SocialModule';
import HealthModule from './components/HealthModule';
import AgriModule from './components/AgriModule';
import DataManagement from './components/DataManagement';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [residents, setResidents] = useState<Resident[]>(MOCK_RESIDENTS);
  const [letters, setLetters] = useState<LetterRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulation of Offline-First / Sync logic
  useEffect(() => {
    const saved = localStorage.getItem('residents_data');
    if (saved) setResidents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('residents_data', JSON.stringify(residents));
  }, [residents]);

  const filteredResidents = useMemo(() => {
    return residents.filter(r => 
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nik.includes(searchQuery)
    );
  }, [residents, searchQuery]);

  const addResident = (newResident: Resident) => {
    setResidents(prev => [newResident, ...prev]);
    setCurrentView('list');
  };

  const handleBulkImport = (newResidents: Resident[]) => {
    // Basic deduplication based on NIK
    setResidents(prev => {
      const existingNIKs = new Set(prev.map(r => r.nik));
      const filteredNew = newResidents.filter(r => !existingNIKs.has(r.nik));
      return [...filteredNew, ...prev];
    });
    setCurrentView('list');
  };

  const updateResident = (updated: Resident) => {
    setResidents(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleDeath = (id: string, date: string, cause: string) => {
    setResidents(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'Meninggal', deathDate: date, deathCause: cause } : r
    ));
  };

  const deleteResident = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setResidents(prev => prev.filter(r => r.id !== id));
    }
  };

  const generateLetter = (record: LetterRecord) => {
    setLetters(prev => [record, ...prev]);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar activeView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
          title={
            currentView === 'dashboard' ? 'Dasbor Digital Desa' :
            currentView === 'list' ? 'Basis Data Penduduk' :
            currentView === 'add' ? 'Registrasi Penduduk Baru' : 
            currentView === 'events' ? 'Manajemen Mutasi' : 
            currentView === 'letters' ? 'Pelayanan Publik & Surat' : 
            currentView === 'social' ? 'Kesejahteraan Sosial (Bansos)' :
            currentView === 'health' ? 'Pemantauan Kesehatan & Stunting' :
            currentView === 'agri' ? 'Pemetaan Lahan & Pertanian' :
            currentView === 'data-mgmt' ? 'Manajemen Data (Excel/Cloud)' :
            'Analisis Cerdas AI'
          }
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {currentView === 'dashboard' && (
              <Dashboard residents={residents} />
            )}
            {currentView === 'list' && (
              <ResidentList 
                residents={filteredResidents} 
                onDelete={deleteResident}
                onAddClick={() => setCurrentView('add')}
              />
            )}
            {currentView === 'add' && (
              <ResidentForm onSubmit={addResident} />
            )}
            {currentView === 'events' && (
              <EventManager 
                residents={residents} 
                onBirth={addResident} 
                onDeath={handleDeath}
              />
            )}
            {currentView === 'letters' && (
              <PublicService 
                residents={residents} 
                onGenerate={generateLetter}
              />
            )}
            {currentView === 'social' && (
              <SocialModule 
                residents={residents} 
                onUpdate={updateResident}
              />
            )}
            {currentView === 'health' && (
              <HealthModule 
                residents={residents} 
                onUpdate={updateResident}
              />
            )}
            {currentView === 'agri' && (
              <AgriModule 
                residents={residents} 
                onUpdate={updateResident}
              />
            )}
            {currentView === 'ai-insight' && (
              <AIInsight residents={residents} />
            )}
            {currentView === 'data-mgmt' && (
              <DataManagement 
                residents={residents} 
                onImport={handleBulkImport}
              />
            )}
          </div>
        </main>

        <footer className="bg-white border-t p-4 text-center text-xs text-slate-400">
          SIPDUK Lamaknen Selatan v2.0 - Hybrid System (Sync Enabled).
          Dikelola oleh Pemerintah Kecamatan Lamaknen Selatan.
        </footer>
      </div>
    </div>
  );
};

export default App;

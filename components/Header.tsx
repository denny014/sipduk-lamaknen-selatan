
import React from 'react';

interface HeaderProps {
  title: string;
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, searchQuery, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h1>
        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Wilayah Kecamatan Lamaknen Selatan</p>
      </div>

      <div className="relative w-full md:w-96">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Cari Nama atau NIK..."
          className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;

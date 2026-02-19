
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Resident, VILLAGES, DUSUN_LIST, Gender } from '../types';

interface DashboardProps {
  residents: Resident[];
}

const Dashboard: React.FC<DashboardProps> = ({ residents }) => {
  const activeResidents = residents.filter(r => r.status === 'Hidup');
  const total = residents.length;
  const alive = activeResidents.length;
  const dead = residents.filter(r => r.status === 'Meninggal').length;
  const male = activeResidents.filter(r => r.gender === Gender.LakiLaki).length;
  const female = activeResidents.filter(r => r.gender === Gender.Perempuan).length;

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const villageStats = VILLAGES.map(v => ({
    name: v,
    hidup: residents.filter(r => r.village === v && r.status === 'Hidup').length,
    meninggal: residents.filter(r => r.village === v && r.status === 'Meninggal').length
  }));

  const genderData = [
    { name: 'Laki-laki', value: male },
    { name: 'Perempuan', value: female }
  ];

  const COLORS = ['#2563eb', '#db2777'];

  return (
    <div className="space-y-8">
      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Database" value={total} sub="Total terekam" color="blue" />
        <StatCard title="Penduduk Aktif" value={alive} sub="Status: Hidup" color="green" />
        <StatCard title="Kematian/Mutasi" value={dead} sub="Total kumulatif" color="red" />
        <StatCard title="Rasio Gender" value={Math.round((male/alive)*100) || 0} unit="%" sub={`L: ${male} | P: ${female}`} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Charts */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            Sebaran per Desa
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={villageStats} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10, fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar name="Hidup" dataKey="hidup" fill="#3b82f6" radius={[0, 10, 10, 0]} barSize={12} />
                <Bar name="Meninggal" dataKey="meninggal" fill="#ef4444" radius={[0, 10, 10, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
             <div className="w-1.5 h-6 bg-pink-500 rounded-full"></div>
             Keseimbangan Gender
          </h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Per-Dusun Analysis */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-800">Analisis Demografi per Dusun</h3>
          <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-500 uppercase tracking-widest">Detail Wilayah</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {DUSUN_LIST.map(dusunName => {
            const dusunResidents = activeResidents.filter(r => r.dusun === dusunName);
            const dMale = dusunResidents.filter(r => r.gender === Gender.LakiLaki).length;
            const dFemale = dusunResidents.filter(r => r.gender === Gender.Perempuan).length;
            
            // Age grouping
            const ages = dusunResidents.map(r => calculateAge(r.birthDate));
            const ageGroups = {
              balita: ages.filter(a => a <= 5).length,
              anak: ages.filter(a => a > 5 && a <= 12).length,
              remaja: ages.filter(a => a > 12 && a <= 17).length,
              dewasa: ages.filter(a => a > 17 && a <= 59).length,
              lansia: ages.filter(a => a >= 60).length,
            };

            // Occupation top 3
            const occupations: Record<string, number> = {};
            dusunResidents.forEach(r => {
              if (r.occupation) occupations[r.occupation] = (occupations[r.occupation] || 0) + 1;
            });
            const topOccupations = Object.entries(occupations)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3);

            return (
              <div key={dusunName} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="font-bold text-slate-800 leading-tight">{dusunName}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kec. Lamaknen Selatan</p>
                  </div>
                  <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-xl text-xs font-black">
                    {dusunResidents.length} Jiwa
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Gender Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                      <span>Laki-laki ({dMale})</span>
                      <span>Perempuan ({dFemale})</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="bg-blue-600 h-full transition-all" style={{ width: `${(dMale/dusunResidents.length)*100 || 0}%` }}></div>
                      <div className="bg-pink-500 h-full transition-all" style={{ width: `${(dFemale/dusunResidents.length)*100 || 0}%` }}></div>
                    </div>
                  </div>

                  {/* Age Breakdown */}
                  <div className="grid grid-cols-5 gap-2">
                    <AgeBadge label="Blta" count={ageGroups.balita} color="bg-orange-100 text-orange-600" />
                    <AgeBadge label="Anak" count={ageGroups.anak} color="bg-green-100 text-green-600" />
                    <AgeBadge label="Rmja" count={ageGroups.remaja} color="bg-blue-100 text-blue-600" />
                    <AgeBadge label="Dwsa" count={ageGroups.dewasa} color="bg-indigo-100 text-indigo-600" />
                    <AgeBadge label="Lnsi" count={ageGroups.lansia} color="bg-slate-100 text-slate-600" />
                  </div>

                  {/* Top Occupations */}
                  <div className="space-y-2 pt-2 border-t border-slate-50">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Dominasi Pekerjaan</p>
                    <div className="flex flex-wrap gap-2">
                      {topOccupations.length > 0 ? topOccupations.map(([job, count]) => (
                        <div key={job} className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                          <span className="text-[10px] font-semibold text-slate-600">{job}</span>
                          <span className="text-[9px] font-black text-slate-400 bg-white px-1.5 rounded-md border">{count}</span>
                        </div>
                      )) : <span className="text-[10px] italic text-slate-300">Data belum tersedia</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AgeBadge = ({ label, count, color }: { label: string, count: number, color: string }) => (
  <div className={`flex flex-col items-center p-1.5 rounded-xl ${color}`}>
    <span className="text-[8px] font-black uppercase opacity-70">{label}</span>
    <span className="text-xs font-bold">{count}</span>
  </div>
);

const StatCard = ({ title, value, unit = "Jiwa", sub, color }: { title: string, value: number, unit?: string, sub: string, color: string }) => {
  const colorMap: Record<string, string> = {
    blue: 'border-blue-500 bg-blue-50/10',
    green: 'border-emerald-500 bg-emerald-50/10',
    red: 'border-red-500 bg-red-50/10',
    pink: 'border-pink-500 bg-pink-50/10',
    indigo: 'border-indigo-500 bg-indigo-50/10'
  };
  return (
    <div className={`bg-white p-5 rounded-3xl shadow-sm border-l-4 ${colorMap[color] || 'border-slate-300'}`}>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</h4>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-slate-800">{value.toLocaleString()}</span>
        <span className="text-[9px] text-slate-400 font-bold uppercase">{unit}</span>
      </div>
      <p className="mt-1 text-[10px] text-slate-500 font-medium">{sub}</p>
    </div>
  );
};

export default Dashboard;

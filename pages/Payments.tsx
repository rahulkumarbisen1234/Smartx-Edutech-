
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payments: React.FC = () => {
  const navigate = useNavigate();

  const transactions = [
    { id: 'TXN-9281', title: 'Mathematics Coaching Fee', amount: '₹5,000', status: 'Success', date: 'Sep 01, 2025' },
    { id: 'TXN-8822', title: 'Physics Demo Class', amount: '₹0', status: 'Free', date: 'Aug 28, 2025' },
    { id: 'TXN-7612', title: 'Study Library Subscription', amount: '₹499', status: 'Success', date: 'Aug 15, 2025' },
  ];

  return (
    <div className="flex flex-col flex-1 bg-[#F9FBFE] dark:bg-[#101922]">
      <header className="bg-white dark:bg-[#1a2632] px-6 pt-14 pb-6 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold dark:text-white">Payments</h1>
        </div>
      </header>

      <main className="p-6 space-y-8 animate-slide-up">
        {/* Wallet Balance Card */}
        <div className="bg-slate-900 dark:bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">Total Outstanding</p>
            <h2 className="text-4xl font-black tracking-tight mb-8">₹2,500</h2>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-white text-slate-900 font-bold rounded-2xl text-xs uppercase tracking-widest active:scale-95 transition-all">Pay Dues</button>
              <button className="flex-1 py-3 bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl text-xs uppercase tracking-widest active:scale-95 transition-all">Download</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        </div>

        <section>
          <div className="flex justify-between items-center mb-5 px-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Transaction History</h2>
            <span className="material-symbols-outlined text-slate-300">filter_list</span>
          </div>

          <div className="space-y-4">
            {transactions.map((txn) => (
              <div key={txn.id} className="bg-white dark:bg-[#1a2632] p-5 rounded-3xl border border-slate-50 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    txn.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <span className="material-symbols-outlined font-black">
                      {txn.status === 'Success' ? 'check_circle' : 'receipt_long'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white tracking-tight">{txn.title}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{txn.id} • {txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-slate-900 dark:text-white tracking-tight leading-none mb-1">{txn.amount}</p>
                  <p className={`text-[9px] font-black uppercase tracking-widest ${
                    txn.status === 'Success' ? 'text-emerald-500' : 'text-slate-400'
                  }`}>{txn.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Payments;

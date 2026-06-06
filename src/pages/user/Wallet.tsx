import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Wallet as WalletIcon, ArrowUpRight, History, Building2, Flame, CheckCircle2, Save, Calculator } from 'lucide-react';
import { motion } from 'motion/react';

export default function Wallet() {
  const { userProfile } = useAuth();
  
  // High dopamine fake payout data to motivate user
  const balance = 0.00;
  const salesThisMonth = 0; // Mocked
  const requiredSales = 3;
  const progress = Math.min((salesThisMonth / requiredSales) * 100, 100);
  
  const [payoutMethod, setPayoutMethod] = useState<'upi' | 'bank'>('upi');
  const [upiId, setUpiId] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
     e.preventDefault();
     setSaved(true);
     setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-16">
      
      <div className="mb-8 mt-4">
         <h2 className="text-4xl font-black text-text-main tracking-tight mb-2">Earnings & Payouts</h2>
         <p className="text-text-muted text-lg font-medium">Track your profit, gamify your sales, and get paid.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         {/* Balance & Gamification Card */}
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="neo-card bg-bg-card p-6 sm:p-8 rounded-3xl relative overflow-hidden ring-1 ring-border-subtle flex flex-col justify-between"
         >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <WalletIcon className="w-40 h-40" />
            </div>
            
            <div>
               <span className="text-sm font-bold tracking-widest text-text-muted uppercase mb-4 block">Available Balance</span>
               <div className="text-6xl font-black tracking-tighter text-text-main mb-8">
                 ₹{balance.toFixed(2)}
               </div>
            </div>
            
            <div className="bg-bg-surface border border-border-strong rounded-2xl p-5 relative z-10 shadow-inner">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2">
                       <Flame className={`w-5 h-5 ${salesThisMonth >= requiredSales ? 'text-alert' : 'text-text-muted'}`} />
                       <span className="font-bold text-text-main text-sm uppercase tracking-wider">Monthly Goal</span>
                   </div>
                   <span className="font-black text-text-main">{salesThisMonth} / {requiredSales} Sales</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-3 bg-bg-card rounded-full overflow-hidden border border-border-subtle mb-3 shadow-inner">
                   <div 
                     className="h-full bg-alert rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,51,102,0.8)]" 
                     style={{ width: `${progress}%` }}
                   />
                </div>
                
                <p className="text-xs font-bold text-text-muted">
                   {salesThisMonth >= requiredSales 
                     ? "Goal met! You will be paid in the 1st week of next month."
                     : `You need ${requiredSales - salesThisMonth} more sales this month to unlock your payout for next month.`}
                </p>
            </div>
         </motion.div>

         {/* Payout Details */}
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="neo-card bg-bg-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between ring-1 ring-border-subtle"
         >
            <div>
              <div className="w-12 h-12 bg-bg-surface rounded-xl flex items-center justify-center mb-6 border border-border-strong text-text-muted">
                 <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-text-main mb-2">Payout Details</h3>
              <p className="text-text-muted font-medium text-sm leading-relaxed mb-6">
                 We'll send your earnings via UPI or Bank Transfer every 1st week of the month (once requirements are met).
              </p>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
                <div className="flex items-center gap-2 bg-bg-surface p-1.5 rounded-xl border border-border-subtle">
                   <button type="button" onClick={() => setPayoutMethod('upi')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${payoutMethod === 'upi' ? 'bg-bg-card shadow-sm text-text-main ring-1 ring-border-subtle' : 'text-text-muted hover:text-text-main'}`}>UPI</button>
                   <button type="button" onClick={() => setPayoutMethod('bank')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${payoutMethod === 'bank' ? 'bg-bg-card shadow-sm text-text-main ring-1 ring-border-subtle' : 'text-text-muted hover:text-text-main'}`}>Bank</button>
                </div>
                
                {payoutMethod === 'upi' ? (
                   <input required type="text" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" className="neo-input w-full h-12 text-sm" />
                ) : (
                   <textarea required rows={3} value={bankDetails} onChange={e => setBankDetails(e.target.value)} placeholder="Account Number, IFSC Code, Bank Name" className="neo-input w-full resize-none text-sm p-3" />
                )}
                
                <button type="submit" className="w-full neo-button bg-text-main text-bg-base font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 mt-4 hover:scale-[1.02] active:scale-95 shadow-lg">
                   {saved ? <><CheckCircle2 className="w-5 h-5 text-primary" /> Saved</> : "Save Details"}
                </button>
            </form>
         </motion.div>
      </div>

      {/* The Profit Engine Visualizer */}
      <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.15 }}
         className="mb-8 neo-card bg-primary/5 border border-primary/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center"
      >
         <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center shrink-0">
            <Calculator className="w-8 h-8 text-primary" />
         </div>
         <div className="flex-1 text-center md:text-left">
             <h3 className="text-xl font-black text-text-main mb-2">How your 80/20 Profit works:</h3>
             <p className="text-text-muted font-medium mb-5 text-sm leading-relaxed max-w-xl">
               You only pay 20% on the <strong>profit margin</strong> you make above the base price. Keep 80% of what you earn on top.
             </p>
             <div className="bg-bg-base rounded-2xl p-5 border border-border-subtle flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-4 font-mono text-sm shadow-md text-left">
                <div className="flex flex-col"><span className="text-text-muted text-xs uppercase tracking-wider mb-1">Base Price:</span> <span className="font-bold text-text-main text-lg tracking-tight">₹100</span></div>
                <div className="flex flex-col"><span className="text-text-muted text-xs uppercase tracking-wider mb-1">You sell it for:</span> <span className="font-bold text-text-main text-lg tracking-tight">₹500</span></div>
                <div className="w-full sm:w-px sm:h-auto bg-border-subtle my-2 sm:my-0"></div>
                <div className="flex flex-col"><span className="text-text-muted text-xs uppercase tracking-wider mb-1">Total Profit:</span> <span className="font-bold text-text-main text-lg tracking-tight">₹400</span></div>
                <div className="flex flex-col"><span className="text-text-muted text-xs uppercase tracking-wider mb-1">Your Take (80%):</span> <span className="font-black text-primary text-xl drop-shadow-sm">₹320</span></div>
                <div className="flex flex-col"><span className="text-text-muted text-xs uppercase tracking-wider mb-1">Platform (20%):</span> <span className="font-bold text-text-muted opacity-70 text-lg">₹80</span></div>
             </div>
         </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="neo-card bg-bg-card rounded-3xl overflow-hidden ring-1 ring-border-subtle"
      >
        <div className="p-6 md:p-8 border-b border-border-subtle flex items-center justify-between">
           <h3 className="text-xl font-bold tracking-tight text-text-main flex items-center gap-2">
             <History className="w-5 h-5 text-text-muted" /> Payment History
           </h3>
        </div>
        <div className="p-12 flex flex-col items-center justify-center text-center">
           <div className="w-16 h-16 bg-bg-surface rounded-full flex items-center justify-center mb-4 text-text-muted border border-border-strong">
              <WalletIcon className="w-6 h-6 outline-none" />
           </div>
           <h4 className="text-lg font-bold text-text-main mb-1">No transactions yet</h4>
           <p className="text-sm font-medium text-text-muted max-w-sm">
             Launch your store and share your links to get your first sales rolling in.
           </p>
        </div>
      </motion.div>
      
    </div>
  );
}

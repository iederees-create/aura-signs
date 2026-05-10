import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, LayoutDashboard, Heart, Settings, LogOut, FileText, FolderKanban, ArrowRight, Loader2 } from "lucide-react";

export default function Vault() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("vault");
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const mockProject = {
    id: "PRJ-2026-05",
    title: "The Venter Wedding Signage",
    status: "design", // deposit, design, fabrication, shipped
    package: "Standard Package",
    date: "Oct 12, 2026",
    venue: "The Vineyard, Constantia",
    proofs: [
      { id: 1, name: "Welcome Sign V1", url: "https://picsum.photos/seed/proof1/800/1000", status: "pending", feedback: "" },
      { id: 2, name: "Bar Menu", url: "https://picsum.photos/seed/proof2/800/1000", status: "approved", feedback: "" }
    ]
  };

  const [proofs, setProofs] = useState(mockProject.proofs);
  const [selectedProof, setSelectedProof] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [noChangesChecked, setNoChangesChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleProofAction = (proofId, action) => {
    setProofs(prev => prev.map(p => {
      if (p.id === proofId) {
        return { ...p, status: action === 'approve' ? 'approved' : 'revision_requested', feedback: action === 'revise' ? feedback : '' };
      }
      return p;
    }));
    setSelectedProof(null);
    setFeedback("");
    setNoChangesChecked(false);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setShowQuoteForm(false);
      const whatsappMsg = encodeURIComponent(`Hi Aura Signs! I have submitted a quote request from my Vault for my wedding on ${e.target.weddingDate.value} at ${e.target.venue.value}.`);
      window.open(`https://wa.me/27123456789?text=${whatsappMsg}`, '_blank');
    }, 2000);
  };

  if (!user) return <div className="min-h-screen bg-[#080806]" />;

  const renderTimeline = () => {
    const stages = [
      { id: 'deposit', label: 'Deposit Received' },
      { id: 'design', label: 'Design & Proofs' },
      { id: 'approval', label: 'Client Approval' },
      { id: 'fabrication', label: 'Fabrication' },
      { id: 'quality', label: 'Quality Check' },
      { id: 'ready', label: 'Ready / Shipped' }
    ];
    
    const currentIndex = stages.findIndex(s => s.id === mockProject.status);

    return (
      <div className="relative flex justify-between mb-20 mt-12 px-4">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E8DFD0]/10 -translate-y-1/2 z-0" />
        <div className="absolute top-1/2 left-0 h-[1px] bg-[#E8DFD0] -translate-y-1/2 z-0 transition-all duration-1000" style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }} />
        
        {stages.map((stage, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full border mb-4 transition-all duration-500 ${isCompleted ? 'bg-[#E8DFD0] border-[#E8DFD0] scale-125' : 'bg-[#080806] border-[#E8DFD0]/20'} ${isActive ? 'ring-4 ring-[#E8DFD0]/10' : ''}`} />
              <span className={`text-[10px] uppercase tracking-[0.2em] font-medium text-center max-w-[80px] leading-relaxed ${isCompleted ? 'text-[#E8DFD0]' : 'text-[#E8DFD0]/30'}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#080806] flex text-[#E8DFD0]">
      {/* Sidebar */}
      <div className="w-80 border-r border-[#E8DFD0]/5 p-12 flex flex-col hidden lg:flex">
        <Link to="/" className="font-display font-semibold tracking-[0.2em] text-[#E8DFD0] text-xl mb-20">
          AURA SIGNS
        </Link>
        <div className="space-y-8 flex-1">
          <button onClick={() => setActiveTab("vault")} className={`flex items-center gap-4 text-xs uppercase tracking-[0.2em] transition-colors ${activeTab === 'vault' ? 'text-[#E8DFD0]' : 'text-[#E8DFD0]/40 hover:text-[#E8DFD0]'}`}>
            <LayoutDashboard size={18} strokeWidth={1.5} />
            The Vault
          </button>
          <button onClick={() => setActiveTab("projects")} className={`flex items-center gap-4 text-xs uppercase tracking-[0.2em] transition-colors ${activeTab === 'projects' ? 'text-[#E8DFD0]' : 'text-[#E8DFD0]/40 hover:text-[#E8DFD0]'}`}>
            <FolderKanban size={18} strokeWidth={1.5} />
            My Projects
          </button>
          <button className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-[#E8DFD0]/40 hover:text-[#E8DFD0] transition-colors">
            <Heart size={18} strokeWidth={1.5} />
            Saved Items
          </button>
          <button className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-[#E8DFD0]/40 hover:text-[#E8DFD0] transition-colors">
            <Settings size={18} strokeWidth={1.5} />
            Account
          </button>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-[#E8DFD0]/40 hover:text-[#E8DFD0] transition-colors pt-8 border-t border-[#E8DFD0]/5">
          <LogOut size={18} strokeWidth={1.5} />
          Sign Out
        </button>
      </div>

      {/* Proof Lightbox */}
      {selectedProof && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#080806]/95 backdrop-blur-md" onClick={() => setSelectedProof(null)} />
          <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 relative z-10 p-8 glass-panel border-[#E8DFD0]/10">
            <div className="aspect-[4/5] bg-black overflow-hidden border border-[#E8DFD0]/10">
              <img src={selectedProof.url} alt={selectedProof.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-display font-semibold mb-6">{selectedProof.name}</h3>
              
              <div className="space-y-6 mb-10">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-[#E8DFD0]/50">Any feedback or change requests?</label>
                  <textarea 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Leave blank if you are happy to proceed..."
                    className="w-full bg-[#080806] border border-[#E8DFD0]/10 p-4 text-sm focus:border-[#E8DFD0]/40 outline-none h-32"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={noChangesChecked}
                    onChange={(e) => setNoChangesChecked(e.target.checked)}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 border border-[#E8DFD0]/20 flex items-center justify-center transition-colors ${noChangesChecked ? 'bg-[#E8DFD0]' : ''}`}>
                    <ArrowRight size={14} className="text-[#080806]" />
                  </div>
                  <span className="text-sm text-[#E8DFD0]/60 group-hover:text-[#E8DFD0] transition-colors">I have reviewed the design and no changes are needed.</span>
                </label>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  disabled={!noChangesChecked && feedback.length === 0}
                  onClick={() => handleProofAction(selectedProof.id, feedback.length > 0 ? 'revise' : 'approve')}
                  className="btn-primary py-4 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {feedback.length > 0 ? 'Request Revisions' : 'Approve This Design'}
                </button>
                <button onClick={() => setSelectedProof(null)} className="text-[#E8DFD0]/40 uppercase tracking-widest text-[10px] hover:text-[#E8DFD0] transition-colors py-2">Back to Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#080806]/90 backdrop-blur-xl" onClick={() => setShowQuoteForm(false)} />
          <form onSubmit={handleQuoteSubmit} className="glass-panel max-w-xl w-full p-12 relative z-10 border-[#E8DFD0]/20">
            <h2 className="text-4xl font-display font-semibold mb-2">Request a Quote</h2>
            <p className="text-[#E8DFD0]/60 font-light mb-10 text-sm italic">Share your vision with us before we connect on WhatsApp.</p>
            
            <div className="space-y-6 mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#E8DFD0]/50">Wedding Date</label>
                  <input name="weddingDate" type="date" required className="w-full bg-[#080806]/50 border border-[#E8DFD0]/10 p-3 text-sm focus:border-[#E8DFD0]/40 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#E8DFD0]/50">Venue Name</label>
                  <input name="venue" type="text" required placeholder="e.g. Boschendal" className="w-full bg-[#080806]/50 border border-[#E8DFD0]/10 p-3 text-sm focus:border-[#E8DFD0]/40 outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#E8DFD0]/50">Package Interest</label>
                <select name="package" className="w-full bg-[#080806]/50 border border-[#E8DFD0]/10 p-3 text-sm focus:border-[#E8DFD0]/40 outline-none appearance-none">
                  <option value="essentials">Essentials Package</option>
                  <option value="standard">Standard Package</option>
                  <option value="premium">Premium Package</option>
                  <option value="custom">Custom Commission</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#E8DFD0]/50">Estimated Budget (Optional)</label>
                <input name="budget" type="text" placeholder="e.g. R5,000 - R8,000" className="w-full bg-[#080806]/50 border border-[#E8DFD0]/10 p-3 text-sm focus:border-[#E8DFD0]/40 outline-none" />
              </div>
            </div>

            <button disabled={quoteSubmitted} className="w-full btn-primary py-5 flex items-center justify-center gap-3">
              {quoteSubmitted ? <Loader2 className="animate-spin" size={20} /> : "Submit Brief & Start Chat"}
            </button>
          </form>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-12 lg:p-24 overflow-y-auto">
        <header className="mb-24 flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-display font-semibold mb-4">
              {activeTab === 'vault' ? 'Welcome to The Vault' : 'Your Signage Project'}
            </h1>
            <p className="text-[#E8DFD0]/40 font-light text-lg italic">
              {activeTab === 'vault' ? 'Exclusive resources for your Cape Town wedding.' : `Order ${mockProject.id} · ${mockProject.package}`}
            </p>
          </div>
          <div className="flex gap-4">
            {activeTab === 'vault' && (
              <button onClick={() => setShowQuoteForm(true)} className="btn-primary px-8 py-3 text-xs">Request New Quote</button>
            )}
          </div>
        </header>

        {activeTab === 'vault' ? (
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl">
            {/* Checklist Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-12 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#E8DFD0]/5 rounded-bl-full group-hover:scale-110 transition-transform duration-700" />
              <FileText size={32} className="text-[#E8DFD0] mb-8" strokeWidth={1.5} />
              <h3 className="text-3xl font-display font-semibold mb-4">The Master Checklist</h3>
              <p className="text-[#E8DFD0]/50 font-light mb-12 leading-relaxed">
                Our definitive guide to every sign you need, from welcome boards to bar menus and seating charts.
              </p>
              <button className="btn-outline w-full py-5 flex items-center justify-between group-hover:bg-[#E8DFD0] group-hover:text-[#080806]">
                Download PDF Guide
                <Download size={18} />
              </button>
            </motion.div>

            {/* Referrals Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="border border-[#E8DFD0]/10 p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-display font-semibold mb-2">Refer a Friend</h3>
              <p className="text-[#E8DFD0]/40 text-sm font-light mb-8 italic">Share the Aura experience and they get 10% off.</p>
              <div className="bg-[#080806] border border-[#E8DFD0]/10 p-4 text-[10px] uppercase tracking-widest text-center mb-6 text-[#E8DFD0]/60">
                AURASIGNS.COM/REF/JANE-D
              </div>
              <button className="text-xs uppercase tracking-widest text-[#E8DFD0] border-b border-[#E8DFD0] pb-2 self-start hover:text-[#C9603A] hover:border-[#C9603A] transition-colors">Copy Link</button>
            </motion.div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl">
            <div className="bg-[#080806] border border-[#E8DFD0]/5 p-12 mb-16">
              <div className="flex justify-between items-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8DFD0]/40">Production Timeline</span>
                <span className="text-xs italic text-[#C9A96E]">Wedding Date: {mockProject.date}</span>
              </div>
              {renderTimeline()}
            </div>
            
            <div className="mt-20">
              <h3 className="text-3xl font-display font-semibold mb-12">Design Proofs</h3>
              <div className="grid md:grid-cols-2 gap-12">
                {proofs.map((proof) => (
                  <div key={proof.id} className="group">
                    <div className="aspect-[4/5] bg-black mb-8 overflow-hidden relative border border-[#E8DFD0]/5">
                      <img src={proof.url} alt={proof.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
                      <div className="absolute top-6 right-6 bg-[#080806]/80 backdrop-blur-md px-4 py-2 text-[10px] uppercase tracking-widest border border-[#E8DFD0]/20">
                        {proof.status === 'approved' ? 'Approved' : 'Awaiting Review'}
                      </div>
                      {proof.status !== 'approved' && (
                        <button 
                          onClick={() => setSelectedProof(proof)}
                          className="absolute inset-0 flex items-center justify-center bg-[#080806]/0 group-hover:bg-[#080806]/40 transition-colors duration-500"
                        >
                          <span className="bg-[#E8DFD0] text-[#080806] px-8 py-4 text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">Review Design</span>
                        </button>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-display italic">{proof.name}</h4>
                      {proof.status === 'approved' && <span className="text-[#7A8C6E] text-[10px] uppercase tracking-widest flex items-center gap-2 font-bold"><div className="w-1.5 h-1.5 bg-[#7A8C6E] rounded-full" /> Approved</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

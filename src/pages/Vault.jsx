import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, LayoutDashboard, Heart, Settings, LogOut, FileText, FolderKanban, ArrowRight, Loader2, Save, User } from "lucide-react";

export default function Vault() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ full_name: "", phone: "", email: "" });
  const [activeTab, setActiveTab] = useState("vault");
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

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

  // Dynamic profile sync
  const checkAndSyncProfile = async (sessionUser) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .maybeSingle();

      if (error) {
        console.error("Error reading profile:", error);
        return;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          phone: data.phone || "",
          email: data.email || sessionUser.email
        });
      }
    } catch (err) {
      console.error("Critical profile sync error:", err);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        checkAndSyncProfile(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        checkAndSyncProfile(session.user);
      }
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
      const whatsappMsg = encodeURIComponent(`Hi Bold & Bespoke! I have submitted a quote request from my Vault for my wedding on ${e.target.weddingDate.value} at ${e.target.venue.value}.`);
      window.open(`https://wa.me/27662720491?text=${whatsappMsg}`, '_blank');
    }, 2000);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setSaveSuccess(false);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone: profile.phone
        })
        .eq('id', user.id);

      if (error) {
        console.error("Error saving profile details:", error);
      } else {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Critical error updating profile details:", err);
    } finally {
      setSavingProfile(false);
    }
  };

  if (!user) return <div className="min-h-screen bg-[#FAF8F5]" />;

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
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#080806]/15 -translate-y-1/2 z-0" />
        <div className="absolute top-1/2 left-0 h-[1px] bg-[#080806] -translate-y-1/2 z-0 transition-all duration-1000" style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }} />
        
        {stages.map((stage, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-3.5 h-3.5 rounded-full border mb-4 transition-all duration-500 ${isCompleted ? 'bg-[#080806] border-[#080806] scale-125' : 'bg-white border-[#080806]/30'} ${isActive ? 'ring-4 ring-[#080806]/10' : ''}`} />
              <span className={`text-[10px] uppercase tracking-[0.2em] font-extrabold text-center max-w-[80px] leading-relaxed ${isCompleted ? 'text-[#080806]' : 'text-[#080806]/40'}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-screen bg-[#FAF8F5] flex text-[#080806] pt-[72px] overflow-hidden">
      {/* Sidebar - Linen & Charcoal Premium Light Theme */}
      <div className="w-80 border-r border-[#080806]/15 p-12 flex flex-col hidden lg:flex bg-[#F4F0EA]">
        <Link to="/" className="font-serif font-light tracking-[0.2em] text-[#080806] text-3xl mb-20">
          BOLD & BESPOKE
        </Link>
        <div className="space-y-8 flex-1">
          <button onClick={() => setActiveTab("vault")} className={`flex items-center gap-4 text-xs uppercase tracking-[0.2em] transition-colors font-bold ${activeTab === 'vault' ? 'text-[#C9603A]' : 'text-[#080806]/70 hover:text-[#080806]'}`}>
            <LayoutDashboard size={18} strokeWidth={2} />
            The Vault
          </button>
          <button onClick={() => setActiveTab("projects")} className={`flex items-center gap-4 text-xs uppercase tracking-[0.2em] transition-colors font-bold ${activeTab === 'projects' ? 'text-[#C9603A]' : 'text-[#080806]/70 hover:text-[#080806]'}`}>
            <FolderKanban size={18} strokeWidth={2} />
            My Projects
          </button>
          <button onClick={() => setActiveTab("vault")} className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-[#080806]/50 hover:text-[#080806] transition-colors font-bold">
            <Heart size={18} strokeWidth={2} />
            Saved Items
          </button>
          <button onClick={() => setActiveTab("account")} className={`flex items-center gap-4 text-xs uppercase tracking-[0.2em] transition-colors font-bold ${activeTab === 'account' ? 'text-[#C9603A]' : 'text-[#080806]/70 hover:text-[#080806]'}`}>
            <Settings size={18} strokeWidth={2} />
            Account
          </button>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-[#080806]/50 hover:text-[#C9603A] transition-colors pt-8 border-t border-[#080806]/15 font-bold">
          <LogOut size={18} strokeWidth={2} />
          Sign Out
        </button>
      </div>

      {/* Proof Lightbox */}
      {selectedProof && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#080806]/60 backdrop-blur-md" onClick={() => setSelectedProof(null)} />
          <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 relative z-10 p-10 bg-[#FAF8F5] border border-[#080806]/15 shadow-2xl">
            <div className="aspect-[4/5] bg-white overflow-hidden border border-[#080806]/15">
              <img src={selectedProof.url} alt={selectedProof.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-serif font-light mb-6 text-[#080806]">{selectedProof.name}</h3>
              
              <div className="space-y-6 mb-10">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-[#080806] font-bold">Any feedback or change requests?</label>
                  <textarea 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Leave blank if you are happy to proceed..."
                    className="w-full bg-white border border-[#080806]/20 p-4 text-sm focus:border-[#080806] outline-none h-32 text-[#080806] placeholder-[#080806]/40"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={noChangesChecked}
                    onChange={(e) => setNoChangesChecked(e.target.checked)}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 border border-[#080806]/30 flex items-center justify-center transition-colors ${noChangesChecked ? 'bg-[#080806]' : 'bg-white'}`}>
                    <ArrowRight size={14} className={noChangesChecked ? 'text-[#FAF8F5]' : 'text-transparent'} />
                  </div>
                  <span className="text-sm text-[#080806]/70 group-hover:text-[#080806] transition-colors font-semibold">I have reviewed the design and no changes are needed.</span>
                </label>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  disabled={!noChangesChecked && feedback.length === 0}
                  onClick={() => handleProofAction(selectedProof.id, feedback.length > 0 ? 'revise' : 'approve')}
                  className="bg-[#080806] text-white py-4 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] hover:text-[#080806] border border-[#080806] transition-all font-bold uppercase tracking-widest text-xs"
                >
                  {feedback.length > 0 ? 'Request Revisions' : 'Approve This Design'}
                </button>
                <button onClick={() => setSelectedProof(null)} className="text-[#080806]/60 uppercase tracking-widest text-[10px] hover:text-[#080806] transition-colors py-2 font-bold">Back to Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#080806]/40 backdrop-blur-md" onClick={() => setShowQuoteForm(false)} />
          <form onSubmit={handleQuoteSubmit} className="bg-[#FAF8F5] border border-[#080806]/15 max-w-xl w-full p-12 relative z-10 shadow-2xl">
            <h2 className="text-4xl font-serif font-light mb-2 text-[#080806]">Request a Quote</h2>
            <p className="text-[#080806]/70 font-light mb-10 text-sm italic">Share your vision with us before we connect on WhatsApp.</p>
            
            <div className="space-y-6 mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#080806] font-bold">Wedding Date</label>
                  <input name="weddingDate" type="date" required className="w-full bg-white border border-[#080806]/20 p-3 text-sm focus:border-[#080806] outline-none text-[#080806]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#080806] font-bold">Venue Name</label>
                  <input name="venue" type="text" required placeholder="e.g. Boschendal" className="w-full bg-white border border-[#080806]/20 p-3 text-sm focus:border-[#080806] outline-none text-[#080806] placeholder-[#080806]/40" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#080806] font-bold">Package Interest</label>
                <select name="package" className="w-full bg-white border border-[#080806]/20 p-3 text-sm focus:border-[#080806] outline-none text-[#080806]">
                  <option value="essentials">Essentials Package</option>
                  <option value="standard">Standard Package</option>
                  <option value="premium">Premium Package</option>
                  <option value="custom">Custom Commission</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#080806] font-bold">Estimated Budget (Optional)</label>
                <input name="budget" type="text" placeholder="e.g. R5,000 - R8,000" className="w-full bg-white border border-[#080806]/20 p-3 text-sm focus:border-[#080806] outline-none text-[#080806] placeholder-[#080806]/40" />
              </div>
            </div>

            <button disabled={quoteSubmitted} className="w-full bg-[#080806] text-white hover:bg-transparent hover:text-[#080806] border border-[#080806] transition-all py-5 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs">
              {quoteSubmitted ? <Loader2 className="animate-spin" size={20} /> : "Submit Brief & Start Chat"}
            </button>
          </form>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-12 lg:p-24 overflow-y-auto">
        {activeTab === 'vault' && (
          <>
            <header className="mb-24 flex justify-between items-start">
              <div>
                <h1 className="text-5xl font-serif font-light mb-4 text-[#080806]">Project Vault</h1>
                <p className="text-[#080806]/70 font-light text-lg italic">Exclusive resources for your Cape Town projects.</p>
              </div>
              <button 
                onClick={() => setShowQuoteForm(true)} 
                className="bg-[#080806] text-white hover:bg-[#FAF8F5] hover:text-[#080806] border border-[#080806] transition-all px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-none shadow-sm"
              >
                Request New Quote
              </button>
            </header>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl">
              {/* Checklist Card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-[#080806]/15 p-12 group relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#080806]/5 rounded-bl-full group-hover:scale-110 transition-transform duration-700" />
                <FileText size={32} className="text-[#080806] mb-8" strokeWidth={1.5} />
                <h3 className="text-3xl font-serif font-light mb-4 text-[#080806]">The Master Checklist</h3>
                <p className="text-[#080806]/60 font-semibold mb-12 leading-relaxed">
                  Our definitive guide to every sign you need, from welcome boards to bar menus and seating charts.
                </p>
                <button className="w-full py-5 flex items-center justify-between border border-[#080806] text-[#080806] hover:bg-[#080806] hover:text-white font-bold transition-all px-6 uppercase tracking-widest text-xs bg-transparent">
                  Download PDF Guide
                  <Download size={18} />
                </button>
              </motion.div>

              {/* Referrals Card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-[#080806]/15 p-12 flex flex-col justify-center shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-3xl font-serif font-light mb-2 text-[#080806]">Refer a Friend</h3>
                <p className="text-[#080806]/50 text-sm font-semibold mb-8 italic">Share the Aura experience and they get 10% off.</p>
                <div className="bg-[#F4F0EA] border border-[#080806]/15 p-5 text-sm tracking-widest text-center mb-6 text-[#080806] font-bold">
                  BOLDANDBESPOKE.CO.ZA/REF/JANE-D
                </div>
                <button className="text-xs uppercase tracking-widest text-[#080806] border-b border-[#080806] pb-2 self-start hover:text-[#C9603A] hover:border-[#C9603A] transition-colors font-bold">Copy Link</button>
              </motion.div>
            </div>
          </>
        )}

        {activeTab === 'projects' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl">
            <header className="mb-24">
              <h1 className="text-5xl font-serif font-light mb-4 text-[#080806]">Your Signage Project</h1>
              <p className="text-[#080806]/70 font-light text-lg italic">Order {mockProject.id} · {mockProject.package}</p>
            </header>

            <div className="bg-white border border-[#080806]/15 p-12 mb-16 shadow-sm">
              <div className="flex justify-between items-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#080806]/50 font-bold">Production Timeline</span>
                <span className="text-xs italic text-[#C9603A] font-extrabold">Wedding Date: {mockProject.date}</span>
              </div>
              {renderTimeline()}
            </div>
            
            <div className="mt-20">
              <h3 className="text-3xl font-serif font-light mb-12 text-[#080806]">Design Proofs</h3>
              <div className="grid md:grid-cols-2 gap-12">
                {proofs.map((proof) => (
                  <div key={proof.id} className="group">
                    <div className="aspect-[4/5] bg-white mb-8 overflow-hidden relative border border-[#080806]/15 shadow-sm">
                      <img src={proof.url} alt={proof.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] uppercase tracking-widest border border-[#080806]/20 text-[#080806] font-bold">
                        {proof.status === 'approved' ? 'Approved' : 'Awaiting Review'}
                      </div>
                      {proof.status !== 'approved' && (
                        <button 
                          onClick={() => setSelectedProof(proof)}
                          className="absolute inset-0 flex items-center justify-center bg-[#FAF8F5]/0 group-hover:bg-[#FAF8F5]/30 transition-colors duration-500"
                        >
                          <span className="bg-[#080806] text-white px-8 py-4 text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 border border-transparent hover:bg-transparent hover:text-[#080806] hover:border-[#080806]">Review Design</span>
                        </button>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-serif italic text-[#080806]">{proof.name}</h4>
                      {proof.status === 'approved' && <span className="text-[#7A8C6E] text-[10px] uppercase tracking-widest flex items-center gap-2 font-bold"><div className="w-1.5 h-1.5 bg-[#7A8C6E] rounded-full animate-pulse" /> Approved</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Account Profile Editing Form */}
        {activeTab === 'account' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
            <header className="mb-20">
              <h1 className="text-5xl font-serif font-light mb-4 text-[#080806]">Account Settings</h1>
              <p className="text-[#080806]/70 font-light text-lg italic">Personalize your Bold & Bespoke experience.</p>
            </header>

            <form onSubmit={handleProfileSave} className="bg-white border border-[#080806]/15 p-12 shadow-sm space-y-8">
              <div className="flex items-center gap-4 pb-6 border-b border-[#080806]/15">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#080806]/15 flex items-center justify-center text-[#080806]">
                  <User size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#080806]">{profile.full_name || "Valued Client"}</h3>
                  <p className="text-xs text-[#080806]/60 font-semibold">{profile.email}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#080806] font-bold">Registered Email</label>
                  <input 
                    type="text" 
                    disabled 
                    value={profile.email} 
                    className="w-full bg-[#F4F0EA] border border-[#080806]/15 p-3 text-sm text-[#080806]/70 cursor-not-allowed outline-none font-bold" 
                  />
                  <p className="text-[10px] italic text-[#080806]/50">Your unique account identifier. Managed via authentication provider.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#080806] font-bold">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.full_name} 
                    onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="e.g. John Doe"
                    required
                    className="w-full bg-white border border-[#080806]/20 p-3 text-sm focus:border-[#080806] outline-none text-[#080806] font-semibold" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#080806] font-bold">Phone Number</label>
                  <input 
                    type="tel" 
                    value={profile.phone} 
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g. +27 66 272 0491"
                    className="w-full bg-white border border-[#080806]/20 p-3 text-sm focus:border-[#080806] outline-none text-[#080806] font-semibold" 
                  />
                </div>
              </div>

              {saveSuccess && (
                <div className="bg-[#7A8C6E]/10 border border-[#7A8C6E]/30 text-[#7A8C6E] text-xs font-bold uppercase tracking-wider p-4 text-center">
                  Profile updated successfully!
                </div>
              )}

              <button 
                type="submit" 
                disabled={savingProfile}
                className="w-full bg-[#080806] text-white hover:bg-transparent hover:text-[#080806] border border-[#080806] transition-all py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs"
              >
                {savingProfile ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}

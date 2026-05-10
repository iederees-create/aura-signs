import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, LayoutDashboard, Heart, Settings, LogOut, FileText, FolderKanban } from "lucide-react";

export default function Vault() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("vault");

  const mockProject = {
    id: "PRJ-2026-05",
    title: "The Venter Wedding Signage",
    status: "design", // deposit, design, fabrication, shipped
    date: "Oct 12, 2026",
    proofs: [
      { id: 1, name: "Welcome Sign V1", url: "https://picsum.photos/seed/proof1/800/1000", status: "pending" },
      { id: 2, name: "Bar Menu", url: "https://picsum.photos/seed/proof2/800/1000", status: "approved" }
    ]
  };

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

  if (!user) return <div className="min-h-screen bg-[#080806]" />;

  const renderTimeline = () => {
    const steps = [
      { id: 'deposit', label: 'Deposit Paid' },
      { id: 'design', label: 'Design & Proofs' },
      { id: 'fabrication', label: 'Fabrication' },
      { id: 'shipped', label: 'Ready / Shipped' }
    ];
    
    const currentIndex = steps.findIndex(s => s.id === mockProject.status);

    return (
      <div className="relative flex justify-between mb-16 mt-8">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E8DFD0]/10 -translate-y-1/2 z-0" />
        <div className="absolute top-1/2 left-0 h-[1px] bg-[#E8DFD0] -translate-y-1/2 z-0 transition-all duration-1000" style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }} />
        
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full border-2 mb-3 transition-colors duration-500 ${isCompleted ? 'bg-[#E8DFD0] border-[#E8DFD0]' : 'bg-[#080806] border-[#E8DFD0]/30'} ${isActive ? 'ring-4 ring-[#E8DFD0]/20' : ''}`} />
              <span className={`text-xs uppercase tracking-widest font-medium ${isCompleted ? 'text-[#E8DFD0]' : 'text-[#E8DFD0]/40'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#080806] flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#E8DFD0]/10 p-8 flex flex-col hidden md:flex">
        <Link to="/" className="font-display font-semibold tracking-[0.2em] text-[#E8DFD0] text-lg mb-12">
          AURA SIGNS
        </Link>
        <div className="space-y-6 flex-1">
          <button 
            onClick={() => setActiveTab("vault")}
            className={`flex items-center gap-3 text-sm font-medium transition-colors ${activeTab === 'vault' ? 'text-[#E8DFD0]' : 'text-[#E8DFD0]/50 hover:text-[#E8DFD0]'}`}
          >
            <LayoutDashboard size={18} />
            The Vault
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-3 text-sm font-medium transition-colors ${activeTab === 'projects' ? 'text-[#E8DFD0]' : 'text-[#E8DFD0]/50 hover:text-[#E8DFD0]'}`}
          >
            <FolderKanban size={18} />
            My Projects
          </button>
          <button className="flex items-center gap-3 text-sm font-medium text-[#E8DFD0]/50 hover:text-[#E8DFD0] transition-colors">
            <Heart size={18} />
            Saved Inspirations
          </button>
          <button className="flex items-center gap-3 text-sm font-medium text-[#E8DFD0]/50 hover:text-[#E8DFD0] transition-colors">
            <Settings size={18} />
            Preferences
          </button>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-3 text-sm font-medium text-[#E8DFD0]/50 hover:text-[#E8DFD0] transition-colors mt-auto">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 lg:p-20 overflow-y-auto">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-display font-semibold mb-2">
              {activeTab === 'vault' ? 'Welcome to The Vault' : mockProject.title}
            </h1>
            <p className="text-[#E8DFD0]/60 font-light">
              {activeTab === 'vault' ? 'Exclusive resources and inspiration for your big day.' : `Order ID: ${mockProject.id} · Event Date: ${mockProject.date}`}
            </p>
          </div>
          <div className="md:hidden">
            <button onClick={handleLogout} className="text-xs uppercase tracking-widest text-[#E8DFD0]/50">Sign Out</button>
          </div>
        </header>

        {activeTab === 'vault' ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {/* Download Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8DFD0]/5 rounded-bl-full transition-transform group-hover:scale-110" />
              <div className="w-12 h-12 rounded-none border border-[#E8DFD0]/20 flex items-center justify-center mb-6 text-[#E8DFD0]">
                <FileText size={24} />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-3">Event Signage Master Checklist</h3>
              <p className="text-[#E8DFD0]/60 font-light text-sm mb-8 leading-relaxed">
                Ensure nothing is forgotten. Download our comprehensive PDF checklist detailing every sign needed from welcome boards to bar menus and seating charts.
              </p>
              <button className="btn-outline w-full flex items-center justify-between group-hover:bg-[#E8DFD0] group-hover:text-[#080806]">
                Download PDF Guide
                <Download size={16} />
              </button>
            </motion.div>

            {/* Coming Soon Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border border-[#E8DFD0]/10 p-8 flex flex-col items-center justify-center text-center opacity-60"
            >
              <Heart size={24} className="mb-4 text-[#E8DFD0]/40" />
              <h3 className="text-xl font-display font-semibold mb-2">Saved Inspirations</h3>
              <p className="text-[#E8DFD0]/40 text-sm font-light">
                You haven't saved any designs yet. Browse our portfolio to build your mood board.
              </p>
              <Link to="/#portfolio" className="mt-6 text-xs uppercase tracking-widest text-[#E8DFD0] border-b border-[#E8DFD0] pb-1 hover:text-[#C9603A] hover:border-[#C9603A] transition-colors">
                Browse Portfolio
              </Link>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            {renderTimeline()}
            
            <div className="mt-16">
              <h3 className="text-2xl font-display font-semibold mb-8">Design Proofs</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {mockProject.proofs.map((proof) => (
                  <div key={proof.id} className="glass-panel p-6">
                    <div className="aspect-[4/5] bg-[#E8DFD0]/5 mb-6 overflow-hidden relative group">
                      <img src={proof.url} alt={proof.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                      <div className="absolute top-4 right-4 bg-[#080806]/80 backdrop-blur-md px-3 py-1 text-xs uppercase tracking-widest border border-[#E8DFD0]/20">
                        {proof.status}
                      </div>
                    </div>
                    <h4 className="text-lg font-display font-semibold mb-4">{proof.name}</h4>
                    {proof.status === 'pending' ? (
                      <div className="flex gap-4">
                        <button className="flex-1 btn-primary py-3 px-0 text-xs">Approve Design</button>
                        <button className="flex-1 btn-outline py-3 px-0 text-xs">Request Change</button>
                      </div>
                    ) : (
                      <div className="w-full bg-[#E8DFD0]/10 py-3 text-center text-[#7A8C6E] text-xs uppercase tracking-widest font-bold border border-[#7A8C6E]/30">
                        ✓ Approved for Fabrication
                      </div>
                    )}
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

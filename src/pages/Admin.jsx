import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, FolderKanban, MessageSquare, 
  Settings, LogOut, ChevronRight, 
  Upload, CheckCircle, Clock, 
  ArrowUpRight, LayoutDashboard,
  Loader2
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (data?.is_admin) {
      setIsAdmin(true);
    } else {
      // In production, we'd redirect away. 
      // For development, we'll allow viewing but show a warning if needed.
      setIsAdmin(true); // Temporary bypass for setup
    }
    setLoading(false);
  }

  if (loading) return <div className="min-h-screen bg-[#080806] flex items-center justify-center"><Clock className="animate-spin text-[#E8DFD0]" /></div>;

  const stats = [
    { label: "Active Projects", value: "12", icon: FolderKanban, color: "#C9A96E" },
    { label: "Pending Proofs", value: "5", icon: CheckCircle, color: "#7A8C6E" },
    { label: "Quote Requests", value: "8", icon: MessageSquare, color: "#C9603A" },
    { label: "Total Clients", value: "48", icon: Users, color: "#E8DFD0" }
  ];

  return (
    <div className="min-h-screen bg-[#080806] flex text-[#E8DFD0]">
      {/* Admin Sidebar */}
      <div className="w-72 border-r border-[#E8DFD0]/5 p-10 flex flex-col">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-8 bg-[#E8DFD0] flex items-center justify-center text-[#080806] font-bold text-xs">AS</div>
          <span className="font-display font-semibold tracking-widest text-sm">ADMIN PANEL</span>
        </div>

        <div className="space-y-6 flex-1">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === 'overview' ? 'text-[#E8DFD0] translate-x-2' : 'text-[#E8DFD0]/30 hover:text-[#E8DFD0] hover:translate-x-1'}`}
          >
            <LayoutDashboard size={16} strokeWidth={1.5} />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === 'projects' ? 'text-[#E8DFD0] translate-x-2' : 'text-[#E8DFD0]/30 hover:text-[#E8DFD0] hover:translate-x-1'}`}
          >
            <FolderKanban size={16} strokeWidth={1.5} />
            Projects
          </button>
          <button 
            onClick={() => setActiveTab("quotes")}
            className={`w-full flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === 'quotes' ? 'text-[#E8DFD0] translate-x-2' : 'text-[#E8DFD0]/30 hover:text-[#E8DFD0] hover:translate-x-1'}`}
          >
            <MessageSquare size={16} strokeWidth={1.5} />
            Quote Requests
          </button>
          <button 
            onClick={() => setActiveTab("clients")}
            className={`w-full flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === 'clients' ? 'text-[#E8DFD0] translate-x-2' : 'text-[#E8DFD0]/30 hover:text-[#E8DFD0] hover:translate-x-1'}`}
          >
            <Users size={16} strokeWidth={1.5} />
            Clients
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === 'settings' ? 'text-[#E8DFD0] translate-x-2' : 'text-[#E8DFD0]/30 hover:text-[#E8DFD0] hover:translate-x-1'}`}
          >
            <Settings size={16} strokeWidth={1.5} />
            Automation
          </button>
        </div>

        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#E8DFD0]/30 hover:text-[#E8DFD0] transition-colors pt-8 border-t border-[#E8DFD0]/5"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Exit Admin
        </button>
      </div>

      {/* Admin Content */}
      <div className="flex-1 p-12 lg:p-20 overflow-y-auto">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-display font-semibold mb-2 capitalize">
              Admin {activeTab}
            </h1>
            <p className="text-[#E8DFD0]/40 font-light text-sm italic">
              Aura Signs Operational Command
            </p>
          </div>
          <button className="btn-primary px-6 py-2 text-[10px] tracking-widest">NEW PROJECT</button>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="glass-panel p-8 border-[#E8DFD0]/5">
                  <s.icon size={20} className="mb-6" style={{ color: s.color }} strokeWidth={1.5} />
                  <div className="text-3xl font-display font-bold mb-1">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#E8DFD0]/30">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="glass-panel p-10 border-[#E8DFD0]/5">
                <h3 className="text-xl font-display font-semibold mb-8 flex justify-between items-center">
                  Recent Status Changes
                  <ArrowUpRight size={16} className="text-[#E8DFD0]/20" />
                </h3>
                <div className="space-y-8">
                  {[
                    { project: "Venter Wedding", action: "Proof Uploaded", time: "2h ago", icon: Upload },
                    { project: "Café Lumière", action: "Timeline: Fabrication", time: "5h ago", icon: Clock },
                    { project: "Neon Installation", action: "Deposit Confirmed", time: "1d ago", icon: CheckCircle }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-6 group cursor-pointer">
                      <div className="w-10 h-10 border border-[#E8DFD0]/10 flex items-center justify-center group-hover:border-[#E8DFD0]/40 transition-colors">
                        <activity.icon size={14} className="text-[#E8DFD0]/40" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.project}</div>
                        <div className="text-[10px] uppercase tracking-widest text-[#E8DFD0]/30">{activity.action}</div>
                      </div>
                      <div className="text-[10px] text-[#E8DFD0]/20">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-10 border-[#E8DFD0]/5">
                <h3 className="text-xl font-display font-semibold mb-8 flex justify-between items-center">
                  New Quote Requests
                  <MessageSquare size={16} className="text-[#E8DFD0]/20" />
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Sarah Jenkins", package: "Standard", date: "Oct 20" },
                    { name: "David Miller", package: "Premium", date: "Dec 12" }
                  ].map((quote, i) => (
                    <div key={i} className="p-6 border border-[#E8DFD0]/5 hover:border-[#E8DFD0]/20 transition-all flex items-center justify-between group">
                      <div>
                        <div className="font-display text-lg italic">{quote.name}</div>
                        <div className="text-[10px] uppercase tracking-widest text-[#E8DFD0]/30">{quote.package} Package · {quote.date}</div>
                      </div>
                      <button className="w-10 h-10 border border-[#E8DFD0]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other sections would be built similarly... */}
        {activeTab !== 'overview' && (
          <div className="h-[400px] flex flex-col items-center justify-center border border-dashed border-[#E8DFD0]/10 text-[#E8DFD0]/30 italic font-light">
            <Settings size={48} className="mb-4 opacity-20 animate-spin-slow" />
            <span>Operational Interface for {activeTab} coming online...</span>
          </div>
        )}
      </div>
    </div>
  );
}

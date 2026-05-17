import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, FolderKanban, MessageSquare, 
  Settings, LogOut, ChevronRight, 
  Upload, CheckCircle, Clock, 
  ArrowUpRight, LayoutDashboard,
  Loader2, Brain, Cpu, Sparkles,
  Hammer, ConciergeBell, ShieldCheck,
  Terminal, Play, RotateCcw, Power
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  
  // Terminal log auto-scroll ref
  const terminalEndRef = useRef(null);

  // Agent Automation states
  const [simulationLogs, setSimulationLogs] = useState([
    { time: "15:49:00", sender: "System", type: "info", text: "Bold & Bespoke Agentic Network initialized. Monitoring Supabase real-time pipelines..." }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const [agentMetrics, setAgentMetrics] = useState({
    concierge: { status: "online", active: true, count: 8 },
    estimator: { status: "online", active: true, count: 14 },
    creative: { status: "online", active: true, count: 6 },
    fabricator: { status: "online", active: true, count: 12 },
    butler: { status: "online", active: true, count: 32 }
  });

  // Mock static datasets
  const mockProjectsData = [
    { id: "PRJ-2026-01", client: "Jane & David", venue: "Belair Pavilion", date: "2026-10-18", status: "design", package: "Luxury Gold" },
    { id: "PRJ-2026-02", client: "Sarah & Mark", venue: "Constantia Uitsig", date: "2026-11-05", status: "fabrication", package: "Classic White" },
    { id: "PRJ-2026-03", client: "Naledi & Sipho", venue: "The Greenhouse", date: "2026-12-12", status: "deposit", package: "Rose Gold Mirror" },
    { id: "PRJ-2026-04", client: "Clara & Michael", venue: "Knorhoek Estate", date: "2026-11-20", status: "ready", package: "Custom Neon" }
  ];

  const mockQuotesData = [
    { id: "Q-8294", name: "Sarah Jenkins", email: "sarah.j@outlook.com", date: "2026-10-20", items: "Welcome Board, Seating Chart", status: "pending" },
    { id: "Q-8295", name: "David Miller", email: "david.m@gmail.com", date: "2026-12-12", items: "Bar Menu, Table Numbers", status: "pending" },
    { id: "Q-8296", name: "Emma Watson", email: "emma.w@yahoo.com", date: "2026-09-05", items: "Sail Arch Backdrop, Balloons", status: "reviewed" }
  ];

  const mockClientsData = [
    { name: "Jane Doe", email: "jane.d@gmail.com", phone: "+27 82 443 1924", location: "Cape Town", activeProjects: 1 },
    { name: "Sarah Jenkins", email: "sarah.j@outlook.com", phone: "+27 61 229 4812", location: "Stellenbosch", activeProjects: 0 },
    { name: "David Miller", email: "david.m@gmail.com", phone: "+27 72 384 9283", location: "Franschhoek", activeProjects: 1 }
  ];

  useEffect(() => {
    checkAdmin();
  }, []);

  // Auto scroll logs
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [simulationLogs]);

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
      setIsAdmin(true); // Bypass for setup
    }
    setLoading(false);
  }

  // Multi-Agent Workflow Simulation interval logic
  useEffect(() => {
    if (!isSimulating) return;

    const steps = [
      { time: "15:52:00", sender: "Orchestrator", type: "system", text: "New client lead submitted: 'Clara & Michael' (clara.m@gmail.com). Theme: 'Sage Green & Gold Mirror'. Venue: 'Belair Pavilion, 2026-11-20'." },
      { time: "15:52:01", sender: "Concierge", type: "agent", text: "Starting lead qualification. Dispatched EmailJS REST notification. Generated welcoming WhatsApp template." },
      { time: "15:52:02", sender: "Estimator", type: "agent", text: "Pricing custom Welcome Sign (Gold Mirror Acrylic, 900x600mm) + Sail Backdrop hire. Base sheet cost: R1,850. Labor: R600. Total R2,450. Secure payment link generated: stripe.com/pay/bold_bespoke_clara." },
      { time: "15:52:03", sender: "Creative Designer", type: "agent", text: "Auto-drafting typography vectors... centering serif font layouts for 'Clara & Michael'... generating proof high-res SVG. Mockup deposited in Client Vault Storage." },
      { time: "15:52:04", sender: "Orchestrator", type: "system", text: "Client logs into Vault and reviews proof... Feedback parsed: 'No Changes / Approved'. Stage upgraded to Fabrication." },
      { time: "15:52:05", sender: "Fabricator", type: "agent", text: "Initializing fabrication routine. Generating cutting vector nesting layouts for 2400x1200mm acrylic sheets... G-Code fabrication file generated successfully. Added to workshop print queue." },
      { time: "15:52:06", sender: "Butler", type: "agent", text: "Dispatched auto-notification: 'Hi Clara, your custom signage has officially entered production!'" },
      { time: "15:52:07", sender: "Orchestrator", type: "success", text: "Core cooperative workflow executed successfully with 100% agent synchronization. Loop closed." }
    ];

    if (simulationStep < steps.length) {
      const timer = setTimeout(() => {
        setSimulationLogs(prev => [...prev, {
          time: new Date().toLocaleTimeString(),
          sender: steps[simulationStep].sender,
          type: steps[simulationStep].type,
          text: steps[simulationStep].text
        }]);
        
        const sender = steps[simulationStep].sender;
        if (sender === "Concierge") setAgentMetrics(prev => ({ ...prev, concierge: { ...prev.concierge, count: prev.concierge.count + 1 } }));
        if (sender === "Estimator") setAgentMetrics(prev => ({ ...prev, estimator: { ...prev.estimator, count: prev.estimator.count + 1 } }));
        if (sender === "Creative Designer") setAgentMetrics(prev => ({ ...prev, creative: { ...prev.creative, count: prev.creative.count + 1 } }));
        if (sender === "Fabricator") setAgentMetrics(prev => ({ ...prev, fabricator: { ...prev.fabricator, count: prev.fabricator.count + 1 } }));
        if (sender === "Butler") setAgentMetrics(prev => ({ ...prev, butler: { ...prev.butler, count: prev.butler.count + 1 } }));

        setSimulationStep(prev => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      setIsSimulating(false);
    }
  }, [isSimulating, simulationStep]);

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setSimulationLogs([
      { time: new Date().toLocaleTimeString(), sender: "System", type: "info", text: "Initializing autonomous workflow simulation. Listening to lead events..." }
    ]);
  };

  const resetLogs = () => {
    setSimulationLogs([
      { time: new Date().toLocaleTimeString(), sender: "System", type: "info", text: "Bold & Bespoke Agentic Network initialized. Monitoring Supabase real-time pipelines..." }
    ]);
    setIsSimulating(false);
    setSimulationStep(0);
  };

  const toggleAgent = (key) => {
    setAgentMetrics(prev => ({
      ...prev,
      [key]: { ...prev[key], active: !prev[key].active }
    }));
  };

  if (loading) return <div className="min-h-screen bg-[#080806] flex items-center justify-center"><Clock className="animate-spin text-[#E8DFD0]" /></div>;

  const stats = [
    { label: "Active Projects", value: "12", icon: FolderKanban, color: "#C9A96E" },
    { label: "Pending Proofs", value: "5", icon: CheckCircle, color: "#7A8C6E" },
    { label: "Quote Requests", value: "8", icon: MessageSquare, color: "#C9603A" },
    { label: "Total Clients", value: "48", icon: Users, color: "#E8DFD0" }
  ];

  return (
    <div className="h-screen bg-[#080806] flex text-[#E8DFD0] pt-[72px] overflow-hidden">
      {/* Admin Sidebar */}
      <div className="w-72 border-r border-[#E8DFD0]/5 p-10 flex flex-col">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-8 bg-[#E8DFD0] flex items-center justify-center text-[#080806] font-bold text-xs">B</div>
          <span className="font-serif font-light tracking-widest text-sm uppercase">Bold & Bespoke Panel</span>
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
            <Brain size={16} strokeWidth={1.5} className="text-[#C9A96E]" />
            Agent Automation
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
            <h1 className="text-4xl font-serif font-light mb-2 capitalize">
              {activeTab === 'settings' ? "Agent Automation Hub" : `Admin ${activeTab}`}
            </h1>
            <p className="text-[#E8DFD0]/40 font-light text-sm italic">
              Bold & Bespoke Operational Command
            </p>
          </div>
          <button className="btn-primary px-6 py-2 text-[10px] tracking-widest">NEW PROJECT</button>
        </header>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="glass-panel p-8 border-[#E8DFD0]/5">
                  <s.icon size={20} className="mb-6" style={{ color: s.color }} strokeWidth={1.5} />
                  <div className="text-3xl font-serif font-light mb-1">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#E8DFD0]/30">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="glass-panel p-10 border-[#E8DFD0]/5">
                <h3 className="text-xl font-serif font-light mb-8 flex justify-between items-center">
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
                <h3 className="text-xl font-serif font-light mb-8 flex justify-between items-center">
                  New Quote Requests
                  <MessageSquare size={16} className="text-[#E8DFD0]/20" />
                </h3>
                <div className="space-y-6">
                  {mockQuotesData.slice(0, 2).map((quote, i) => (
                    <div key={i} className="p-6 border border-[#E8DFD0]/5 hover:border-[#E8DFD0]/20 transition-all flex items-center justify-between group">
                      <div>
                        <div className="font-display text-lg italic">{quote.name}</div>
                        <div className="text-[10px] uppercase tracking-widest text-[#E8DFD0]/30">{quote.items} · {quote.date}</div>
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

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="glass-panel p-10 border-[#E8DFD0]/5 animate-fade-in">
            <h3 className="text-2xl font-serif font-light mb-8">Active Workspaces</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8DFD0]/10 text-[10px] uppercase tracking-widest text-[#E8DFD0]/40">
                    <th className="py-4">Project ID</th>
                    <th className="py-4">Client</th>
                    <th className="py-4">Venue</th>
                    <th className="py-4">Date</th>
                    <th className="py-4">Status</th>
                    <th className="py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD0]/5 text-sm">
                  {mockProjectsData.map((project) => (
                    <tr key={project.id} className="hover:bg-[#E8DFD0]/5 transition-colors">
                      <td className="py-4 font-mono font-bold text-xs text-[#C9A96E]">{project.id}</td>
                      <td className="py-4 font-medium">{project.client}</td>
                      <td className="py-4 italic font-serif text-[#E8DFD0]/70">{project.venue}</td>
                      <td className="py-4 text-xs font-mono">{project.date}</td>
                      <td className="py-4">
                        <span className={`inline-block px-2.5 py-1 text-[9px] uppercase tracking-widest font-semibold ${
                          project.status === 'ready' ? 'bg-[#7A8C6E]/20 text-[#7A8C6E]' :
                          project.status === 'fabrication' ? 'bg-[#C9603A]/20 text-[#C9603A]' :
                          project.status === 'design' ? 'bg-[#C9A96E]/20 text-[#C9A96E]' : 'bg-[#E8DFD0]/10 text-[#E8DFD0]'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-xs uppercase tracking-widest text-[#C9A96E] hover:text-white transition-colors">Manage Vault</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* QUOTES TAB */}
        {activeTab === 'quotes' && (
          <div className="glass-panel p-10 border-[#E8DFD0]/5 animate-fade-in">
            <h3 className="text-2xl font-serif font-light mb-8">Client Inquiries & Quote Pipeline</h3>
            <div className="space-y-4">
              {mockQuotesData.map((quote) => (
                <div key={quote.id} className="p-8 border border-[#E8DFD0]/5 hover:border-[#E8DFD0]/20 bg-[#E8DFD0]/[0.01] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#E8DFD0]/5 border border-[#E8DFD0]/10 rounded text-[#C9A96E]">{quote.id}</span>
                      <h4 className="font-serif text-xl italic">{quote.name}</h4>
                    </div>
                    <p className="text-xs text-[#E8DFD0]/40 font-mono mb-3">{quote.email}</p>
                    <div className="text-xs tracking-wider text-[#E8DFD0]/70 flex items-center gap-2">
                      <span>🎨 {quote.items}</span>
                      <span className="text-[#E8DFD0]/20">•</span>
                      <span>📅 {quote.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 self-end md:self-auto">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-amber-500/10 text-amber-300 font-semibold">{quote.status}</span>
                    <button className="btn-primary py-2 px-4 text-[9px] tracking-widest hover:bg-white transition-colors">PROCESS LEAD</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLIENTS TAB */}
        {activeTab === 'clients' && (
          <div className="glass-panel p-10 border-[#E8DFD0]/5 animate-fade-in">
            <h3 className="text-2xl font-serif font-light mb-8">Onboarded Client Dossiers</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {mockClientsData.map((client, i) => (
                <div key={i} className="p-8 border border-[#E8DFD0]/5 bg-[#E8DFD0]/[0.02] flex flex-col">
                  <div className="w-12 h-12 bg-[#E8DFD0]/5 border border-[#E8DFD0]/10 rounded-full flex items-center justify-center font-serif text-xl text-[#C9A96E] mb-6">
                    {client.name.charAt(0)}
                  </div>
                  <h4 className="font-serif text-2xl tracking-wide mb-1">{client.name}</h4>
                  <span className="text-[10px] uppercase tracking-widest text-[#E8DFD0]/30 font-semibold mb-6">{client.location}</span>
                  <div className="space-y-2 text-xs text-[#E8DFD0]/60 mb-6 font-mono">
                    <div>✉️ {client.email}</div>
                    <div>📞 {client.phone}</div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-[#E8DFD0]/5 flex justify-between items-center text-xs">
                    <span className="text-[#E8DFD0]/40">Active Projects</span>
                    <span className="font-bold text-[#C9A96E]">{client.activeProjects}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AGENT AUTOMATION TAB (SETTINGS) */}
        {activeTab === 'settings' && (
          <div className="space-y-12 animate-fade-in">
            {/* Description Card */}
            <div className="glass-panel p-8 border-[#C9A96E]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#C9A96E]/[0.02]">
              <div className="flex gap-4 items-start">
                <Brain size={36} className="text-[#C9A96E] shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-serif font-light tracking-wide">Autonomous Agent Operations</h3>
                  <p className="text-sm text-[#E8DFD0]/60 mt-1 max-w-2xl leading-relaxed">
                    Bold & Bespoke operates as a fully cooperative multi-agent organization. Specialized AI agents independently monitor Supabase records to execute sales intake, pricing calculations, vector designs, and client support logs.
                  </p>
                </div>
              </div>
              <button 
                onClick={startSimulation}
                disabled={isSimulating}
                className="btn-primary py-4 px-6 flex items-center gap-2 self-start md:self-auto shrink-0 bg-[#C9A96E] text-[#080806] font-bold disabled:opacity-50"
              >
                {isSimulating ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
                {isSimulating ? "RUNNING COOPERATION..." : "SIMULATE WORKFLOW"}
              </button>
            </div>

            {/* Active Agents Grid */}
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { 
                  key: 'concierge',
                  name: "Concierge Agent", 
                  role: "Sales Intake", 
                  metric: "Leads Qualified",
                  icon: ConciergeBell,
                  desc: "Drafts WhatsApp leads, dispatches EmailJS files, schedules onboarding calls." 
                },
                { 
                  key: 'estimator',
                  name: "Estimator Agent", 
                  role: "Pricing & Valuation", 
                  metric: "Quotes Estimated",
                  icon: Cpu,
                  desc: "Evaluates raw sheet prices, margins, calligraphy lines, and outputs PDF quotes." 
                },
                { 
                  key: 'creative',
                  name: "Creative Agent", 
                  role: "Vector Design & Proofs", 
                  metric: "Mockups Rendered",
                  icon: Sparkles,
                  desc: "Generates custom typography layout mockups, centerlines calligraphy, uploads to Vault." 
                },
                { 
                  key: 'fabricator',
                  name: "Fabricator Agent", 
                  role: "Workshop & Logistics", 
                  metric: "G-Code Layouts",
                  icon: Hammer,
                  desc: "Converts vector mockups to CNC toolpaths, nests elements, organizes sheet stocks." 
                },
                { 
                  key: 'butler',
                  name: "Butler Agent", 
                  role: "Client Support", 
                  metric: "Queries Solved",
                  icon: ShieldCheck,
                  desc: "Answers Vault help tickets, auto-updates design proofs based on change requests." 
                }
              ].map((agent) => {
                const config = agentMetrics[agent.key];
                return (
                  <div 
                    key={agent.key} 
                    className={`p-6 border flex flex-col justify-between transition-all duration-500 bg-[#080806] ${
                      config.active ? 'border-[#E8DFD0]/10 hover:border-[#C9A96E]/30' : 'border-[#E8DFD0]/5 opacity-40'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-2.5 border rounded-lg ${config.active ? 'bg-[#C9A96E]/10 border-[#C9A96E]/20 text-[#C9A96E]' : 'bg-[#E8DFD0]/5 border-[#E8DFD0]/10 text-[#E8DFD0]/40'}`}>
                          <agent.icon size={18} strokeWidth={1.5} />
                        </div>
                        <button 
                          onClick={() => toggleAgent(agent.key)}
                          className={`text-xs p-1.5 rounded-md border transition-all ${
                            config.active ? 'border-[#7A8C6E]/20 text-[#7A8C6E] hover:bg-[#7A8C6E]/10' : 'border-[#C9603A]/20 text-[#C9603A] hover:bg-[#C9603A]/10'
                          }`}
                          title={config.active ? "Deactivate Agent" : "Activate Agent"}
                        >
                          <Power size={12} />
                        </button>
                      </div>
                      <h4 className="font-serif text-lg font-semibold tracking-wide mb-1">{agent.name}</h4>
                      <p className="text-[9px] uppercase tracking-widest text-[#C9A96E] font-bold mb-4">{agent.role}</p>
                      <p className="text-xs text-[#E8DFD0]/50 leading-relaxed mb-6 font-light">{agent.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-[#E8DFD0]/5 flex justify-between items-center text-[10px]">
                      <span className="text-[#E8DFD0]/30">{agent.metric}</span>
                      <span className="font-mono font-bold text-[#E8DFD0]/80">{config.count}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Agent Live Terminal / Log Stream */}
            <div className="glass-panel p-8 border-[#E8DFD0]/5 flex flex-col h-[400px]">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]/5 mb-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-[#E8DFD0]/60">
                  <Terminal size={14} className="text-[#C9A96E]" />
                  <span>Agentic Network Terminal Log Stream</span>
                </div>
                <button 
                  onClick={resetLogs}
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#E8DFD0]/40 hover:text-white transition-colors"
                >
                  <RotateCcw size={10} />
                  <span>Reset Monitor</span>
                </button>
              </div>

              {/* Log Stream Content */}
              <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-3 pr-2 scrollbar-thin scrollbar-thumb-[#E8DFD0]/10">
                {simulationLogs.map((log, index) => (
                  <div key={index} className="flex gap-4 items-start py-0.5 hover:bg-[#E8DFD0]/[0.02] rounded px-2 transition-colors">
                    <span className="text-[#E8DFD0]/20 shrink-0 select-none">[{log.time}]</span>
                    <span className={`shrink-0 font-bold ${
                      log.sender === 'Orchestrator' ? 'text-[#C9A96E]' :
                      log.sender === 'System' ? 'text-blue-400' :
                      log.sender === 'Concierge' ? 'text-[#E8DFD0]' : 'text-[#7A8C6E]'
                    }`}>
                      [{log.sender}]
                    </span>
                    <span className={`leading-relaxed ${
                      log.type === 'success' ? 'text-[#7A8C6E] font-semibold' :
                      log.type === 'system' ? 'text-[#C9A96E]' : 'text-[#E8DFD0]/80'
                    }`}>
                      {log.text}
                    </span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

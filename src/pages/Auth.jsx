import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(new URLSearchParams(location.search).get("signup") === "true");
  const [isResetting, setIsResetting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isResetting) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/aura-signs/#/auth?reset=true`,
      });
      if (error) setMessage(error.message);
      else setMessage("Check your email for the password reset link.");
    } else if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) setMessage(error.message);
      else setMessage("Check your email for the confirmation link to enter your Project Vault.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMessage(error.message);
      else navigate("/vault");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080806] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8DFD0]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="block text-center mb-8 font-serif font-light tracking-[0.2em] text-[#E8DFD0] text-3xl">
          BESPOKE
        </Link>
        
        <div className="glass-panel p-10 rounded-none relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8DFD0]/30 to-transparent" />
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-light mb-2 text-[#E8DFD0]">
              {isResetting ? "Reset Password" : (isSignUp ? "Project Vault" : "Welcome Back")}
            </h2>
            <p className="text-[#E8DFD0]/60 text-sm font-light">
              {isResetting ? "Enter your email to receive a secure reset link." : (isSignUp ? "Access your custom projects, inspirations, and design proofs." : "Sign in to access your dashboard and inspirations.")}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DFD0]/40" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#080806]/50 border border-[#E8DFD0]/10 focus:border-[#E8DFD0]/40 text-[#E8DFD0] focus:outline-none transition-all placeholder:text-[#E8DFD0]/30 font-light"
                />
              </div>
              {!isResetting && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DFD0]/40" size={18} />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-[#080806]/50 border border-[#E8DFD0]/10 focus:border-[#E8DFD0]/40 text-[#E8DFD0] focus:outline-none transition-all placeholder:text-[#E8DFD0]/30 font-light"
                  />
                </div>
              )}
            </div>

            <button 
              disabled={loading}
              className="w-full btn-primary group flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (isResetting ? "Send Reset Link" : (isSignUp ? "Unlock Access" : "Sign In"))}
              {!loading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />}
            </button>

            {message && (
              <p className={`text-center text-sm font-medium ${message.includes("email") || message.includes("Check") ? "text-[#7A8C6E]" : "text-[#C9603A]"}`}>
                {message}
              </p>
            )}

            <div className="flex flex-col space-y-4 text-center pt-6 border-t border-[#E8DFD0]/10">
              <button
                type="button"
                onClick={() => {
                  setIsResetting(false);
                  setIsSignUp(!isSignUp);
                }}
                className="text-xs uppercase tracking-widest text-[#E8DFD0]/50 hover:text-[#E8DFD0] transition-colors"
              >
                {isSignUp ? "Already a member? Sign In" : "Don't have an account? Sign Up"}
              </button>
              
              {!isResetting && !isSignUp && (
                <button
                  type="button"
                  onClick={() => setIsResetting(true)}
                  className="text-xs uppercase tracking-widest text-[#E8DFD0]/30 hover:text-[#E8DFD0] transition-colors"
                >
                  Forgot Password?
                </button>
              )}
              
              {isResetting && (
                <button
                  type="button"
                  onClick={() => setIsResetting(false)}
                  className="text-xs uppercase tracking-widest text-[#E8DFD0]/30 hover:text-[#E8DFD0] transition-colors"
                >
                  Back to Sign In
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

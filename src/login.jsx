import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  
 
  const [password, setPassword] = useState(""); 
  const [claims, setClaims] = useState(null);

  useEffect(() => {
   
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
       
        navigate("/Home", { replace: true });
      }
    });

   
    supabase.auth.getClaims().then(({ data: { claims } }) => {
      setClaims(claims);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data: { claims } }) => {
        setClaims(claims);
      });
    });

    return () => subscription.unsubscribe();
  }, [navigate]);


  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password, 
    });

    if (error) {
      alert(`Gagal Masuak, Bre: ${error.message}`);
    } else {
      alert("Sukses Masuak Murni!");
      navigate("/Home", { replace: true }); 
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setClaims(null);
  };

  
  if (claims) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white font-mono">
        <h1>Welcome!</h1>
        <p>You are logged in as: {claims.email}</p>
        <button onClick={handleLogout} className="mt-4 rounded bg-red-600 p-2 text-sm font-bold">Sign Out</button>
      </div>
    );
  }

  
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-100 p-4 font-mono">
      <div className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-md">
        
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-white">
            Login Mode Password
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Bypass rate-limit SMTP murni
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* INPUT EMAIL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Email Address:
            </label>
            <input
              type="email"
              placeholder="jejepTurbo@email.com"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 p-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-all"
            />
          </div>

         
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Password:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 p-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-all"
            />
          </div>

          {/* TOMBOL SUBMIT */}
          <button
            disabled={loading}
            className="w-full rounded bg-blue-600 p-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Loading...
              </span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
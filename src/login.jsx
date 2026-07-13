import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase.js";

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/Home", { replace: true });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/Home", { replace: true });
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (isRegister) {
      // FIX 1: Sintaks standar Supabase untuak metadata tambahan (Username)
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: username, 
          },
        },
      });

      if (error) {
        alert(`Gagal Daftar: ${error.message}`);
      } else {
        if (data?.session) {
          navigate("/Home", { replace: true });
        } else {
          alert("Registrasi Berhasil! Cek email konfirmasi di inbox/spam.");
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert(`Gagal Masuak: ${error.message}`);
      } else {
        navigate("/Home", { replace: true });
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-100 p-4 font-mono">
      <div className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-md">
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-white">
            {isRegister ? "Buat Akun Baru" : "Login"}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister ? "Silakan daftar untuk mencatat resi." : "Selamat datang kembali."}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          
          {isRegister && (
            <div className="flex flex-col gap-1.5 animate-[fadeIn_0.2s_ease-out]">
              <label className="text-xs font-semibold text-slate-300">Username</label>
              <input
                type="text"
                placeholder="Jejep"
                value={username} 
                required={true}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded border border-slate-600 bg-slate-900 p-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address:</label>
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
            <label className="text-xs font-semibold text-slate-300">Password:</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 p-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-all"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded bg-blue-600 p-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-50 shadow-md"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Loading...
              </span>
            ) : <span>{isRegister ? "Register" : "Login"}</span>}
          </button>
        </form>

        <div className="mt-4 text-center text-xs">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-400 hover:underline focus:outline-none"
          >
            {isRegister ? "Sudah punya akun? Login di sini" : "Belum punya akun? Daftar di sini"}
          </button>
        </div>
      </div>
    </div>
  );
}
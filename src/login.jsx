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
  const [claims, setClaims] = useState(null);

  // Check URL params on initial render
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get("token_hash");

  const [verifying, setVerifying] = useState(!!hasTokenHash);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    // Check if we have token_hash in URL (magic link callback)
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get("token_hash");
    const type = params.get("type");

    if (token_hash) {
      // Verify the OTP token
      supabase.auth
        .verifyOtp({
          token_hash,
          type: type || "email",
        })
        .then(({ error }) => {
          if (error) {
            setAuthError(error.message);
          } else {
            setAuthSuccess(true);
            // Clear URL params
            window.history.replaceState({}, document.title, "/App");
            navigate("/App", { replace: true });
          }
          setVerifying(false);
        });
    }

    // Check for existing session using getClaims
    supabase.auth.getClaims().then(({ data: { claims } }) => {
      setClaims(claims);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data: { claims } }) => {
        setClaims(claims);
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/App`,
      },
    });
    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setClaims(null);
  };

  // Show verification state
  if (verifying) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>Confirming link...</p>
        <p>Loading...</p>
      </div>
    );
  }

  // Show auth error
  if (authError) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✗ Authentication failed</p>
        <p>{authError}</p>
        <button
          onClick={() => {
            setAuthError(null);
            window.history.replaceState({}, document.title, "/");
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  // Show auth success (briefly before claims load)
  if (authSuccess && !claims) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✓ Authentication successful!</p>
        <p>Loading your account...</p>
      </div>
    );
  }

  // If user is logged in, show welcome screen
  if (claims) {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>You are logged in as: {claims.email}</p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    );
  }

  // Show login form
  return (
<div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-100 p-4 font-mono">
 
  <div className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-md">
    
    
    <div className="mb-6">
      <h1 className="text-xl font-bold tracking-tight text-white">
        Login
      </h1>
      <p className="text-xs text-slate-400 mt-1">
      </p>
    </div>

    
    <form onSubmit={handleLogin} className="space-y-4">
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
          <span>Kirim link</span>
        )}
      </button>
    </form>
  </div>
</div>
  );
}

import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import HomeMenu from "./HomeMenu.jsx";
import { supabase } from "./supabase.js";
import TransactionList from "./TransactionList.jsx";
import FormInsert from "./FormInsert.jsx";
import Account from "./Account.jsx";

function Home() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [userName, setUserName] = useState("HoOoman");
  const [pengeluaran, setPengeluaran] = useState(0);
  const [foto, setFoto] = useState();
  const [previewFoto, setPreviewFoto] = useState();
  const [tambahManual, setTambahManual] = useState(false);
  const [profil, setProfil] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function proteksiDanFetch() {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError || !session) {
        console.warn("User belum login, redirect ke halaman auth.");
        navigate("/");
        return;
      }

      const user = session.user;
      setLoadingAuth(false);

      const { data: transactionsData, error: dbError } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (dbError) {
        console.error("Error database:", dbError.message);
      } else if (transactionsData) {
        setTransactions(transactionsData);
        setUserEmail(user.email);
        setUserName(user.user_name);

        let total = 0;
        transactionsData.forEach((item) => {
          total = total + Number(item.total_amount || 0);
        });
        setPengeluaran(total);
      }
    }

    proteksiDanFetch();
  }, [navigate]);

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center font-mono">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></span>
          <span>Checking_Auth...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#26282a]">
      {tambahManual && (
        <div className="fixed inset-0 flex justify-center items-center  z-40 bg-black/50 backdrop-blur-sm">
          <div className="animasi-masuak">
            <FormInsert setTambahManual={setTambahManual} />
          </div>
        </div>
      )}

      {profil && (
        <div className="fixed inset-0 flex bg-black/50 justify-center items-center z-40 backdrop-blur-sm">
          <div className="animasi-masuak">
            <Account
              setProfil={setProfil}
              userName={userName}
              userEmail={userEmail}
            />
          </div>
        </div>
      )}

      <Header />
      <Footer setProfil={setProfil} />
      <HomeMenu
        userName={userName}
        pengeluaran={pengeluaran}
        setTambahManual={setTambahManual}
      />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default Home;

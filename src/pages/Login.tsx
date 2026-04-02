import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Camera, ArrowRight, Loader2 } from "lucide-react";
// ── Import the shared animated background ──────────────────────
import { AnimatedBackground } from "@/components/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({ title: "Please fill all fields" });
      return;
    }

    try {
      setLoading(true);

      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));

      if (userDoc.exists() && userDoc.data()?.role === "partner") {
        navigate("/partner");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ background: "#000", minHeight: "100vh" }}
      className="flex items-center justify-center px-4 relative overflow-hidden"
    >
      {/* ── Shared animated background (same as all other pages) ── */}
      <AnimatedBackground />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          animation: "fadeUp 0.5s ease forwards",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {/* Logo mark */}
        <div className="flex flex-col items-center mb-8">
          <div
            style={{
              background: "linear-gradient(135deg, hsl(0,84%,52%), hsl(0,78%,38%))",
              borderRadius: "16px",
              padding: "14px",
              marginBottom: "16px",
              boxShadow: "0 4px 24px -4px rgba(220,30,30,0.45)",
            }}
          >
            <Camera style={{ width: 28, height: 28, color: "#fff" }} />
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "#ebebeb",
              margin: 0,
              letterSpacing: "-0.3px",
            }}
          >
            KejShots
          </h1>
          <p style={{ color: "#7a7a7a", fontSize: "13px", marginTop: "4px" }}>
            Photography Studio Management
          </p>
        </div>

        {/* Form card */}
        <div
          style={{
            background: "#0f0f0f",
            border: "1px solid #292929",
            borderRadius: "20px",
            padding: "36px 32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#ebebeb",
              marginBottom: "6px",
            }}
          >
            Welcome back
          </h2>
          <p style={{ color: "#7a7a7a", fontSize: "13px", marginBottom: "28px" }}>
            Sign in to your admin account
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#9e9e9e", marginBottom: "8px" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@kejshots.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  background: "#1c1c1c",
                  border: "1px solid #292929",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  color: "#ebebeb",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "hsl(0,84%,52%)")}
                onBlur={(e) => (e.target.style.borderColor = "#292929")}
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: 500, color: "#9e9e9e" }}>
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  style={{ fontSize: "12px", color: "hsl(0,84%,52%)", textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    background: "#1c1c1c",
                    border: "1px solid #292929",
                    borderRadius: "10px",
                    padding: "11px 44px 11px 14px",
                    color: "#ebebeb",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "hsl(0,84%,52%)")}
                  onBlur={(e) => (e.target.style.borderColor = "#292929")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#7a7a7a",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword
                    ? <EyeOff style={{ width: 16, height: 16 }} />
                    : <Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading
                  ? "#7a1a1a"
                  : "linear-gradient(135deg, hsl(0,84%,52%), hsl(0,78%,38%))",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "4px",
                boxShadow: "0 4px 20px -4px rgba(220,30,30,0.45)",
                transition: "opacity 0.2s",
              }}
            >
              {loading ? (
                <>
                  <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#292929" }} />
            <span style={{ fontSize: "12px", color: "#7a7a7a" }}>New here?</span>
            <div style={{ flex: 1, height: "1px", background: "#292929" }} />
          </div>

          <Link
            to="/signup"
            style={{
              display: "block",
              textAlign: "center",
              padding: "11px",
              borderRadius: "10px",
              border: "1px solid #292929",
              background: "transparent",
              color: "#ebebeb",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "hsl(0,84%,52%)";
              (e.target as HTMLElement).style.color = "hsl(0,84%,52%)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "#292929";
              (e.target as HTMLElement).style.color = "#ebebeb";
            }}
          >
            Create an account
          </Link>
        </div>

        <p style={{ textAlign: "center", color: "#484848", fontSize: "12px", marginTop: "24px" }}>
          © {new Date().getFullYear()} KejShots Photography Studio
        </p>
      </div>
    </div>
  );
};

export default Login;

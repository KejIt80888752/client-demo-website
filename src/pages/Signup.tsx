import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Camera, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
// ── Import the shared animated background ──────────────────────
import { AnimatedBackground } from "@/components/Layout";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({ title: "Please fill all fields" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters" });
      return;
    }

    try {
      setLoading(true);

      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "users", uid), {
        name,
        email,
        role: "user",
        createdAt: new Date(),
      });

      setDone(true);
      toast({ title: "Account created successfully!" });

      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      toast({
        title: "Signup failed",
        description: err?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
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
        {/* Logo */}
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
          {done ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: "rgba(34,197,94,0.12)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircle2 style={{ width: 28, height: 28, color: "#22c55e" }} />
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#ebebeb",
                  marginBottom: "8px",
                }}
              >
                Account created!
              </h2>
              <p style={{ color: "#7a7a7a", fontSize: "13px" }}>
                Redirecting you to the dashboard…
              </p>
            </div>
          ) : (
            <>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#ebebeb",
                  marginBottom: "6px",
                }}
              >
                Create account
              </h2>
              <p style={{ color: "#7a7a7a", fontSize: "13px", marginBottom: "28px" }}>
                Join the KejShots studio network
              </p>

              <form
                onSubmit={handleSignup}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                {/* Name */}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#9e9e9e", marginBottom: "8px" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "hsl(0,84%,52%)")}
                    onBlur={(e) => (e.target.style.borderColor = "#292929")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#9e9e9e", marginBottom: "8px" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "hsl(0,84%,52%)")}
                    onBlur={(e) => (e.target.style.borderColor = "#292929")}
                  />
                </div>

                {/* Password */}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#9e9e9e", marginBottom: "8px" }}>
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ ...inputStyle, paddingRight: "44px" }}
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

                  {password.length > 0 && (
                    <div style={{ marginTop: "8px" }}>
                      <div style={{ height: "3px", background: "#292929", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          borderRadius: "99px",
                          width: password.length < 6 ? "33%" : password.length < 10 ? "66%" : "100%",
                          background: password.length < 6
                            ? "hsl(0,84%,52%)"
                            : password.length < 10
                            ? "hsl(32,90%,52%)"
                            : "hsl(142,52%,42%)",
                          transition: "width 0.3s, background 0.3s",
                        }} />
                      </div>
                      <p style={{ fontSize: "11px", color: "#7a7a7a", marginTop: "4px" }}>
                        {password.length < 6 ? "Weak" : password.length < 10 ? "Good" : "Strong"} password
                      </p>
                    </div>
                  )}
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
                      Creating account…
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight style={{ width: 16, height: 16 }} />
                    </>
                  )}
                </button>
              </form>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
                <div style={{ flex: 1, height: "1px", background: "#292929" }} />
                <span style={{ fontSize: "12px", color: "#7a7a7a" }}>Already have an account?</span>
                <div style={{ flex: 1, height: "1px", background: "#292929" }} />
              </div>

              <Link
                to="/login"
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
                Sign in instead
              </Link>

              <p style={{ textAlign: "center", color: "#484848", fontSize: "11px", marginTop: "20px" }}>
                By signing up you agree to our Terms & Privacy Policy.
              </p>
            </>
          )}
        </div>

        <p style={{ textAlign: "center", color: "#484848", fontSize: "12px", marginTop: "24px" }}>
          © {new Date().getFullYear()} KejShots Photography Studio
        </p>
      </div>
    </div>
  );
};

export default Signup;
